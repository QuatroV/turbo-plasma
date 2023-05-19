import { z } from "zod";

import { type Prisma } from "@plasma/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export type SolutionForClient = Omit<
  Prisma.SolutionGetPayload<{
    include: {
      solver: true;
    };
  }>,
  "content"
> & {
  content: string;
};

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        lessonId: z.string(),
        content: z.string(),
        name: z.string().optional(),
        expectedResult: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.create({
        data: {
          lessonId: input.lessonId,
          content: input.content,
          name: input.name,
          expectedResult: input.expectedResult,
        },
      });

      const lesson = await ctx.prisma.lesson.update({
        data: {
          tasks: {
            connect: {
              id: task.id,
            },
          },
        },
        select: {
          courseId: true,
          id: true,
          name: true,
          content: true,
          tasks: {
            select: {
              name: true,
              content: true,
              expectedResult: true,
            },
          },
        },
        where: {
          id: input.lessonId,
        },
      });
      return lesson;
    }),

  shortInfo: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.findUnique({
        where: {
          id: input.id,
        },
        select: {
          lessonId: true,
          id: true,
          name: true,
          content: true,
          expectedResult: true,
        },
      });

      if (!task?.lessonId) {
        throw new Error("Task without lesson");
      }

      const lesson = await ctx.prisma.lesson.findUnique({
        where: {
          id: task?.lessonId,
        },
      });

      if (!lesson) {
        throw new Error("Lesson not found");
      }

      const solutionsFromDb = await ctx.prisma.solution.findMany({
        where: {
          taskId: task.id,
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

      return { task, lesson, solutions };
    }),
});
