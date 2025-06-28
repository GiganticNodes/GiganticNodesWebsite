'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/theme-toggle';

interface NavItem {
  name: string;
  path: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/#services' },
  { name: 'Testnets', path: '/#testnets' },
  { name: 'Blog', path: '/blog' },
  { name: 'Explorer', path: 'https://explorer.giganticvalidator.com', external: true },
  { name: 'Contact', path: '/#footer-contact' },
];

// Isolate component with client-side state
const MobileMenu = dynamic(() => Promise.resolve(({ isOpen, items, activeItem, setActiveItem, onClose }: { 
  isOpen: boolean; 
  items: NavItem[]; 
  activeItem: string;
  setActiveItem: (path: string) => void;
  onClose: () => void;
}) => {
  return (
    <div className={cn(
      "md:hidden dark:bg-[#1E1E1E] bg-white py-6 px-6 shadow-lg border-t dark:border-[#2A2A2A] border-gray-200 rounded-b-[2rem] mx-4",
      "transition-all duration-300 ease-in-out fixed left-0 right-0 top-[80px]",
      isOpen 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 -translate-y-4 pointer-events-none"
    )}>
      <nav>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li 
              key={item.name}
              className="transform transition-all"
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(-10px)'
              }}
            >
              {item.external ? (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'block px-4 py-3 rounded-full font-medium transition-all duration-200',
                    'dark:text-white/70 text-gray-600 hover:dark:text-white hover:text-gray-900 hover:dark:bg-[#2A2A2A]/50 hover:bg-slate-100/70'
                  )}
                  onClick={() => {
                    onClose();
                  }}
                >
                  {item.name}
                </a>
              ) : (
              <Link
                href={item.path}
                className={cn(
                    'block px-4 py-3 rounded-full font-medium transition-all duration-200',
                  activeItem === item.path
                    ? 'dark:bg-[#2A2A2A] bg-slate-100 dark:text-white text-gray-900'
                    : 'dark:text-white/70 text-gray-600 hover:dark:text-white hover:text-gray-900 hover:dark:bg-[#2A2A2A]/50 hover:bg-slate-100/70'
                )}
                onClick={() => {
                  setActiveItem(item.path);
                  onClose();
                }}
              >
                {item.name}
              </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}), { ssr: false });

