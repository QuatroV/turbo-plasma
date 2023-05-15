import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ input, ctx }) => {
      const comments = ctx.prisma.comment.findMany({
        where: {
          lessonId: input.lessonId,
        },
        select: {
          content: true,
          id: true,
          author: true,
          createdAt: true,
        },
      });

      return comments;
    }),
  create: protectedProcedure
    .input(
      z.object({
        lessonId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      if (!userId) {
        throw new Error("User not found");
      }

      await ctx.prisma.comment.create({
        data: {
          content: input.content,
          lessonId: input.lessonId,
          authorId: userId,
        },
      });

      const comments = await ctx.prisma.comment.findMany({
        where: { lessonId: input.lessonId },
        select: {
          content: true,
          id: true,
          author: true,
          createdAt: true,
        },
      });

      return comments;
    }),
});
