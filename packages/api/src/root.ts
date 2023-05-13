import { courseRouter } from "./routers/course";
import { lessonRouter } from "./routers/lesson";
import { taskRouter } from "./routers/task";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  course: courseRouter,
  lesson: lessonRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
