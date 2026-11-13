import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options?: SelectOption[]
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, helperText, id, options, placeholder, children, ...props },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-300"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#070b14] px-3.5 py-2 text-sm text-surface-900 dark:text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:bg-surface-50 dark:disabled:bg-surface-900 disabled:text-surface-400 transition-colors shadow-2xs',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled selected={props.value === ''}>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white dark:bg-surface-900 text-surface-900 dark:text-white">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-surface-500 dark:text-surface-400">{helperText}</p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
