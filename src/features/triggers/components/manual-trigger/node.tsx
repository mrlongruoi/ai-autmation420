import { NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";
import { memo } from "react";
import { BaseTriggerNode } from "../base-trigger-node";

export const ManualTriggerNode = memo((props: NodeProps) => {

    return (
        <>
            <BaseTriggerNode
                {...props}
                icon={MousePointerIcon}
                name="Khi nhấp vào 'Thực thi quy trình công việc'"
            // status={nodeStatus}
            // onSettings={handleOpenSettings}
            // onDoubleClick={handleOpenSettings}
            />
        </>
    )
});