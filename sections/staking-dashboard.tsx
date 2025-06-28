'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { networks } from '@/lib/data';
import { ArrowUpDown, Filter, Search, Info, CheckCircle2, AlertTriangle, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type SortKey = 'name' | 'apr' | 'status';
type SortDirection = 'asc' | 'desc';
type FilterStatus = 'all' | 'active' | 'maintenance' | 'upcoming';

export function StakingDashboard() {
  const [sortKey, setSortKey] = useState<SortKey>('apr');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  // Filter and sort the networks
  const filteredNetworks = networks
    .filter(network => {
      // Filter by status
      if (filterStatus !== 'all' && network.status !== filterStatus) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        return network.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by the selected key
      if (sortKey === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortKey === 'apr') {
        return sortDirection === 'asc'
          ? a.apr - b.apr
          : b.apr - a.apr;
      } else if (sortKey === 'status') {
        const statusOrder = { active: 3, maintenance: 2, upcoming: 1 };
        return sortDirection === 'asc'
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      }
      return 0;
    });

  // Getting icon for sort direction
  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="h-4 w-4 opacity-50" />;
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-4 w-4 text-[#FF6B2C]" /> : 
      <ArrowDown className="h-4 w-4 text-[#FF6B2C]" />;
  };

  return (
    <section id="networks" className="py-24 relative">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-fixed bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b dark:from-[#0A0A0A] dark:via-transparent dark:to-[#0A0A0A] from-white via-transparent to-white"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 preserve-heading">
            Staking <span className="text-accent font-black">Dashboard</span>
          </h2>
          <p className="dark:text-white/70 text-gray-600 max-w-2xl mx-auto">
            Explore our validator services across various networks with real-time performance metrics and staking returns.
          </p>
        </motion.div>
        
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
              className={`rounded-lg h-7 text-xs dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 ${filterStatus === 'maintenance' ? 'dark:bg-amber-600/20 bg-amber-100 dark:text-amber-400 text-amber-600' : 'dark:text-white/60 text-gray-500'}`}
              onClick={() => setFilterStatus('maintenance')}
            >
              <AlertTriangle className="mr-1 h-3 w-3" />
              Maintenance
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
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-white/40 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search networks..."
              className="pl-9 dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Sort options */}
        <div className="flex justify-between items-center mb-6">
          <div className="dark:text-white/70 text-gray-600 text-sm">
            Showing {filteredNetworks.length} networks
          </div>
          <div className="flex items-center space-x-3">
            <span className="dark:text-white/70 text-gray-600 text-sm">Sort by:</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`rounded-lg h-8 text-xs dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 ${sortKey === 'name' ? 'border-accent/50 dark:text-white text-gray-900' : 'dark:text-white/60 text-gray-500'}`}
                onClick={() => handleSort('name')}
              >
                A-Z {getSortIcon('name')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-lg h-8 text-xs dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 ${sortKey === 'apr' ? 'border-accent/50 dark:text-white text-gray-900' : 'dark:text-white/60 text-gray-500'}`}
                    onClick={() => handleSort('apr')}
                  >
                APY ~ {getSortIcon('apr')}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Grid layout for networks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredNetworks.map((network, index) => (
            <motion.div 
                  key={network.id}
              initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
              className="rounded-xl bg-gradient-to-b dark:from-[#1E1E1E] dark:to-[#1a1a1a] from-white to-slate-50 p-[1px] overflow-hidden"
            >
              <div className="dark:bg-[#1E1E1E] bg-white rounded-xl p-4 h-full dark:shadow-[-6px_-6px_12px_#060606,6px_6px_12px_#1E1E1E] shadow-md hover:shadow-lg transition-all duration-300">
                {/* Header with logo and status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                      <div 
                      className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-3" 
                        style={{ backgroundColor: `${network.color}25` }}
                      >
                        <img
                          src={network.logo}
                          alt={`${network.name} logo`}
                        className="w-full h-full object-contain p-1.5"
                        />
                    </div>
                    <h3 className="font-medium text-base dark:text-white text-gray-900">{network.name}</h3>
                  </div>
                  <StatusBadge status={network.status} />
                </div>
                
                {/* APY Section */}
                <div className="p-3 dark:bg-[#2A2A2A]/30 bg-slate-100 rounded-lg mb-4 flex justify-between items-center">
                  <div>
                    <p className="dark:text-white/60 text-gray-500 text-xs mb-0.5">Current APY</p>
                    <div className="flex items-center">
                      <span className="dark:text-white text-gray-900 text-2xl font-bold">~{network.apr}%</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="ml-2 h-3.5 w-3.5 dark:text-white/50 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent className="dark:bg-[#1E1E1E] bg-white border-gray-200 dark:border-white/10 dark:text-white text-gray-900 p-3 rounded-lg">
                            <p>Estimated annual yield (approximation)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${network.color}30` }}>
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: network.color }}></div>
                  </div>
                </div>
                
                {/* Action Button */}
                    <Button 
                  className={`w-full h-9 text-sm ${network.status === 'active' ? 'bg-accent hover:bg-amber-500 text-white' : 'dark:bg-[#2A2A2A] bg-slate-200 hover:bg-slate-300 dark:hover:bg-[#3A3A3A] dark:text-white text-gray-500'} rounded-lg`}
                      disabled={network.status !== 'active'}
                    >
                  Delegate Now
                    </Button>
              </div>
            </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: 'active' | 'maintenance' | 'upcoming' }) {
  const statusConfig = {
    active: {
      variant: 'active' as const,
      label: 'Active',
      icon: <CheckCircle2 className="h-2.5 w-2.5" />,
    },
    maintenance: {
      variant: 'maintenance' as const,
      label: 'Maintenance',
      icon: <AlertTriangle className="h-2.5 w-2.5" />,
    },
    upcoming: {
      variant: 'upcoming' as const,
      label: 'Upcoming',
      icon: <Clock className="h-2.5 w-2.5" />,
    },
  };

  const config = statusConfig[status];

  const styles = {
    active: 'dark:bg-lime-500/20 bg-lime-100 dark:text-lime-500 text-lime-600 dark:border-lime-500/30 border-lime-200',
    maintenance: 'dark:bg-amber-600/20 bg-amber-100 dark:text-amber-400 text-amber-600 dark:border-amber-500/30 border-amber-200',
    upcoming: 'dark:bg-blue-600/20 bg-blue-100 dark:text-blue-400 text-blue-600 dark:border-blue-500/30 border-blue-200',
  };

  return (
    <div className={`inline-flex items-center text-[10px] px-1.5 py-0.5 rounded ${styles[status]}`}>
      {config.icon}
      <span className="ml-1">{config.label}</span>
    </div>
  );
}
