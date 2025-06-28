import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to detect if code is running on client side
 */
export function isClient() {
  return typeof window !== 'undefined';
}

/**
 * Utility function to wait for component to be rendered on client side
 */
export function useIsMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

/**
 * Utility to help address issues with browser extensions interfering with hydration
 */
export function disableDevtoolsHook() {
  if (typeof window === 'undefined') return;
  
  try {
    // Try to set flag on devtools hook
    Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
      get() {
        return { isDisabled: true };
      }
    });
  } catch (e) {
    // Ignore errors
  }
}
