"use client"
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useDebounceValue } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/Schemas/signUpSchema'
import axios, { AxiosError } from "axios"
import {ApiResponse} from '@/types/ApiResponse'
import {
  Field, 
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, UserPlus } from 'lucide-react'
import Link from 'next/link'


function Page() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [debouncedUsername] = useDebounceValue(username, 300)
  const router = useRouter()
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (!debouncedUsername) {
        setIsCheckingUsername(false)
        setUsernameMessage('')
        return ;
      }
      try {
        const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
        let message = response.data.message
        setUsernameMessage(message)
 
      } catch (error) {
        const AxiosError = error as AxiosError<ApiResponse>
        setUsernameMessage(AxiosError.response?.data.message || "Error checking username")
      } finally {
        setIsCheckingUsername(false)
      }
    }
    checkUsernameUnique();
  }, [debouncedUsername])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post('/api/sign-up', data)
      toast.message(response.data.message)
      router.replace(`/sign-in`)
    } catch (error) {
      const AxiosError = error as AxiosError<ApiResponse>
      let errorMessage = AxiosError.response?.data.message
      toast("Signup Failed",
        {
          description: errorMessage
        })
    } finally {
      setIsSubmitting(false)
    }

  }

   const isAvailable = usernameMessage === "Username is Available" || usernameMessage === "Username is unique";

   const hasCheckedUsername = usernameMessage !== "";

  return (
     <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] p-4 sm:p-6">
      <div className="w-full max-w-md border-4 border-black bg-white p-6 sm:p-10 shadow-[8px_8px_0px_0px_#121212] relative overflow-hidden">
        <div className="absolute top-0 left-0 h-3 w-full bg-[#D02020]" />

        <div className="text-center mb-8 pt-2">
          <div className="inline-flex items-center gap-1.5 border-2 border-black bg-[#F0C020] px-3 py-1 font-bold uppercase tracking-widest text-xs shadow-[2px_2px_0px_0px_#121212] mb-4">
            <span className="size-2 rounded-full bg-[#1040C0] inline-block border border-black" />
            <span>Create Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#121212]">
            Sign Up
          </h1>
          <p className="text-sm font-medium text-[#404040] mt-2">
            Start receiving unfiltered thoughts and questions.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="gap-5">
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-username">
                    Unique Username
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="signup-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. johndoe"
                      autoComplete="off"
                      onChange={(e) => {
                        field.onChange(e)
                        setUsername(e.target.value)
                      }}
                    />
                    {isCheckingUsername && (
                      <div className="absolute right-3 top-3">
                        <Loader2 className="size-4 animate-spin text-[#121212]" />
                      </div>
                    )}
                  </div>

                  {usernameMessage && !isCheckingUsername && (
                    <div className={`mt-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                      isAvailable ? 'text-[#1040C0]' : 'text-[#D02020]'
                    }`}>
                      {isAvailable ? <CheckCircle2 className="size-3.5" /> : <AlertCircle className="size-3.5" />}
                      <span>{usernameMessage}</span>
                    </div>
                  )}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-email">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="user@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button 
            type="submit" 
            variant="default"
            size="lg"
            className="w-full font-black"
            disabled={isSubmitting || (hasCheckedUsername && !isAvailable)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="size-4" /> Sign Up
              </>
            )}
          </Button>
        </form>

        <div className="border-t-2 border-black mt-8 pt-6 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#121212]">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#1040C0] hover:underline underline-offset-4 ml-1 inline-flex items-center gap-0.5">
              Sign In <ArrowRight className="size-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page

