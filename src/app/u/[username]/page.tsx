'use client'
import { messageSchema } from '@/Schemas/messageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCompletion } from '@ai-sdk/react'
import * as z from "zod"
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Loader2, Send, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar)
}

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

function SendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const username = params.username

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
    streamProtocol: "text"
  })

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ""
    }
  })

  const messageContent = form.watch('content')

  const handleMessageClick = (message: string) => {
    form.setValue('content', message)
  }

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      setIsLoading(true)
      await axios.post('/api/send-message', { ...data, username })
      toast("Successfully sent the message")
    } catch (error) {
      console.log("Error in sending message");
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message
      toast(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSuggestedMessages = () => {
    try {
      complete('')
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] py-10 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Constructivist Header */}
        <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] relative overflow-hidden">
          <div className="absolute top-0 left-0 h-2.5 w-full bg-[#D02020]" />
          
          <div className="inline-flex items-center gap-2 border-2 border-black bg-[#F0C020] px-3 py-1 font-bold uppercase tracking-widest text-xs mb-3">
            <User className="size-3 text-black" />
            <span>Anonymous Message Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212]">
            Send Note To <span className="bg-[#1040C0] text-white px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_0px_#121212]">@{username}</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base font-medium text-[#404040]">
            Speak freely and candidly. The recipient will never know who sent this message.
          </p>
        </div>

        {/* Message Input Box */}
        <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212]">
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="message-input">
                    Your Anonymous Message
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="message-input"
                    aria-invalid={fieldState.invalid}
                    placeholder="Type your authentic thoughts, questions, or compliments here..."
                    autoComplete="off"
                    className="min-h-32 text-base"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button 
              type="submit" 
              variant="default"
              size="lg"
              disabled={isLoading || !messageContent}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send It Anonymously
                </>
              )}
            </Button>
          </form>
        </div>

        {/* AI Suggested Prompts Section */}
        <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-3 bg-[#F0C020] border border-black inline-block rotate-45" />
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
                  Need Inspiration?
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#606060] mt-1">
                Click any prompt below to instantly load it into your message box.
              </p>
            </div>

            <Button
              type="button"
              variant="yellow"
              size="default"
              onClick={fetchSuggestedMessages}
              disabled={isSuggestLoading}
              className="gap-2 shrink-0 font-black"
            >
              {isSuggestLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Suggest New Prompts
                </>
              )}
            </Button>
          </div>

          <Separator />

          <div className="space-y-3">
            {isSuggestLoading ? (
              <div className="flex flex-col items-center justify-center p-8 bg-[#F0F0F0] border-2 border-black">
                <Loader2 className="size-8 animate-spin text-[#1040C0] mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#121212]">Generating creative prompts...</span>
              </div>
            ) : error ? (
              <div className="p-4 bg-[#D02020]/10 border-2 border-[#D02020] text-[#D02020] font-bold text-sm">
                {error.message}
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {parseStringMessages(completion).map((message, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleMessageClick(message)}
                    className="text-left font-bold text-sm sm:text-base text-[#121212] bg-[#F0F0F0] hover:bg-[#F0C020] border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span>&ldquo;{message}&rdquo;</span>
                    <ArrowRight className="size-4 shrink-0 text-[#121212]" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA to Create Account */}
        <div className="border-4 border-black bg-[#1040C0] text-white p-8 shadow-[6px_6px_0px_0px_#121212] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight">
              Want Your Own Anonymous Board?
            </h3>
            <p className="text-sm font-medium opacity-90 mt-1">
              Create a free account in 30 seconds and receive mystery messages from anyone.
            </p>
          </div>
          <Link href="/sign-up" className="shrink-0 w-full sm:w-auto">
            <Button variant="yellow" size="lg" className="w-full sm:w-auto font-black">
              Get Your Link Free <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SendMessage