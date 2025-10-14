"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { LogoutButton } from "./logout";
import { Button } from "@/components/ui/button";

const Page = () => {
  const trpc = useTRPC();

  // const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      toast.success("AI Job queued")
    }
  }));

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Job queued")
    }
  }));

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Thành phần máy chủ được bảo vệ
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>Test AI</Button>

      <Button disabled={create.isPending} onClick={() => create.mutate()}>Tạo quy trình làm việc</Button>

      <LogoutButton />
    </div>
  )
}

export default Page;