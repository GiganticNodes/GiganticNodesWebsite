import { Metadata } from 'next';
import Link from 'next/link';
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
        <BlogList />
      </div>
      <Footer />
    </div>
  );
}