// Helper function to determine if link is active
function isLinkActive(itemPath: string, currentPath: string): boolean {
  // If item is home page
  if (itemPath === '/') {
    return currentPath === '/' || currentPath === '';
  }
  
  // For links with hash fragment
  if (itemPath.includes('#')) {
    const basePath = itemPath.split('#')[0];
    // Home with hash fragment, like '/#networks'
    if (basePath === '') {
      return currentPath === '/' || currentPath === '';
    }
    // Other pages with hash fragment
    return currentPath.startsWith(basePath);
  }
  
  // For regular pages like '/blog'
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const navItemRefs = useRef<(HTMLElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);
  
  // Check if current page is blog detail page
  const isBlogDetailPage = pathname.startsWith('/blog/') && pathname !== '/blog';

  // Function to get active item position for animation
  const getActiveItemPosition = () => {
    const nonExternalItems = navItems.filter(item => !item.external);
    const activeIndex = nonExternalItems.findIndex(item => item.path === activeItem);
    if (activeIndex === -1 || !navItemRefs.current[activeIndex] || !navContainerRef.current) return 0;
    
    const activeElement = navItemRefs.current[activeIndex];
    if (!activeElement) return 0;
    
    const containerRect = navContainerRef.current.getBoundingClientRect();
    const activeRect = activeElement.getBoundingClientRect();
    
    return activeRect.left - containerRect.left;
  };

  // Function to get active item width for animation
  const getActiveItemWidth = () => {
    const nonExternalItems = navItems.filter(item => !item.external);
    const activeIndex = nonExternalItems.findIndex(item => item.path === activeItem);
    if (activeIndex === -1 || !navItemRefs.current[activeIndex]) return 0;
    
    const activeElement = navItemRefs.current[activeIndex];
    if (!activeElement) return 0;
    
    return activeElement.offsetWidth;
  };

  // Function to detect active section based on scroll
  const detectActiveSection = () => {
    if (pathname !== '/') return;
    
    const sections = ['services', 'testnets', 'blog', 'footer-contact'];
    
    // Special handling for footer-contact (usually at bottom of page)
    const footerElement = document.getElementById('footer-contact');
    if (footerElement) {
      const footerRect = footerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If footer is visible or we're near the bottom of the page
      if (footerRect.top <= windowHeight && footerRect.bottom >= 0) {
        // Check if we're in the lower half of the footer or near bottom of page
        const scrollPosition = window.scrollY + windowHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (footerRect.top <= windowHeight * 0.7 || scrollPosition >= documentHeight - 100) {
          setActiveItem('/#footer-contact');
          return;
        }
      }
    }
    
    // Check other sections in reverse order (bottom to top)
    for (let i = sections.length - 2; i >= 0; i--) {
      const section = sections[i];
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If element is in viewport (with top margin for header)
        if (rect.top <= 300 && rect.bottom >= 300) {
          // If the visible section is blog, set activeItem to '/blog' to activate the Blog menu
          if (section === 'blog') {
            setActiveItem('/blog');
          } else {
            setActiveItem(`/#${section}`);
          }
          return;
        }
      }
    }
    
    // If no section is detected, set active to home
    setActiveItem('/');
  };

  // Initialize active item based on pathname and hash at first load
  useEffect(() => {
    setIsMounted(true);
    
    // Set active item based on pathname
    if (pathname === '/blog') {
      setActiveItem('/blog');
    } else if (pathname === '/') {
      // Check if there is hash in URL
      if (window.location.hash) {
        setActiveItem(`/${window.location.hash}`);
      } else {
        setActiveItem('/');
      }
      // Always enable scroll detection for sections on home page
      window.addEventListener('scroll', detectActiveSection);
      // Run initial detection
      detectActiveSection();
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', detectActiveSection);
    };
  }, [pathname]);

  // Initialize refs array
  useEffect(() => {
    const nonExternalCount = navItems.filter(item => !item.external).length;
    navItemRefs.current = navItemRefs.current.slice(0, nonExternalCount);
  }, []);

  // Trigger animation update when activeItem changes
  const [, forceUpdate] = useState({});
  useEffect(() => {
    // Force a re-render to update slider position
    forceUpdate({});
  }, [activeItem]);

  // Function to handle scrolling to section when hash link is clicked
  const handleHashLinkClick = (path: string) => {
    // Always update active item
    setActiveItem(path);
    
    if (path.includes('#')) {
      // If we are on the blog page, need to navigate to home first
      if (pathname.startsWith('/blog')) {
        router.push('/');
        // Allow time for navigation to complete before scrolling
        setTimeout(() => {
          const hash = path.split('#')[1];
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        const hash = path.split('#')[1];
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Update URL with hash without reloading the page
          window.history.pushState(null, '', path);
        }
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 transition-all duration-300',
        isBlogDetailPage ? 'z-30' : 'z-50',
        scrolled 
          ? 'dark:bg-[#0A0A0A]/80 bg-white/90 backdrop-blur-lg py-5 shadow-md'
          : 'bg-transparent py-8'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center"
          onClick={() => setActiveItem('/')}
        >
                      <h1 className="font-heading text-3xl font-black preserve-heading">
              <span className="text-accent font-black">Gigantic</span>
              <span className="dark:text-white text-gray-900 font-black"> Nodes</span>
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav>
            <div ref={navContainerRef} className="relative px-3 py-2 rounded-full dark:bg-[#1E1E1E]/50 bg-slate-100/80 backdrop-blur-md border dark:border-white/10 border-gray-200/50">
              {/* Animated background slider */}
              <div 
                className="absolute top-2 bottom-2 bg-gradient-to-r dark:from-[#2A2A2A] dark:to-[#2A2A2A] from-white to-white rounded-full shadow-inner"
                style={{
                  left: `${getActiveItemPosition()}px`,
                  width: `${getActiveItemWidth()}px`,
                  opacity: getActiveItemWidth() > 0 ? 1 : 0,
                  transition: 'left 250ms cubic-bezier(0.4, 0, 0.2, 1), width 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease-out',
                  willChange: 'left, width, opacity'
                }}
              />
              
              <ul className="relative flex space-x-2">
                {navItems.map((item, index) => (
                <li key={item.name}>
                    {item.external ? (
                      <a 
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 inline-block relative z-10',
                          'dark:text-white/70 text-gray-600 hover:dark:text-white hover:text-gray-900'
                        )}
                      >
                        {item.name}
                      </a>
                    ) : (
                  <Link 
                        ref={(el) => {
                          if (el) {
                            const nonExternalItems = navItems.filter(i => !i.external);
                            const refIndex = nonExternalItems.findIndex(i => i.path === item.path);
                            if (refIndex !== -1) {
                              navItemRefs.current[refIndex] = el;
                            }
                          }
                        }}
                    href={item.path}
                    className={cn(
                          'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 inline-block relative z-10',
                      activeItem === item.path
                            ? 'dark:text-white text-gray-900' 
                            : 'dark:text-white/70 text-gray-600 hover:dark:text-white hover:text-gray-900'
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
                    )}
                </li>
              ))}
            </ul>
            </div>
          </nav>
          
          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile Menu Button dan Theme Toggle */}
        {isMounted && (
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
          <button 
              className="dark:text-white text-gray-900 p-2 relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform duration-300 ease-in-out"
              style={{
                transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
              }}
            >
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12" className="transform transition-transform duration-300 origin-center" />
                  <line x1="4" y1="6" x2="20" y2="6" className="transform transition-transform duration-300 origin-center" />
                  <line x1="4" y1="18" x2="20" y2="18" className="transform transition-transform duration-300 origin-center" />
                </>
              )}
            </svg>
          </button>
          </div>
        )}
      </div>
      
      {/* Mobile Menu - menggunakan komponen yang di-render di client side */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        items={navItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}