'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';
import { format } from 'date-fns';

export function BlogPreview() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured).slice(0, 3);

  return (
    <section id="blog" className="py-24 dark:bg-[#0A0A0A] bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
        >
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 preserve-heading">
              Latest from our <span className="text-accent font-black">Blog</span>
            </h2>
            <p className="dark:text-white/70 text-gray-600 max-w-xl">
              Insights, updates, and expert analysis on blockchain infrastructure and validator operations.
            </p>
          </div>
          <Link href="/blog" className="mt-4 md:mt-0">
            <Button variant="outline" className="dark:border-white/20 border-gray-300 dark:bg-white/5 bg-white/70 dark:text-white text-gray-900 dark:hover:bg-white/10 hover:bg-white">
              View all articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredPost && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Link href={`/blog/${featuredPost.id}`} className="block">
                <div className="rounded-2xl overflow-hidden dark:bg-[#1E1E1E] bg-white dark:border-white/5 border border-gray-200 dark:shadow-[-8px_-8px_16px_#060606,8px_8px_16px_#1E1E1E] shadow-md hover:shadow-lg dark:hover:shadow-[-12px_-12px_20px_#060606,12px_12px_20px_#1E1E1E] transition-all duration-300">
                  <div className="relative h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-[#1E1E1E]/90 to-white/90"></div>
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 p-6">
                      <Badge variant="glassy" className="mb-3">
                        Featured
                      </Badge>
                      <h3 className="font-heading text-2xl font-bold mb-3 dark:text-white text-gray-900">{featuredPost.title}</h3>
                      <div className="flex items-center space-x-4">
                        <Badge variant="ghost">{featuredPost.category}</Badge>
                        <div className="text-sm dark:text-white/60 text-gray-600 flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {featuredPost.readTime} min read
                        </div>
                        <div className="text-sm dark:text-white/60 text-gray-600">
                          {format(new Date(featuredPost.date), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="dark:text-white/70 text-gray-600">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
          
          {regularPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.id}`} className="block h-full">
                <div className="rounded-2xl overflow-hidden dark:bg-[#1E1E1E] bg-white dark:border-white/5 border border-gray-200 dark:shadow-[-8px_-8px_16px_#060606,8px_8px_16px_#1E1E1E] shadow-md h-full dark:hover:shadow-[-12px_-12px_20px_#060606,12px_12px_20px_#1E1E1E] hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="relative h-48">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="ghost" className="whitespace-nowrap">{post.category}</Badge>
                      <div className="text-xs dark:text-white/60 text-gray-600 flex items-center whitespace-nowrap">
                        <Clock className="mr-1 h-3 w-3" />
                        {post.readTime} min read
                      </div>
                    </div>
                    <h3 className="font-heading text-lg font-bold mb-3 h-14 line-clamp-2 dark:text-white text-gray-900">{post.title}</h3>
                    <p className="dark:text-white/70 text-gray-600 text-sm flex-grow mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="text-xs dark:text-white/60 text-gray-500 mt-auto">
                      {format(new Date(post.date), 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}