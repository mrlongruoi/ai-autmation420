"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    endpoint: z.url({ message: "Vui lòng nhập một URL hợp lệ" }),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    body: z
        .string()
        .optional()
    // .refine()
})

export type FormType = z.infer<typeof formSchema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    defaultEndpoint?: string;
    defaultMethod?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    defaultBody?: string;
}

export const HttpRequestDialog = ({
    open,
    onOpenChange,
    onSubmit,
    defaultEndpoint = "",
    defaultMethod = "GET",
    defaultBody = ""
}: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            endpoint: defaultEndpoint,
            method: defaultMethod,
            body: defaultBody,
        }
    });

    // reset form values when dialog opens with new defaults
    useEffect(() => {
        if (open) {
            form.reset({
                endpoint: defaultEndpoint,
                method: defaultMethod,
                body: defaultBody,
            })
        }
    }, [open, defaultEndpoint, defaultMethod, defaultBody, form.reset]);

    const watchMethod = form.watch("method");

    const showBodyField = ["POST", "PUT", "PATCH"].includes(watchMethod);

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yêu cầu HTTP</DialogTitle>
                    <DialogDescription>
                        Định cấu hình cài đặt cho nút yêu cầu HTTP.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="method"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phương thức</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder="Chọn một phương thức"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="GET">LẤY</SelectItem>
                                            <SelectItem value="POST">TẠO</SelectItem>
                                            <SelectItem value="PUT">THAY</SelectItem>
                                            <SelectItem value="PATCH">SỬA</SelectItem>
                                            <SelectItem value="DELETE">XÓA</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Phương thức HTTP được sử dụng cho yêu cầu này
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endpoint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Điểm truy cập</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://api.example.com/users/{{httpResponse.data.id}}"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Địa chỉ tĩnh hoặc sử dụng {"{{variable}}"} cho các giá trị đơn giản hoặc {"{{json variable}}"} để chuỗi hóa đối tượng.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {showBodyField && (
                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nội dung yêu cầu</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={
                                                    '{\n  "userId": "{{httpResponse.data.id}}",\n  "name": "{{httpResponse.data.name}}",\n  "items": "{{httpResponse.data.items}}"\n}'
                                                }
                                                className="min-h-[120px] font-mono text-sm"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Đối tượng dữ liệu với các biến mẫu. Sử dụng {"{{variables}}"} cho các giá trị đơn giản hoặc {"{{json variable}}"} để chuỗi hóa đối tượng.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <DialogFooter className="mt-4">
                            <Button type="submit">Lưu</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
