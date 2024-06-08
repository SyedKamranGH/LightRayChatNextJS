import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * @deprecated
 * This function is a wrapper around clsx and tailwind-merge.
 * twMerge merges tailwind classes without conflicts
 * clsx is a utility for constructing className strings conditionally
 * Example:
 * className={cn('text-red-500', { 'text-gray-500': true })}
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
