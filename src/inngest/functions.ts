import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", retries: 5 },
  { event: "test/hello.world" },
  async ({ step }) => {
    // fecthing he video
    await step.sleep("fetching", "5s");
    // transcribing
    await step.sleep("transcribing", "5s");
    // sending transcription to AI
    await step.sleep("sending-to-ai", "5s");

    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "workflow-from-inngest",
        },
      });
    });
  }
);
