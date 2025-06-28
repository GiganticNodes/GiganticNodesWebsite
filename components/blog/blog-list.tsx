'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = Array.from(new Set(blogPosts.map(post => post.category)));

// Define colors for each category
const categoryColors: Record<string, string> = {
  'All': '#5870CB', // More professional than orange
  'Education': '#4B91E2', // Softer blue
  'Security': '#36A288', // Softer green
  'Technical': '#9D7CD8', // Softer purple
  'Analysis': '#F0883B', // Softer orange
};

// Posts per page
const POSTS_PER_PAGE = 6;

export function BlogList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get page and category from URL query parameters
  const pageParam = searchParams.get('page');
  const categoryParam = searchParams.get('category');
  
  // Initialize state from URL or defaults
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam || null
  );
  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam, 10) : 1
  );
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;
    
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  
  // Get current page posts
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Update URL when page or category changes
  useEffect(() => {
    // Build query string
    const params = new URLSearchParams();
    if (currentPage > 1) {
      params.set('page', currentPage.toString());
    }
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    // Replace state to avoid adding new entries to history stack
    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';
    
    // Use replaceState to update URL without reloading
    window.history.replaceState(
      { 
        page: currentPage, 
        category: selectedCategory 
      }, 
      '', 
      newUrl
    );
  }, [currentPage, selectedCategory]);
  
  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Handle category change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  return (
    <div className="space-y-8">
      <div className="p-4 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-md border border-gray-100 dark:border-white/5 mb-6">
        <div className="flex items-center mb-4 border-b pb-3 border-gray-100 dark:border-white/5">
          <Filter className="h-4 w-4 mr-2 dark:text-white/70 text-gray-500" />
          <h3 className="text-sm font-medium dark:text-white text-gray-900">Filter Articles</h3>
          <div className="ml-auto text-xs dark:text-white/50 text-gray-500">
            {selectedCategory === null 
              ? 'Showing all articles' 
              : `Showing "${selectedCategory}" articles`}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
            style={{ 
              backgroundColor: selectedCategory === null ? `${categoryColors['All']}20` : 'transparent',
              borderColor: selectedCategory === null ? categoryColors['All'] : '',
              color: selectedCategory === null ? categoryColors['All'] : ''
            }}
            className={`rounded-lg relative ${selectedCategory !== null && 'dark:bg-[#1E1E1E] bg-gray-50 dark:text-white/70 text-gray-700 dark:border-white/10 border-gray-200 hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors'}`}
            onClick={() => handleCategoryChange(null)}
          >
            All
            {selectedCategory === null && (
              <motion.div 
                layoutId="activeCategoryIndicator"
                className="absolute -bottom-2 left-0 w-full h-0.5"
                style={{ backgroundColor: categoryColors['All'] }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
        </Button>
          
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const color = categoryColors[category] || categoryColors['All'];
            
            return (
          <Button
            key={category}
            variant="outline"
            size="sm"
                style={{ 
                  backgroundColor: isActive ? `${color}20` : 'transparent',
                  borderColor: isActive ? color : '',
                  color: isActive ? color : ''
                }}
                className={`rounded-lg relative ${!isActive && 'dark:bg-[#1E1E1E] bg-gray-50 dark:text-white/70 text-gray-700 dark:border-white/10 border-gray-200 hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors'}`}
                onClick={() => handleCategoryChange(category)}
          >
            {category}
                {isActive && (
                  <motion.div 
                    layoutId="activeCategoryIndicator"
                    className="absolute -bottom-2 left-0 w-full h-0.5"
                    style={{ backgroundColor: color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
          </Button>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.length > 0 ? (
          currentPosts.map((post, index) => {
            const color = categoryColors[post.category] || categoryColors['All'];
            
            return (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
          >
                <Link href={`/blog/${post.id}`} className="block h-full">
                  <div 
                    className="rounded-2xl overflow-hidden bg-card border border-border shadow-md h-full hover:shadow-lg transition-all duration-300 flex flex-col"
                    style={{
                      borderTop: selectedCategory ? `3px solid ${categoryColors[selectedCategory] || categoryColors['All']}` : ''
                    }}
                  >
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                  {post.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="glassy">Featured</Badge>
                    </div>
                  )}
                </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <Badge 
                          variant="ghost" 
                          className="whitespace-nowrap"
                          style={{ 
                            backgroundColor: `${color}20`,
                            color: color
                          }}
                        >
                          {post.category}
                        </Badge>
                        <div className="text-xs text-foreground/60 flex items-center whitespace-nowrap">
                      <Clock className="mr-1 h-3 w-3" />
                      {post.readTime} min read
                    </div>
                  </div>
                      <h3 className="font-heading text-lg font-semibold mb-3 h-14 line-clamp-2 text-foreground preserve-heading">{post.title}</h3>
                      <p className="text-foreground/70 text-sm flex-grow mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                      <div className="text-xs text-foreground/60 mt-auto flex justify-between items-center">
                        <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                        <span 
                          className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center"
                          style={{ color: selectedCategory ? (categoryColors[selectedCategory] || categoryColors['All']) : categoryColors['All'] }}
                        >
                          Read more →
                        </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
            );
          })
        ) : (
          <div className="col-span-3 p-8 rounded-xl bg-card border border-border shadow-md text-center">
            <p className="text-foreground/70 mb-4">
              No articles found in the <span style={{ color: categoryColors[selectedCategory || ''] || categoryColors['All'] }}>{selectedCategory}</span> category.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleCategoryChange(null)}
              className="dark:border-white/20 border-gray-300 dark:bg-white/5 bg-white/70 dark:text-white text-gray-900"
            >
              View all articles
            </Button>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-foreground/70 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "bg-accent text-white" : "text-foreground/70 hover:text-foreground"}
            >
              {index + 1}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-foreground/70 hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}