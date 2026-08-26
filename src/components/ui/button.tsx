import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border-2 border-black font-bold uppercase tracking-wider text-sm whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#D02020] text-white hover:bg-[#b01818] shadow-[3px_3px_0px_0px_#121212] sm:shadow-[4px_4px_0px_0px_#121212]",
        secondary:
          "bg-[#1040C0] text-white hover:bg-[#0c329c] shadow-[3px_3px_0px_0px_#121212] sm:shadow-[4px_4px_0px_0px_#121212]",
        yellow:
          "bg-[#F0C020] text-[#121212] hover:bg-[#d6aa1a] shadow-[3px_3px_0px_0px_#121212] sm:shadow-[4px_4px_0px_0px_#121212]",
        outline:
          "bg-white text-[#121212] hover:bg-[#E0E0E0] shadow-[3px_3px_0px_0px_#121212] sm:shadow-[4px_4px_0px_0px_#121212]",
        ghost:
          "border-transparent bg-transparent text-[#121212] hover:bg-[#E0E0E0] hover:border-black active:shadow-none",
        destructive:
          "bg-[#D02020] text-white hover:bg-[#b01818] shadow-[3px_3px_0px_0px_#121212] sm:shadow-[4px_4px_0px_0px_#121212]",
        link:
          "border-none text-[#1040C0] underline-offset-4 hover:underline active:translate-x-0 active:translate-y-0",
      },
      size: {
        default:
          "h-10 gap-2 px-5 py-2 text-sm",
        xs: "h-7 gap-1 px-2.5 text-xs",
        sm: "h-8 gap-1.5 px-3.5 text-xs",
        lg: "h-12 gap-2.5 px-7 text-base font-extrabold",
        icon: "size-10 p-0",
        "icon-xs": "size-7 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<typeof ButtonPrimitive>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }