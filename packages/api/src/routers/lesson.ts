import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { type SolutionForClient } from "./task";

export const lessonRouter = createTRPCRouter({
  show: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ input, ctx }) => {
      const lesson = await ctx.prisma.lesson.findFirst({
        where: { id: input.lessonId },
        select: {
          courseId: true,
          id: true,
          name: true,
          content: true,
          meta: true,
          topicId: true,
          tasks: {
            select: {
              id: true,
              name: true,
              content: true,
              expectedResult: true,
            },
          },
        },
      });
      if (!lesson?.courseId) {
        throw new Error("No lesson courseId found");
      }
      const lessonCourse = await ctx.prisma.course.findFirst({
        select: {
          id: true,
          name: true,
          shortInfo: true,
          private: true,
          topics: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
          lessons: {
            select: {
              id: true,
              name: true,
              content: true,
              meta: true,
              topicId: true,
              tasks: {
                select: {
                  id: true,
                  name: true,
                  content: true,
                  expectedResult: true,
                },
              },
            },
          },
          CourseUser: {
            select: {
              courseRole: true,
              user: {
                select: {
                  image: true,
                  email: true,
                  name: true,
                  surname: true,
                  role: true,
                },
              },
            },
          },
        },
        where: { id: lesson?.courseId },
      });

      const courseUser = await ctx.prisma.courseUser.findFirst({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (courseUser?.courseRole === "LISTENER") {
        const solutionsFromDb = await ctx.prisma.solution.findMany({
          where: {
            taskId: { in: lesson?.tasks.map((task) => task.id) },
            solverId: ctx.session.user.id,
          },
          include: {
            solver: true,
          },
        });

        // Cannot send buffers, so translate them to strings
        const solutions: SolutionForClient[] = [];

        solutionsFromDb.forEach((el, id) => {
          solutions[id] = {
            ...el,
            content: el.content ? el.content.toString() : "",
          };
        });

        return { lesson: lesson, course: lessonCourse, solutions };
      } else {
        const solutionsFromDb = await ctx.prisma.solution.findMany({
          where: {
            taskId: { in: lesson?.tasks.map((task) => task.id) },
          },
          include: {
            solver: true,
          },
        });

        // Cannot send buffers, so translate them to strings
        const solutions: SolutionForClient[] = [];

        solutionsFromDb.forEach((el, id) => {
          solutions[id] = {
            ...el,
            content: el.content ? el.content.toString() : "",
          };
        });

        return { lesson: lesson, course: lessonCourse, solutions };
      }
    }),

  editContent: protectedProcedure
    .input(z.object({ lessonId: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.lesson.update({
        where: {
          id: input.lessonId,
        },
        data: {
          content: input.content,
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), courseId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const createdLesson = await ctx.prisma.lesson.create({
        data: {
          name: input.name,
        },
      });

      const updatedCourse = await ctx.prisma.course.update({
        where: {
          id: input.courseId,
        },
        data: {
          lessons: {
            connect: {
              id: createdLesson.id,
            },
          },
        },
        include: {
          topics: true,
          lessons: true,
        },
      });

      return updatedCourse;
    }),

  delete: protectedProcedure
    .input(z.object({ courseId: z.string(), lessonIds: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.lesson.deleteMany({
        where: {
          id: { in: input.lessonIds },
        },
      });

      const updatedCourse = await ctx.prisma.course.findFirst({
        where: {
          id: input.courseId,
        },
        include: {
          lessons: true,
        },
      });

      return updatedCourse;
    }),

  updateMeta: protectedProcedure
    .input(z.object({ lessonId: z.string(), meta: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const jsonMeta = JSON.parse(input.meta);
      const updatedLesson = await ctx.prisma.lesson.update({
        data: {
          meta: jsonMeta,
        },
        where: {
          id: input.lessonId,
        },
        include: {
          tasks: true,
        },
      });

      return updatedLesson;
    }),
});
