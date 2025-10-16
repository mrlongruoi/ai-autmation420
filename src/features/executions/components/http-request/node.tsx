"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { FormType, HttpRequestDialog } from "./dialog";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";

type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const { setNodes } = useReactFlow();

    const nodeStatus = "initial";

    const handleOpenSettings = () => setDialogOpen(true);

    const handleSubmit = (values: FormType) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id === props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        endpoint: values.endpoint,
                        method: values.method,
                        body: values.body,
                    }
                }
            }

            return node;
        }))
    }

    const nodeData = props.data;

    const description = nodeData?.endpoint
        ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
        : "Chưa được định cấu hình";

    return (
        <>
            <HttpRequestDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSubmit}
                defaultEndpoint={nodeData.endpoint} // check if it can be improved by just sending initialValues={nodeData}
                defaultMethod={nodeData.method}
                defaultBody={nodeData.body}
            />

            <BaseExecutionNode
                {...props}
                id={props.id}
                icon={GlobeIcon}
                name="Yêu cầu HTTP"
                status={nodeStatus}
                description={description}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
            />
        </>
    )
});

HttpRequestNode.displayName = "HttpRequestNode";