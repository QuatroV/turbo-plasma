import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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
          tasks: {
            select: {
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
          lessons: {
            select: {
              id: true,
              name: true,
              content: true,
              meta: true,
              tasks: {
                select: {
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
      return { lesson: lesson, course: lessonCourse };
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
          lessons: true,
        },
      });

      return updatedCourse;
    }),

  delete: protectedProcedure
    .input(z.object({ courseId: z.string(), lessonId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.lesson.delete({
        where: {
          id: input.lessonId,
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
