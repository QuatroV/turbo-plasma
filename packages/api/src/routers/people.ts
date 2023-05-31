import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const peopleRouter = createTRPCRouter({
  search: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        search: z.string().nullish(),
        roleFilter: z.array(z.enum(["LISTENER", "MODERATOR", "OWNER"])),
        sortOrder: z.enum(["ASC", "DESC"]),
        sortBy: z.enum(["FIRST_NAME", "LAST_NAME", "SCORE"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const courseUsers = await ctx.prisma.courseUser.findMany({
        where: {
          courseId: input.courseId,
        },
        select: {
          user: true,
          courseRole: true,
        },
      });

      const userSolutionsMarks = await ctx.prisma.solution.findMany({
        where: {
          Task: {
            Lesson: {
              Course: {
                id: input.courseId,
              },
            },
          },
        },
        select: {
          solverId: true,
          mark: true,
        },
      });

      let result = courseUsers.map((courseUser) => ({
        ...courseUser.user,
        courseRole: courseUser.courseRole,
        score: 0,
      }));

      userSolutionsMarks.forEach((el) => {
        result.forEach((user) => {
          if (user.id === el.solverId) {
            user.score = el.mark || 0;
          }
        });
      });

      if (input?.search?.length) {
        const { search } = input;
        result = result.filter((user) => {
          if (!user.name || !user.email) return false;
          if (user.name.toLowerCase().includes(search.toLowerCase()))
            return true;
          if (user.surname.toLowerCase().includes(search.toLowerCase()))
            return true;
          if (user.email.toLowerCase().includes(search.toLowerCase()))
            return true;
          return false;
        });
      }

      if (input.roleFilter.length > 0) {
        result = result.filter((user) => {
          if (input.roleFilter.includes(user.courseRole)) return true;
          return false;
        });
      }

      if (input.sortBy === "FIRST_NAME") {
        result = result.sort((a, b) => {
          if (!a.name) return -1;
          if (!b.name) return 1;
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      }
      if (input.sortBy === "LAST_NAME") {
        result = result.sort((a, b) => {
          if (a.surname < b.surname) return -1;
          if (a.surname > b.surname) return 1;
          return 0;
        });
      }

      if (input.sortBy === "SCORE") {
        result = result.sort((a, b) => {
          if (!a.score) return -1;
          if (!b.score) return 1;
          if (a.score < b.score) return -1;
          if (a.score > b.score) return 1;
          return 0;
        });
      }

      if (input.sortOrder === "DESC") {
        result = result.reverse();
      }

      return result;
    }),

  detailedInfo: protectedProcedure
    .input(z.object({ userId: z.string(), courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const lessons = await ctx.prisma.lesson.findMany({
        where: {
          Course: {
            id: input.courseId,
          },
        },
        select: {
          id: true,
          name: true,
          tasks: {
            select: {
              solutions: {
                where: {
                  solverId: input.userId,
                },
              },
            },
          },
        },
      });

      const calcTotalMark = (lesson: any) => {
        let totalMarks = 0;
        for (const task of lesson.tasks) {
          // Iterate through solutions
          for (const solution of task.solutions) {
            // Add mark to total
            totalMarks += solution.mark;
          }
        }
        return totalMarks;
      };

      const result = lessons.map((lesson) => ({
        id: lesson.id,
        name: lesson.name,
        score: calcTotalMark(lesson),
      }));

      console.log({ result });

      return result;
    }),

  editUserRole: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["LISTENER", "MODERATOR", "OWNER"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.courseUser.updateMany({
        where: {
          userId: input.userId,
        },
        data: {
          courseRole: input.role,
        },
      });
    }),

  deleteUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.courseUser.deleteMany({
        where: {
          userId: input.userId,
        },
      });
    }),
});
