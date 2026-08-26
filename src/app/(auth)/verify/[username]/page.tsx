"use client";
import { verifySchema } from "@/Schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"
import { toast } from "sonner";
import { useParams } from "next/navigation";
import {ApiResponse} from "@/types/ApiResponse";
import { Field, FieldError, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, Link, Loader2, ShieldCheck } from "lucide-react";

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const params = useParams();

    
    const router = useRouter();
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            setIsSubmitting(true)
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code
            })
            let message = response?.data.message
            toast.message(message)
            router.replace('/sign-in')

        } catch (error) {
            console.log("Error in signup user");
            const AxiosError = error as AxiosError<ApiResponse>
            let errorMessage = AxiosError.response?.data.message
            toast("Code Verification Failed",
                {
                    description: errorMessage
            },
            )
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
          <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] p-4 sm:p-6">
            <div className="w-full max-w-md border-4 border-black bg-white p-6 sm:p-10 shadow-[8px_8px_0px_0px_#121212] relative overflow-hidden">
                <div className="absolute top-0 left-0 h-3 w-full bg-[#F0C020]" />

                <div className="text-center mb-8 pt-2">
                    <div className="inline-flex items-center gap-1.5 border-2 border-black bg-[#1040C0] text-white px-3 py-1 font-bold uppercase tracking-widest text-xs shadow-[2px_2px_0px_0px_#121212] mb-4">
                        <span className="size-2 rounded-full bg-[#D02020] inline-block border border-white" />
                        <span>Security Check</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#121212]">
                        Verify Account
                    </h1>
                    <p className="text-sm font-medium text-[#404040] mt-2">
                        Enter the 6-digit verification code sent to your email address.
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FieldGroup className="gap-5">
                        <Controller
                            name="code"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="verify-code">
                                        6-Digit Verification Code
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="verify-code"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g. 123456"
                                        autoComplete="one-time-code"
                                        className="text-center font-mono tracking-widest text-lg font-black"
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
                        variant="yellow"
                        size="lg"
                        className="w-full font-black"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="size-4 animate-spin" /> Verifying Code...
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="size-4" /> Verify & Complete
                            </>
                        )}
                    </Button>
                </form>

                <div className="border-t-2 border-black mt-8 pt-6 text-center">
                    <p className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                        Back to{" "}
                        <Link href="/sign-in" className="text-[#1040C0] hover:underline underline-offset-4 ml-1 inline-flex items-center gap-0.5">
                            Sign In <ArrowRight className="size-3.5" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

;
