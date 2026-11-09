import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// shadcn's class helper: joins conditional classes and lets later Tailwind classes win.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
