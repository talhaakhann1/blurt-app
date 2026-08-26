'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Message } from '@/models/Users'
import { toast } from "sonner"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AcceptMessageSchema } from '@/Schemas/acceptingMessageSchema'
import { useSession } from 'next-auth/react'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'
import { Check, Copy, Inbox, Loader2, RefreshCcw } from 'lucide-react'
import MessageCard from '@/components/MessageCard'

function Dashboard() {
    const [isSwitcingLoading, setIsSwitchingLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([]);
    const [copied, setCopied] = useState(false);

    const handleDeleteMesssages = async (messageId: string) => {
        setMessages(
            messages.filter(
                (message) => message._id.toString() !== messageId
            )
        );
    }
    const { data: session } = useSession()

    const form = useForm({
        resolver: zodResolver(AcceptMessageSchema),
        defaultValues: {
            acceptMessages: false
        }
    })

    const { register, watch, setValue } = form
    const acceptMessages = watch('acceptMessages');

    const acceptFetchMessages = useCallback(async () => {
        setIsSwitchingLoading(true)
        try {
            const response = await axios.get<ApiResponse>('/api/accept-messages', {
                withCredentials: true,
            });
            setValue('acceptMessages', response.data.isAcceptingMessages ?? false);
        } catch (error) {
            const AxiosError = error as AxiosError<ApiResponse>
            toast.error("Error",
                {
                    description: AxiosError.response?.data?.message || "Failed to get message settings"
                })
        } finally {
            setIsSwitchingLoading(false)
        }
    }, [setValue])

    const fetchMessages = useCallback(async (refresh: boolean = false) => {
        setIsLoading(true)
        setIsSwitchingLoading(false)
        try {
            const response = await axios.get<ApiResponse>('/api/get-messages')
            setMessages(response.data.messages || [])

            if (refresh) {
                toast.success("Messages Refreshed")
            }
        } catch (error) {
            const AxiosError = error as AxiosError<ApiResponse>
            toast.error("Error",
                {
                    description: AxiosError?.response?.data.message || "Failed to get new messages"
                })
        } finally {
            setIsLoading(false)
            setIsSwitchingLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchMessages();
        acceptFetchMessages();
    }, [fetchMessages, acceptFetchMessages,session]);

    const handleSwitchChange = async () => {
        try {
            const response = await axios.post<ApiResponse>('/api/accept-messages',
                { acceptMessages: !acceptMessages },
                {
                    withCredentials: true,
                }
            );
            setValue('acceptMessages', !acceptMessages)
            toast.success(response.data.message)
        } catch (error) {
            const AxiosError = error as AxiosError<ApiResponse>
            toast.error("Error",
                {
                    description: AxiosError?.response?.data.message || "Failed to switch Accept Messages"
                })
        }
    }

    const username = session?.user?.username || '';
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseUrl(`${window.location.protocol}//${window.location.host}`);
        }
    }, []);

    const profileUrl = baseUrl ? `${baseUrl}/u/${username}` : `/u/${username}`;

    const copiedToClipBoard = () => {
        if (typeof navigator !== 'undefined') {
            navigator.clipboard.writeText(profileUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            toast.success("Profile URL copied to clipboard!")
        }
    }

    return (
        <div className="min-h-[calc(100vh-69px)] bg-[#F0F0F0] py-8 sm:py-12 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 border-2 border-black bg-[#F0C020] px-3 py-1 font-bold uppercase tracking-widest text-xs mb-3">
                            <span className="size-2 rounded-full bg-[#1040C0] border border-black inline-block" />
                            <span>Live Control Panel</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212]">
                            User Dashboard
                        </h1>
                        <p className="mt-2 text-sm sm:text-base font-medium text-[#404040]">
                            Manage your anonymous inbox, share your unique link, and adjust message settings.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-[#F0F0F0] border-3 border-black p-4 self-start md:self-auto shadow-[3px_3px_0px_0px_#121212]">
                        <Switch
                            {...register('acceptMessages')}
                            checked={acceptMessages}
                            onCheckedChange={handleSwitchChange}
                            disabled={isSwitcingLoading}
                            id="accept-messages-toggle"
                        />
                        <label htmlFor="accept-messages-toggle" className="cursor-pointer select-none text-xs sm:text-sm font-black uppercase tracking-wider text-[#121212]">
                            Accept Messages: <span className={acceptMessages ? 'text-[#1040C0]' : 'text-[#D02020]'}>{acceptMessages ? 'ON' : 'OFF'}</span>
                        </label>
                    </div>
                </div>

                <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212]">
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#121212]">
                            Your Public Blurt URL
                        </h2>
                        <span className="text-xs font-bold uppercase text-[#606060] hidden sm:inline">
                            Share anywhere to get feedback
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch gap-3">
                        <input
                            type="text"
                            value={profileUrl}
                            readOnly
                            className="w-full rounded-none border-2 border-black bg-[#F0F0F0] px-4 py-2.5 font-mono text-sm sm:text-base font-bold text-[#121212] select-all outline-none"
                        />
                        <Button 
                            variant="yellow"
                            size="default"
                            onClick={copiedToClipBoard}
                            className="shrink-0 gap-2 font-black"
                        >
                            {copied ? <Check className="size-4 text-black" /> : <Copy className="size-4" />}
                            {copied ? "Copied!" : "Copy Link"}
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t-4 border-black">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#121212]">
                            Inbox Messages
                        </h2>
                        <span className="inline-flex items-center justify-center size-8 rounded-full bg-[#1040C0] text-white font-black text-sm border-2 border-black shadow-[2px_2px_0px_0px_#121212]">
                            {messages.length}
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                            e.preventDefault();
                            fetchMessages(true)
                        }}
                        disabled={isLoading}
                        title="Refresh Messages"
                    >
                        {isLoading ? (
                            <Loader2 className="size-5 animate-spin" />
                        ) : (
                            <RefreshCcw className="size-5" />
                        )}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <MessageCard
                                key={message._id.toString()}
                                message={message}
                                onMessageDelete={handleDeleteMesssages}
                            />
                        ))
                    ) : (
                        <div className="col-span-full border-4 border-dashed border-black bg-white p-12 text-center shadow-[4px_4px_0px_0px_#121212]">
                            <div className="mx-auto size-16 rounded-none bg-[#E0E0E0] border-2 border-black flex items-center justify-center mb-4">
                                <Inbox className="size-8 text-[#606060]" />
                            </div>
                            <h3 className="text-xl font-black uppercase text-[#121212]">No Messages Yet</h3>
                            <p className="mt-2 text-sm font-medium text-[#404040] max-w-sm mx-auto">
                                Share your profile link with friends or colleagues to start receiving mystery notes.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
