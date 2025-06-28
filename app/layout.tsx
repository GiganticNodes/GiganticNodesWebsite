import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Gigantic Nodes | Secure Blockchain Infrastructure',
  description: 'Professional validator services across major networks',
  openGraph: {
    title: 'Gigantic Nodes',
    description: 'Professional validator node services',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://api.fontshare.com/v2/css?f=clash-display@400,500,600,700&display=swap" 
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window !== 'undefined') {
                    // Temporarily disable DevTools hook to prevent interference
                    window.__NEXT_HYDRATION_MARK__ = Date.now();
                    
                    // Menonaktifkan DevTools hook sementara untuk mencegah intervensi
                    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
                      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.isDisabled = true;
                    }
                    
                    // Add attributes to help identify elements injected by extensions
                    var observer = new MutationObserver(function(mutations) {
                      mutations.forEach(function(mutation) {
                        if (mutation.addedNodes.length) {
                          mutation.addedNodes.forEach(function(node) {
                            if (node.tagName === 'SCRIPT' && node.src && node.src.includes('chrome-extension')) {
                              node.setAttribute('data-extension', 'true');
                              node.setAttribute('data-nscript', 'ignored');
                            }
                          });
                        }
                      });
                    });
                    
                    observer.observe(document.documentElement, { 
                      childList: true, 
                      subtree: true 
                    });
                  }
                } catch (e) {
                  console.error('Hydration fix error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={cn(inter.variable, 'bg-background text-foreground antialiased font-sourcesans')}>
        <Providers>
          {/* Navbar handled in each layout */}
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}