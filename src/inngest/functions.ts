// import { createAnthropic } from "@ai-sdk/anthropic";
// import { createDeepSeek } from "@ai-sdk/deepseek";
import * as Sentry from "@sentry/nextjs";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { inngest } from "./client";

const google = createGoogleGenerativeAI();

const openai = createOpenAI();

const groq = createGroq();

// const anthropic = createAnthropic();

// const deepseek = createDeepSeek();

export const execute = inngest.createFunction(
  { id: "execute-ai", retries: 5 },
  { event: "execute/ai" },
  async ({ step }) => {
    await step.sleep("pretend", "5s");

    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test'});
    console.log("something went wrong");
    console.log("This is an error i want to track");

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant.",
        prompt: "What is 2 x 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-5-mini"),
        system: "You are a helpful assistant.",
        prompt: "What is 2 x 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: groqSteps } = await step.ai.wrap(
      "groq-generate-text",
      generateText,
      {
        model: groq("qwen/qwen3-32b"),
        system: "You are a helpful assistant.",
        prompt: "What is 2 x 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    // const { steps: anthropicSteps } = await step.ai.wrap(
    //   "anthropic-generate-text",
    //   generateText,
    //   {
    //     model: anthropic("claude-sonnet-4-5"),
    //     system: "You are a helpful assistant.",
    //     prompt: "What is 2 x 2?",
    //   }
    // );

    // const { steps: deepseekSteps } = await step.ai.wrap(
    //   "deepseek-generate-text",
    //   generateText,
    //   {
    //     model: deepseek("deepseek-chat"),
    //     system: "You are a helpful assistant.",
    //     prompt: "What is 2 x 2?",
    //   }
    // );

    return {
      geminiSteps,
      openaiSteps,
      groqSteps,
      // anthropicSteps,
      // deepseekSteps,
    };
  }
);
