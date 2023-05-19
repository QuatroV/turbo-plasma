import { commentRouter } from "./routers/comment";
import { courseRouter } from "./routers/course";
import { lessonRouter } from "./routers/lesson";
import { solutionRouter } from "./routers/solution";
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
  comment: commentRouter,
  solution: solutionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
