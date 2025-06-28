'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { testnets } from '@/lib/data';
import { format } from 'date-fns';
import { Trophy, Calendar, Search, ArrowUpDown, ArrowUp, ArrowDown, CheckCircle2, Clock, Archive, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FilterStatus = 'all' | 'active' | 'archived' | 'upcoming' | 'completed';
type SortDirection = 'asc' | 'desc';

export function TestnetSection() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort the testnets
  const filteredTestnets = testnets
    .filter(testnet => {
      // Filter by status
      if (filterStatus !== 'all' && testnet.status !== filterStatus) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        return testnet.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by name
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  // Get the sort icon based on current sort direction
  const getSortIcon = () => {
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-4 w-4 text-accent" /> : 
      <ArrowDown className="h-4 w-4 text-accent" />;
  };

  // Component untuk testnet card dengan efek mouse glow
  const TestnetCard = ({ testnet, index }: { testnet: typeof testnets[0], index: number }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative rounded-xl bg-gradient-to-b dark:from-[#1E1E1E] dark:to-[#1a1a1a] from-white to-slate-50 p-[1px] overflow-hidden"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Efek glow latar yang mengikuti mouse */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 44, 0.25), transparent 50%)`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        
        {/* Efek glow border yang mengikuti mouse */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 44, 0.6), transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
        
        {/* Efek spotlight yang lebih intens */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 44, 0.4), transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />
        
        {/* Border highlight effect */}
        <div
          className={`absolute -inset-[1px] rounded-xl transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `conic-gradient(from 0deg at ${mousePosition.x}px ${mousePosition.y}px, transparent, rgba(255, 107, 44, 0.5), transparent)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div 
          className="relative p-6 rounded-xl dark:bg-[#1E1E1E] bg-white dark:shadow-[-8px_-8px_16px_#060606,8px_8px_16px_#1E1E1E] shadow-md border dark:border-white/5 border-gray-200 h-full transition-all duration-300 z-10"
          style={{
            boxShadow: isHovered 
              ? `0 0 30px rgba(255, 107, 44, 0.3), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
              : undefined
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full dark:bg-white/10 bg-gray-100 flex items-center justify-center p-0.5 overflow-hidden">
              <img src={testnet.logo} alt={testnet.name} className="w-full h-full object-cover object-center rounded-full" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-semibold">{testnet.name}</h3>
                <TestnetStatusBadge status={testnet.status} />
              </div>
              <div className="flex items-center gap-2 text-sm dark:text-white/60 text-gray-600 mt-1">
                <Calendar className="w-3 h-3" />
                {format(new Date(testnet.startDate), 'MMM yyyy')}
                {testnet.endDate ? ` - ${format(new Date(testnet.endDate), 'MMM yyyy')}` : ' - Present'}
              </div>
            </div>
          </div>
          
          {testnet.Contributors.length > 0 && (
            <div className="mt-4 bg-gradient-to-r dark:from-[#1a1a1a]/80 dark:to-[#1E1E1E]/80 from-gray-50 to-white/80 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3 dark:text-white/80 text-gray-800">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Contributors</span>
              </div>
              <ul className="space-y-1">
                {testnet.Contributors.map((achievement, i) => (
                  <li key={i} className="achievement-item text-sm dark:text-white/70 text-gray-700">
                    <div className="achievement-dot"></div>
                    <span className="achievement-text">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {testnet.status === 'upcoming' && testnet.Contributors.length === 0 && (
            <div className="mt-4 bg-gradient-to-r dark:from-[#1a1a1a]/80 dark:to-[#1E1E1E]/80 from-gray-50 to-white/80 p-4 rounded-lg">
              <p className="text-sm dark:text-white/60 text-gray-600 italic">Coming soon. Stay tuned for our participation in this testnet.</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="testnets" className="pt-32 pb-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 preserve-heading">
            Testnet <span className="text-accent">Participation</span>
          </h2>
          <p className="dark:text-white/70 text-gray-700 max-w-2xl mx-auto">
            Our active involvement in testnets helps us stay at the cutting edge of blockchain technology while contributing to protocol improvements.
          </p>
        </motion.div>

        {/* Filters, sort, and search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`rounded-lg h-7 text-xs dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 ${filterStatus === 'all' ? 'dark:text-white text-gray-900' : 'dark:text-white/60 text-gray-500'}`}
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`rounded-lg h-7 text-xs dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 ${filterStatus === 'active' ? 'dark:bg-lime-500/90 bg-lime-500 text-black font-medium' : 'dark:text-white/60 text-gray-500'}`}
              onClick={() => setFilterStatus('active')}
            >
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Active
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`rounded-lg h-7 text-xs dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 ${filterStatus === 'archived' ? 'dark:bg-amber-600/20 bg-amber-100 dark:text-amber-400 text-amber-600' : 'dark:text-white/60 text-gray-500'}`}
              onClick={() => setFilterStatus('archived')}
            >
              <Archive className="mr-1 h-3 w-3" />
              Archived
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`rounded-lg h-7 text-xs dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 ${filterStatus === 'completed' ? 'dark:bg-gray-500/20 bg-gray-100 dark:text-gray-400 text-gray-600' : 'dark:text-white/60 text-gray-500'}`}
              onClick={() => setFilterStatus('completed')}
            >
              <CheckSquare className="mr-1 h-3 w-3" />
              Completed
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`rounded-lg h-7 text-xs dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 ${filterStatus === 'upcoming' ? 'dark:bg-blue-600/20 bg-blue-100 dark:text-blue-400 text-blue-600' : 'dark:text-white/60 text-gray-500'}`}
              onClick={() => setFilterStatus('upcoming')}
            >
              <Clock className="mr-1 h-3 w-3" />
              Upcoming
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg h-8 text-xs dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10"
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            >
              A-Z {getSortIcon()}
            </Button>
            <div className="relative w-48 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-white/40 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search testnets..."
                className="pl-9 dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
          
        {/* Results count */}
        <div className="dark:text-white/70 text-gray-600 text-sm mb-6">
          Showing {filteredTestnets.length} testnet{filteredTestnets.length !== 1 ? 's' : ''}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestnets.length > 0 ? (
            filteredTestnets.map((testnet, index) => (
              <TestnetCard key={testnet.id} testnet={testnet} index={index} />
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 p-8 rounded-xl dark:bg-[#1E1E1E] bg-white dark:shadow-[-8px_-8px_16px_#060606,8px_8px_16px_#1E1E1E] shadow-md border dark:border-white/5 border-gray-200 text-center">
              <p className="dark:text-white/70 text-gray-600">No testnets found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TestnetStatusBadge({ status }: { status: 'active' | 'archived' | 'upcoming' | 'completed' }) {
  const statusConfig = {
    active: {
      variant: 'active' as const,
      label: 'Active',
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    archived: {
      variant: 'archived' as const,
      label: 'Archived',
      icon: <Archive className="h-3 w-3 mr-1" />,
    },
    completed: {
      variant: 'completed' as const,
      label: 'Completed',
      icon: <CheckSquare className="h-3 w-3 mr-1" />,
    },
    upcoming: {
      variant: 'upcoming' as const,
      label: 'Upcoming',
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
  };

  const config = statusConfig[status];

  const styles = {
    active: 'dark:bg-lime-500/20 bg-lime-100 dark:text-lime-500 text-lime-600 dark:border-lime-500/30 border-lime-200',
    archived: 'dark:bg-amber-600/20 bg-amber-100 dark:text-amber-400 text-amber-600 dark:border-amber-500/30 border-amber-200',
    completed: 'dark:bg-gray-500/20 bg-gray-100 dark:text-gray-400 text-gray-600 dark:border-gray-500/30 border-gray-200',
    upcoming: 'dark:bg-blue-600/20 bg-blue-100 dark:text-blue-400 text-blue-600 dark:border-blue-500/30 border-blue-200',
  };

  return (
    <div className={`inline-flex items-center justify-center text-xs font-medium px-2.5 py-1 rounded ${styles[status]}`}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}