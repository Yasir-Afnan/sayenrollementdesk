import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.99]',
  {
    variants: {
      variant: {
        default:
          'bg-brand-600 dark:bg-brand-500 text-white shadow-xs hover:bg-brand-700 dark:hover:bg-brand-600',
        destructive:
          'bg-red-600 dark:bg-red-500 text-white shadow-xs hover:bg-red-700 dark:hover:bg-red-600',
        outline:
          'border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#0e1424] hover:bg-surface-50 dark:hover:bg-surface-800 text-surface-900 dark:text-surface-100 shadow-2xs',
        secondary:
          'bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-surface-100 hover:bg-surface-200 dark:hover:bg-surface-700',
        ghost:
          'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white',
        link: 'text-brand-600 dark:text-brand-400 underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
