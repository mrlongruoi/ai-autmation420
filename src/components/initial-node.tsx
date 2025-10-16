"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { NodeSelector } from "./node-selector";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { WorkflowNode } from "./workflow-node";

export const InitialNode = memo((props: NodeProps) => {
    const [selectorOpen, setSelectorOpen] = useState(false);

    return (
        <NodeSelector
            open={selectorOpen}
            onOpenChange={setSelectorOpen}
        >
            <WorkflowNode
                // name="Nút quy trình"
                // description="Bấm để thêm một nút"
                showToolbar={false}
            >
                <PlaceholderNode
                    {...props}
                    onClick={() => setSelectorOpen(true)}
                >
                    <div className="cursor-pointer flex items-center justify-center">
                        <PlusIcon className="size-4" />
                    </div>
                </PlaceholderNode>
            </WorkflowNode>
        </NodeSelector>
    )
});

InitialNode.displayName = "InitialNode";