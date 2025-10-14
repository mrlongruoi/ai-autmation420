"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const Client = () => {
    const trpc = useTRPC();

    const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

    return (
        <div>
            Thành phần khách hàng: {JSON.stringify(users)}
        </div>
    )
}