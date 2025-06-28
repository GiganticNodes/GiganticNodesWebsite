'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-accent text-white shadow hover:bg-amber-500',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        active: 'border-transparent dark:bg-green-600 bg-green-500 text-white',
        maintenance: 'border-transparent dark:bg-yellow-600 bg-yellow-500 text-white',
        upcoming: 'border-transparent dark:bg-blue-600 bg-blue-500 text-white',
        completed: 'border-transparent bg-gray-500 text-white',
        ghost: 'border-transparent dark:bg-white/10 bg-gray-100 dark:text-white text-gray-700 dark:hover:bg-white/20 hover:bg-gray-200',
        glassy: 'dark:border-white/20 border-gray-200 dark:bg-white/5 bg-white/70 backdrop-blur-sm dark:text-white text-gray-900',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-[0.65rem]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };