import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Compositie style: 2px slate frame + offset block shadow that "presses in"
// on click. ghost/link/icon keep no frame so toolbars and menus stay light.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border-2 border-foreground text-sm font-bold tracking-[0.02em] shadow-[4px_4px_0_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_hsl(var(--foreground))] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        destructive:
          "bg-destructive text-destructive-foreground",
        outline:
          "bg-background text-foreground",
        secondary:
          "bg-secondary text-foreground",
        ghost: "border-0 shadow-none hover:translate-x-0 hover:translate-y-0 hover:shadow-none hover:bg-secondary/60 active:translate-x-0 active:translate-y-0",
        link: "border-0 shadow-none text-primary underline-offset-4 hover:translate-x-0 hover:translate-y-0 hover:shadow-none hover:underline active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-[12.5px] shadow-[3px_3px_0_hsl(var(--foreground))] hover:shadow-[5px_5px_0_hsl(var(--foreground))]",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-10 w-10 border-0 shadow-none hover:translate-x-0 hover:translate-y-0 hover:shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
