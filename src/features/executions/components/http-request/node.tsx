"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";
import { BaseExecutionNode } from "../base-execution-node";

type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
    const nodeData = props.data as HttpRequestNodeData;

    const description = nodeData?.endpoint
        ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
        : "Chưa được định cấu hình";

    return (
        <>
            <BaseExecutionNode
                {...props}
                id={props.id}
                icon={GlobeIcon}
                name="Yêu cầu HTTP"
                description={description}
                onSettings={() => { }}
                onDoubleClick={() => { }}
            />
        </>
    )
});

HttpRequestNode.displayName = "HttpRequestNode";