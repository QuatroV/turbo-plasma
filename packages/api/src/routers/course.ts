import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const courseRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ phrase: z.string() }))
    .query(async ({ input, ctx }) => {
      const courses = await ctx.prisma.course.findMany({
        select: {
          id: true,
          name: true,
          private: true,
          CourseUser: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
            where: {
              courseRole: { equals: "OWNER" },
            },
          },
        },
        where: { name: { contains: input.phrase } },
      });

      return courses;
    }),

  shortInfo: protectedProcedure
    .input(z.object({ courseId: z.string(), userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const courseInfo = await ctx.prisma.course.findFirst({
        where: { id: { equals: input.courseId } },
        select: {
          id: true,
          name: true,
          shortInfo: true,
          private: true,
          lessons: true,
          topics: {
            select: {
              id: true,
              name: true,
              color: true,
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
      });

      const courseUser = await ctx.prisma.courseUser.findFirst({
        where: {
          courseId: input.courseId,
          userId: input.userId,
        },
      });

      return { courseInfo, courseUser };
    }),

  join: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        userId: z.string(),
        role: z.enum(["LISTENER", "OWNER", "MODERATOR"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const newCourseUser = await ctx.prisma.courseUser.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          course: {
            connect: { id: input.courseId },
          },
          courseRole: "LISTENER",
        },
      });

      await ctx.prisma.course.update({
        where: { id: input.courseId },
        data: {
          CourseUser: { connect: { id: newCourseUser.id } },
        },
      });
    }),

  leave: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const courseUser = await ctx.prisma.courseUser.findFirst({
        where: {
          courseId: input.courseId,
          userId: input.userId,
        },
      });

      if (!courseUser) {
        throw new Error("User not found");
      }

      await ctx.prisma.courseUser.delete({
        where: {
          id: courseUser.id,
        },
      });

      const oldCourse = await ctx.prisma.course.findFirst({
        where: {
          id: input.courseId,
        },
        select: {
          CourseUser: true,
        },
      });

      if (!oldCourse) {
        throw new Error("Course not found");
      }

      await ctx.prisma.course.update({
        where: { id: input.courseId },
        data: {
          CourseUser: {
            set: oldCourse.CourseUser.filter(
              (user: any) => user.id !== courseUser.id,
            ),
          },
        },
      });
    }),

  mainPage: publicProcedure.query(async ({ input, ctx }) => {
    const popularCourses = await ctx.prisma.course.findMany({
      select: {
        id: true,
        name: true,
        private: true,
        CourseUser: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
          where: {
            courseRole: { equals: "OWNER" },
          },
        },
      },
      where: { private: false },
      orderBy: {
        CourseUser: {
          _count: "desc",
        },
      },
      take: 4,
    });

    if (!ctx.session) {
      return { popularCourses };
    }

    const userId = ctx.session.user.id;

    if (!userId) {
      throw new Error("No user id obtained from the context");
    }

    const myCourses = await ctx.prisma.course.findMany({
      select: {
        id: true,
        name: true,
        private: true,
        CourseUser: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
          where: {
            courseRole: { equals: "OWNER" },
          },
        },
      },
      where: { CourseUser: { some: { userId: userId } } },
    });

    return { popularCourses, myCourses };
  }),

  create: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session.user.id) {
      throw new Error("No user id obtained from the context");
    }

    const newCourse = await ctx.prisma.course.create({
      data: {
        name: `${ctx.session.user.name}'s course`,
      },
    });

    const courseOwner = await ctx.prisma.courseUser.create({
      data: {
        courseId: newCourse.id,
        userId: ctx.session.user.id,
        courseRole: "OWNER",
      },
    });

    const courseWithOwner = await ctx.prisma.course.update({
      where: {
        id: newCourse.id,
      },
      data: {
        CourseUser: { set: { id: courseOwner.id } },
      },
    });

    return courseWithOwner;
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        shortInfo: z.string(),
        private: z.union([z.boolean(), z.null()]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatedCourse = await ctx.prisma.course.update({
        where: { id: input.id },
        data: {
          name: input.name,
          shortInfo: input.shortInfo,
          private: input.private,
        },
        include: {
          lessons: true,
        },
      });

      return updatedCourse;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.courseUser.deleteMany({
        where: {
          courseId: input.id,
        },
      });

      await ctx.prisma.course.delete({
        where: {
          id: input.id,
        },
        include: {
          lessons: true,
        },
      });
    }),

  myCourses: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    if (!userId) {
      throw new Error("No user id obtained from the context");
    }

    const myCourses = ctx.prisma.course.findMany({
      where: {
        CourseUser: {
          some: {
            userId: userId,
          },
        },
      },
    });

    return myCourses;
  }),

  getAllLessons: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input, ctx }) => {
      const lessons = await ctx.prisma.lesson.findMany({
        where: {
          courseId: input.courseId,
        },
      });

      return lessons;
    }),

  createNewTopic: protectedProcedure
    .input(
      z.object({ courseId: z.string(), name: z.string(), color: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.create({
        data: {
          courseId: input.courseId,
          name: input.name,
          color: input.color,
        },
      });

      return topic;
    }),

  changeTopic: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        topicId: z.string(),
        lessonIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.lesson.updateMany({
        where: {
          id: { in: input.lessonIds },
        },
        data: {
          topicId: input.topicId,
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

  deleteTopic: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.topic.delete({
        where: {
          id: input.topicId,
        },
      });
    }),
});
