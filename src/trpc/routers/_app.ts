import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "mrlong@mail.com",
      },
    });

    return { success: true, message: "Công việc được xếp hàng đợi" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
