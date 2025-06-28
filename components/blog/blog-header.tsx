'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Networks', path: '/#networks' },
  { name: 'Services', path: '/#services' },
  { name: 'Testnets', path: '/#testnets' },
  { name: 'Blog', path: '/blog' },
];

export function BlogHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('/blog');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle scrolling to section when hash link is clicked
  const handleHashLinkClick = (path: string) => {
    setActiveItem(path);
    
    if (path.includes('#')) {
      // If we are on the blog page, first redirect to home
      if (pathname.startsWith('/blog')) {
        router.push('/');
        // Allow a little time for navigation to complete
        setTimeout(() => {
          const hash = path.split('#')[1];
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const hash = path.split('#')[1];
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 transition-all duration-300 z-50',
        scrolled 
          ? 'bg-background/80 backdrop-blur-lg py-4 shadow-md'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center"
          onClick={() => setActiveItem('/')}
        >
          <h1 className="font-heading text-2xl font-black preserve-heading text-foreground">
                          <span className="text-accent font-black">Gigantic</span> Nodes
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-1 p-1 rounded-xl bg-card/50 backdrop-blur-md">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 inline-block',
                      activeItem === item.path
                        ? 'bg-card text-foreground shadow-inner' 
                        : 'text-foreground/70 hover:text-foreground hover:bg-card/80'
                    )}
                    onClick={(e) => {
                      if (item.path.includes('#')) {
                        e.preventDefault();
                        handleHashLinkClick(item.path);
                      } else {
                        setActiveItem(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile: Back Button and Theme Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <Link href="/">
            <Button 
              variant="outline" 
              size="sm"
              className="text-foreground hover:text-foreground hover:bg-accent/10 pl-3 relative z-40 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}