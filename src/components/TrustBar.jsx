import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones, Sparkles } from 'lucide-react';

export default function TrustBar() {
  const perks = [
    {
      icon: Truck,
      title: 'Free Worldwide Shipping',
      subtitle: 'On all orders above $75',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
    },
    {
      icon: ShieldCheck,
      title: 'Official 2-Year Warranty',
      subtitle: '100% Genuine Certified Devices',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      icon: RotateCcw,
      title: '30-Day Hassle-Free Returns',
      subtitle: 'Instant replacement or refund',
      color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40'
    },
    {
      icon: Headphones,
      title: '24/7 Tech Concierge',
      subtitle: 'Dedicated product specialists',
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40'
    }
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${perk.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {perk.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

