'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/analytics';
import { useEffect, useState } from 'react';

// Adding a type declaration for window.__REACT_DEVTOOLS_GLOBAL_HOOK__
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      isDisabled: boolean;
    };
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay rendering until client-side mounting is complete
    // to prevent hydration issues
    setMounted(true);

    // Handling Chrome extensions that might interfere with hydration
    const handleExtensionInit = () => {
      // If there is injection from browser extensions, this will happen after hydration
      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__.isDisabled = true;
      }
    };

    handleExtensionInit();
    window.addEventListener('load', handleExtensionInit);
    
    return () => window.removeEventListener('load', handleExtensionInit);
  }, []);

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
    >
      {mounted ? (
        <>
          <Analytics />
          {children}
          <Toaster />
        </>
      ) : (
        // Placeholder while component is not yet mounted on client
        <div style={{ visibility: 'hidden' }}>{children}</div>
      )}
    </ThemeProvider>
  );
}