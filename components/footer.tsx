'use client';

import Link from 'next/link';
import { 
  Mail, 
  Cpu, 
  Network,
  Globe,
  BarChart3
} from 'lucide-react';
import { XIcon } from './custom-icons';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="dark:bg-[#0A0A0A] bg-gray-100 dark:border-t dark:border-white/10 border-t border-gray-200 pt-16 pb-8" id="footer-contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
          <div className="space-y-4">
            <div className="font-heading text-2xl font-black preserve-heading">
              <span className="text-accent font-black">Gigantic</span>
              <span className="dark:text-white text-gray-900 font-black"> Nodes</span>
            </div>
            <p className="dark:text-white/60 text-gray-600 max-w-xs">
              Professional validator services and secure blockchain infrastructure across major networks.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 dark:text-white text-gray-900">Services</h3>
            <ul className="space-y-3">
              <li className="dark:text-white/60 text-gray-600 flex items-center gap-2">
                <Network size={16} />
                Validator Nodes
              </li>
              <li className="dark:text-white/60 text-gray-600 flex items-center gap-2">
                <Globe size={16} />
                RPC Endpoints
              </li>
              <li className="dark:text-white/60 text-gray-600 flex items-center gap-2">
                <Cpu size={16} />
                Node Monitoring
              </li>
              <li className="dark:text-white/60 text-gray-600 flex items-center gap-2">
                <BarChart3 size={16} />
                Gigantic Dashboard
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 dark:text-white text-gray-900">Contact US</h3>
            <ul className="space-y-3">
              <li className="dark:text-white/60 text-gray-600">
                <a href="mailto:contact@giganticnodes.com" className="flex items-center gap-2 hover:dark:text-white/80 hover:text-gray-900 transition-colors">
                  <Mail size={18} />
                  contact@giganticnodes.com
                </a>
              </li>
              <li className="dark:text-white/60 text-gray-600">
                <a href="https://twitter.com/GiganticNodes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:dark:text-white/80 hover:text-gray-900 transition-colors">
                  <XIcon size={18} />
                  @GiganticNodes
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <SocialLink href="https://twitter.com/GiganticNodes" icon={<XIcon size={20} />} />
              <SocialLink href="mailto:contact@giganticnodes.com" icon={<Mail size={20} />} />
            </div>
          </div>
        </div>
        
        <div className="pt-8 dark:border-t dark:border-white/10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="dark:text-white/60 text-gray-600 text-sm">
            &copy; {currentYear} Gigantic Nodes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full dark:bg-[#1E1E1E] bg-white border border-gray-200 dark:text-white/70 text-gray-600 dark:hover:text-white hover:text-gray-900 dark:hover:bg-[#2A2A2A] hover:bg-gray-50 transition-all duration-200 shadow-sm"
    >
      {icon}
    </a>
  );
}