"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { Field, FieldError, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, Loader2, LogIn } from "lucide-react";
import { signInSchema } from "@/Schemas/signInSchema";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function Page() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })
    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        try {
            setIsSubmitting(true)
            const result = await signIn('credentials', {
                redirect: false,
                identifier: data.identifier,
                password: data.password
            })


            if (result?.error) {
                toast.error(`Login Failed || ${result.error}`)
            } else {
                toast.success("Login Successfull")
            }


            if (result?.url) {
                router.replace('/dashboard')
            }

        } catch (error) {
            console.log("Error in signIn user");
            const AxiosError = error as AxiosError<ApiResponse>
            let errorMessage = AxiosError.response?.data.message
            toast.error("SignIn Failed",
                {
                    description: errorMessage
                })
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] p-4 sm:p-6">
            <div className="w-full max-w-md border-4 border-black bg-white p-6 sm:p-10 shadow-[8px_8px_0px_0px_#121212] relative overflow-hidden">
                <div className="absolute top-0 left-0 h-3 w-full bg-[#1040C0]" />

                {/* Bauhaus Header Badge */}
                <div className="text-center mb-8 pt-2">
                    <div className="inline-flex items-center gap-1.5 border-2 border-black bg-[#F0C020] px-3 py-1 font-bold uppercase tracking-widest text-xs shadow-[2px_2px_0px_0px_#121212] mb-4">
                        <span className="size-2 rounded-full bg-[#D02020] inline-block border border-black" />
                        <span>Authentication Portal</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#121212]">
                        Sign In
                    </h1>
                    <p className="text-sm font-medium text-[#404040] mt-2">
                        Enter your credentials to access your Blurt dashboard.
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FieldGroup className="gap-5">
                        <Controller
                            name="identifier"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="signin-identifier">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="signin-identifier"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="user@example.com"
                                        autoComplete="username"
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
                                    <FieldLabel htmlFor="signin-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="password"
                                        id="signin-password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
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
                        variant="secondary"
                        size="lg"
                        className="w-full font-black"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="size-4 animate-spin" /> Verifying...
                            </>
                        ) : (
                            <>
                                <LogIn className="size-4" /> Sign In
                            </>
                        )}
                    </Button>
                </form>

                <div className="border-t-2 border-black mt-8 pt-6 text-center">
                    <p className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                        New to Blurt?{" "}
                        <Link href="/sign-up" className="text-[#D02020] hover:underline underline-offset-4 ml-1 inline-flex items-center gap-0.5">
                            Sign Up <ArrowRight className="size-3.5" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

