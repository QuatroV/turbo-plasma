import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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
});
