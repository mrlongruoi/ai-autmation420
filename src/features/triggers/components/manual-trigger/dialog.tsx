"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ManualTriggerDialog = ({
    open,
    onOpenChange,
}: Props) => {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Kích hoạt thủ công</DialogTitle>
                    <DialogDescription>
                        Định cấu hình cài đặt cho nút kích hoạt thủ công.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                        Được sử dụng để thực hiện quy trình làm việc theo cách thủ công, không có sẵn cấu hình.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
