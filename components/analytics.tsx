'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Type declarations for analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    plausible: (event: string, options?: { url?: string }) => void;
    dataLayer: any[];
  }
}

// Isolate script that interacts with browser
const AnalyticsScripts = dynamic(() => Promise.resolve(
  function AnalyticsScripts() {
    return (
      <>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID`}
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MEASUREMENT_ID');
            `,
          }}
        />
        
        {/* Plausible Analytics */}
        <script
          async
          data-domain="giganticvalidator.com"
          src="https://plausible.io/js/script.js"
        />
      </>
    );
  }
), { ssr: false });

export function Analytics() {
  useEffect(() => {
    // Jangan lakukan apa-apa di server
    if (typeof window === 'undefined') return;
    
    // Preparing object for pageview tracking
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag('config', 'G-MEASUREMENT_ID', {
          page_path: url,
        });
      }
      
      if (window.plausible) {
        window.plausible('pageview', { url });
      }
    };

    // Mencatat pageview awal
    const currentPath = window.location.pathname + window.location.search;
    handleRouteChange(currentPath);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return <AnalyticsScripts />;
}