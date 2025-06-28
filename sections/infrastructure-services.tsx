'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { services } from '@/lib/data';
import { Server, Globe, Activity, Shield, BarChart3 } from 'lucide-react';

export function InfrastructureServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Calculate which service should be active based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const totalServices = services.length;
      // Adjust sensitivity for mobile devices
      const isMobile = window.innerWidth < 768;
      const adjustedProgress = isMobile ? latest * 1.2 : latest;
      const newIndex = Math.min(
        Math.floor(adjustedProgress * totalServices), 
        totalServices - 1
      );
      setActiveIndex(newIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'server':
        return <Server className="h-12 w-12 text-accent" />;
      case 'globe':
        return <Globe className="h-12 w-12 text-accent" />;
      case 'activity':
        return <Activity className="h-12 w-12 text-accent" />;
      case 'shield':
        return <Shield className="h-12 w-12 text-accent" />;
      case 'dashboard':
        return <BarChart3 className="h-12 w-12 text-accent" />;
      default:
        return <Server className="h-12 w-12 text-accent" />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative"
      style={{ 
        height: typeof window !== 'undefined' && window.innerWidth < 768 
          ? `${services.length * 60 + 30}vh` 
          : `${services.length * 80 + 40}vh` 
      }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden touch-pan-y">
                 <div className="container mx-auto px-4 sm:px-6 py-safe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center h-full max-w-6xl mx-auto min-h-0">
            
             {/* Left Side - Service Content */}
             <div className="relative h-full flex flex-col justify-center py-4 order-1">
               {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="mb-6 lg:mb-12"
        >
                 <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 lg:mb-4 preserve-heading dark:text-white text-gray-900">
            Infrastructure <span className="text-accent font-black">Services</span>
          </h2>
                 <p className="dark:text-white/70 text-gray-600 text-sm sm:text-base lg:text-lg">
            Our enterprise-grade infrastructure and technical expertise ensures optimal performance for your blockchain operations.
          </p>
        </motion.div>

               {/* Service Content - Changes based on scroll */}
               <div className="relative h-64 sm:h-72 lg:h-96">
                {services.map((service, index) => (
              <motion.div
                key={service.id}
                    className="absolute inset-0 flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                                         <div className="flex items-start mb-4 lg:mb-6">
                       <div className="rounded-xl lg:rounded-2xl dark:bg-[#2A2A2A] bg-slate-100 p-2 sm:p-3 lg:p-4 mr-3 sm:mr-4 lg:mr-6 flex-shrink-0">
                         {React.cloneElement(getIcon(service.icon), { 
                           className: "h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-accent" 
                         })}
                       </div>
                       <div className="flex-1 min-w-0">
                         <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-heading font-bold mb-2 lg:mb-4 dark:text-white text-gray-900">
                           {service.title}
                         </h3>
                         <p className="dark:text-white/70 text-gray-600 text-sm sm:text-base lg:text-lg mb-4 lg:mb-6 leading-relaxed">
                           {service.description}
                         </p>
                       </div>
                    </div>
                      
                     <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                        {service.features.map((feature, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: activeIndex === index ? 1 : 0,
                            x: activeIndex === index ? 0 : -20,
                          }}
                          transition={{ 
                            duration: 0.3, 
                            delay: activeIndex === index ? i * 0.1 : 0,
                            ease: "easeOut"
                          }}
                        >
                                                     <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent mr-2 sm:mr-3 lg:mr-4 flex-shrink-0"></div>
                           <span className="text-xs sm:text-sm lg:text-base dark:text-white/80 text-gray-700">
                             {feature}
                           </span>
                        </motion.div>
                        ))}
                </div>
              </motion.div>
            ))}
          </div>
          
                             {/* Progress Indicator */}
               <div className="flex space-x-2 sm:space-x-3 mt-4 lg:mt-8 justify-center lg:justify-start">
                 {services.map((_, index) => (
                   <div
                     key={index}
                     className={`h-1 rounded-full transition-all duration-300 ${
                       activeIndex === index 
                         ? 'w-8 sm:w-10 lg:w-12 bg-accent' 
                         : 'w-3 sm:w-4 dark:bg-white/20 bg-gray-300'
                     }`}
                   />
                 ))}
               </div>
            </div>

                         {/* Right Side - Visual Content */}
             <div className="relative h-full flex items-center justify-center mt-4 lg:mt-0 order-2 lg:order-2">
               <div className="relative w-full max-w-sm lg:max-w-lg">
                 {/* Background Glow */}
                 <div className="absolute inset-0 bg-accent/20 blur-2xl lg:blur-3xl rounded-full scale-125 lg:scale-150" />
                 
                 {/* Main Visual Container */}
                 <div className="relative rounded-2xl lg:rounded-3xl dark:bg-gradient-to-br dark:from-[#1E1E1E] dark:to-[#2A2A2A] bg-gradient-to-br from-white to-slate-100 p-4 sm:p-6 lg:p-8 border dark:border-white/10 border-gray-200 shadow-lg lg:shadow-2xl">
                  
                  {/* Service Visual Content */}
                  {services.map((service, index) => (
                                         <motion.div
                       key={service.id}
                       className="absolute inset-4 sm:inset-6 lg:inset-8"
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ 
                         opacity: activeIndex === index ? 1 : 0,
                         scale: activeIndex === index ? 1 : 0.9,
                       }}
                       transition={{ duration: 0.5, ease: "easeInOut" }}
                     >
                       <div className="h-full flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 lg:space-y-6">
                         
                         {/* Large Icon */}
            <motion.div
                           className="rounded-2xl lg:rounded-3xl dark:bg-[#2A2A2A] bg-slate-100 p-3 sm:p-4 lg:p-6 xl:p-8"
                           animate={{ 
                             rotate: activeIndex === index ? [0, 5, -5, 0] : 0,
                           }}
                           transition={{ 
                             duration: 2, 
                             repeat: activeIndex === index ? Infinity : 0,
                             ease: "easeInOut"
                           }}
                         >
                           {React.cloneElement(getIcon(service.icon), { 
                             className: "h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16 text-accent" 
                           })}
                         </motion.div>

                         {/* Service Stats/Info */}
                         <div className="space-y-2 sm:space-y-3 lg:space-y-4 w-full">
                                                     {index === 0 && ( // Validator Nodes
                             <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                               <div className="dark:bg-[#1A1A1A] bg-slate-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4">
                                 <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent">99.9%</div>
                                 <div className="text-xs sm:text-sm dark:text-white/60 text-gray-500">Uptime</div>
                               </div>
                               <div className="dark:bg-[#1A1A1A] bg-slate-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4">
                                 <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent">24/7</div>
                                 <div className="text-xs sm:text-sm dark:text-white/60 text-gray-500">Monitoring</div>
                               </div>
                             </div>
                           )}
                           
                           {index === 1 && ( // RPC Endpoints
                             <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                               <div className="dark:bg-[#1A1A1A] bg-slate-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4">
                                 <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent">&lt;100ms</div>
                                 <div className="text-xs sm:text-sm dark:text-white/60 text-gray-500">Latency</div>
                               </div>
                               <div className="dark:bg-[#1A1A1A] bg-slate-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4">
                                 <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent">10Gb/s</div>
                                 <div className="text-xs sm:text-sm dark:text-white/60 text-gray-500">Bandwidth</div>
                               </div>
                  </div>
                           )}

                           {index === 2 && ( // Node Monitoring
                             <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                               <div className="dark:bg-[#1A1A1A] bg-slate-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4">
                                 <div className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold text-accent">Real-time</div>
                                 <div className="text-xs sm:text-sm dark:text-white/60 text-gray-500">Alerts</div>
                        </div>
                               <div className="dark:bg-[#1A1A1A] bg-slate-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4">
                                 <div className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold text-accent">Multi-chain</div>
                                 <div className="text-xs sm:text-sm dark:text-white/60 text-gray-500">Support</div>
                    </div>
                  </div>
                           )}

                           {index === 3 && ( // Gigantic Dashboard
                             <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                               <div className="dark:bg-[#1A1A1A] bg-slate-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4">
                                 <div className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold text-accent">One-click</div>
                                 <div className="text-xs sm:text-sm dark:text-white/60 text-gray-500">Staking</div>
                               </div>
                               <div className="dark:bg-[#1A1A1A] bg-slate-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4">
                                 <div className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold text-accent">Portfolio</div>
                                 <div className="text-xs sm:text-sm dark:text-white/60 text-gray-500">Tracking</div>
                </div>
              </div>
          )}
        </div>
            </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

             {/* Enterprise Solutions Section - After scroll */}
       <div className="absolute -bottom-8 sm:-bottom-12 lg:-bottom-48 xl:-bottom-40 w-full">
         <div className="bg-gradient-to-t dark:from-[#0A0A0A]/95 from-gray-50/95 dark:to-[#0A0A0A]/80 to-gray-50/80 backdrop-blur-sm rounded-t-3xl mx-2 sm:mx-4 lg:mx-0 lg:rounded-none lg:bg-gradient-to-t lg:dark:from-[#0A0A0A] lg:from-gray-50">
                        <div className="pt-8 sm:pt-12 lg:pt-40 xl:pt-36 pb-6 sm:pb-8 lg:pb-20 xl:pb-16">
             <div className="container mx-auto px-4 sm:px-6">
               <div className="max-w-4xl mx-auto text-center">
                 <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8 }}
                   viewport={{ once: true }}
                 >
                   <h3 className="font-heading text-lg sm:text-xl lg:text-3xl font-bold mb-2 sm:mb-3 lg:mb-6 dark:text-white text-gray-900">
                     Enterprise Solutions
                   </h3>
                   <p className="dark:text-white/70 text-gray-600 text-xs sm:text-sm lg:text-lg mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                     Tailored blockchain infrastructure solutions for best layer 1 projects.
                   </p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-6">
                     {[
                       'Dedicated hardware resources',
                       'Multi-region deployment',
                       '24/7 technical support'
                     ].map((feature, i) => (
                       <motion.div
                         key={i}
                         className="dark:bg-[#1E1E1E]/80 bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-2xl p-3 sm:p-4 lg:p-6 border dark:border-white/10 border-gray-200/50"
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5, delay: i * 0.1 }}
                         viewport={{ once: true }}
                       >
                         <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 lg:h-2 lg:w-2 rounded-full bg-accent mx-auto mb-1 sm:mb-2 lg:mb-4"></div>
                         <span className="dark:text-white text-gray-800 font-medium text-xs sm:text-xs lg:text-base leading-tight block">{feature}</span>
                       </motion.div>
                     ))}
                   </div>
                 </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}