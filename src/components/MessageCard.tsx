import React, { startTransition } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import dayjs from 'dayjs';
import { Clock, X } from 'lucide-react'
import { Message } from '@/models/Users'
import axios, { AxiosError } from 'axios'
import { toast } from "sonner";
import { ApiResponse } from '@/types/ApiResponse';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export default function MessageCard({ message, onMessageDelete }: MessageCardProps) {

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<ApiResponse>(
                `/api/delete-message/${message._id}`
            );
            toast(response.data.message);
            onMessageDelete(message._id.toString());

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(
                axiosError.response?.data.message ?? 'Failed to delete message',
            );
        }
    }
        return (
                <Card className="relative overflow-hidden bg-white border-4 border-black group">
                <div className="absolute top-0 left-0 h-2 w-full bg-[#1040C0]" />
                <CardHeader className="pt-6">
                    <div className="flex justify-between items-start gap-3">
                        <CardTitle className="text-base sm:text-lg font-bold normal-case leading-relaxed text-[#121212] select-text">
                            &ldquo;{message.content}&rdquo;
                        </CardTitle>
                        <AlertDialog>
                            <AlertDialogTrigger
                                render={<Button variant="destructive" size="icon-sm" className="shrink-0" />}
                            >
                                <X className="size-4" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Message</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to permanently delete this anonymous message? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteConfirm()}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#606060] bg-[#F0F0F0] border-2 border-black px-2.5 py-1 w-fit">
                        <Clock className="size-3 text-[#D02020]" />
                        <span>{dayjs(message.createdAt).format('MMM D, YYYY · h:mm A')}</span>
                    </div>
                </CardContent>
            </Card>
        )
    }

