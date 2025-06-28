import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { BlogList } from '@/components/blog/blog-list';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Gigantic Nodes | Blog',
  description: 'Latest insights and updates from Gigantic Nodes',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-12 space-y-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold preserve-heading">
            Latest from <span className="text-accent">Gigantic Nodes</span>
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl">
            Explore our latest insights, tutorials, and updates on blockchain infrastructure,
            validator services, and network developments.
          </p>
        </div>
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-800 h-48 rounded-t-2xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        }>
          <BlogList />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}