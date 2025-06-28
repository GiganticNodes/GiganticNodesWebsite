'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export function BackToBlogButton() {
  const router = useRouter();
  
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if we came from a blog page
    if (typeof window !== 'undefined' && document.referrer.includes('/blog') && !document.referrer.includes('/blog/')) {
      // Use browser's back button behavior if came from blog page
      router.back();
    } else {
      // Try to get the page and category from localStorage if available
      let targetUrl = '/blog';
      
      if (typeof window !== 'undefined') {
        try {
          // Get the URL before navigating to article
          const referrerUrl = new URL(document.referrer);
          
          // Only use the referrer if it's from the blog list page
          if (referrerUrl.pathname === '/blog') {
            // Extract query parameters from referrer
            const searchParams = referrerUrl.searchParams;
            const queryString = searchParams.toString();
            
            if (queryString) {
              targetUrl = `/blog?${queryString}`;
            }
          } else {
            // Check if we have state in history state
            const state = window.history.state;
            if (state && (state.page || state.category)) {
              const params = new URLSearchParams();
              if (state.page && state.page > 1) {
                params.set('page', state.page.toString());
              }
              if (state.category) {
                params.set('category', state.category);
              }
              
              const queryString = params.toString();
              if (queryString) {
                targetUrl = `/blog?${queryString}`;
              }
            }
          }
        } catch (error) {
          console.error('Error parsing referrer URL:', error);
        }
      }
      
      // Navigate to the target URL
      router.push(targetUrl);
    }
  };
  
  return (
    <div 
      onClick={handleBackClick}
      className="p-3 rounded-xl bg-card border border-border hover:shadow-md transition-all inline-block cursor-pointer"
    >
      <div className="flex items-center text-foreground/60 hover:text-accent transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" />
        <span className="text-sm">Back to Blog</span>
      </div>
    </div>
  );
} 