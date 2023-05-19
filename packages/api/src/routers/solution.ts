import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const solutionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      if (!userId) {
        throw new Error("Unauthorized");
      }

      await ctx.prisma.solution.create({
        data: {
          taskId: input.taskId,
          content: Buffer.from(input.content),
          solverId: userId,
        },
      });
    }),

  setMark: protectedProcedure
    .input(z.object({ solutionId: z.string(), mark: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      if (!userId) {
        throw new Error("Unauthorized");
      }

      await ctx.prisma.solution.update({
        where: {
          id: input.solutionId,
        },
        data: {
          mark: Number(input.mark),
        },
      });
    }),
});
