"use client"

import {
  Check,
  Info,
  Loader2,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans"
      closeButton
      icons={{
        success: (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-none border-2 border-black bg-[#1040C0] text-white shadow-[2px_2px_0px_0px_#121212] dark:border-white dark:shadow-[2px_2px_0px_0px_#000000]">
            <Check className="size-4 stroke-[3]" />
          </div>
        ),
        info: (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-none border-2 border-black bg-[#1040C0] text-white shadow-[2px_2px_0px_0px_#121212] dark:border-white dark:shadow-[2px_2px_0px_0px_#000000]">
            <Info className="size-4 stroke-[3]" />
          </div>
        ),
        warning: (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-none border-2 border-black bg-[#F0C020] text-[#121212] shadow-[2px_2px_0px_0px_#121212] dark:border-white dark:shadow-[2px_2px_0px_0px_#000000]">
            <TriangleAlert className="size-4 stroke-[3]" />
          </div>
        ),
        error: (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-none border-2 border-black bg-[#D02020] text-white shadow-[2px_2px_0px_0px_#121212] dark:border-white dark:shadow-[2px_2px_0px_0px_#000000]">
            <OctagonAlert className="size-4 stroke-[3]" />
          </div>
        ),
        loading: (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-none border-2 border-black bg-[#E0E0E0] text-[#121212] shadow-[2px_2px_0px_0px_#121212] dark:border-white dark:bg-[#2A2A2A] dark:text-[#F0F0F0] dark:shadow-[2px_2px_0px_0px_#000000]">
            <Loader2 className="size-4 stroke-[3] animate-spin" />
          </div>
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover, #FFFFFF)",
          "--normal-text": "var(--popover-foreground, #121212)",
          "--normal-border": "var(--border, #121212)",
          "--border-radius": "0px",
          "--toast-icon-margin-start": "0px",
          "--toast-icon-margin-end": "0px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "blurt-toast",
          icon: "blurt-toast-icon",
          content: "blurt-toast-content",
          title: "blurt-toast-title",
          description: "blurt-toast-description",
          actionButton: "blurt-toast-action",
          cancelButton: "blurt-toast-cancel",
          closeButton: "blurt-toast-close",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }