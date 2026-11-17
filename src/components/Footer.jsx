import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Heart, 
  ArrowUp, 
  Globe,
  CheckCircle2
} from 'lucide-react';

export default function Footer({ isLive, fetchedAt }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Zap className="w-5 h-5 fill-white text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                NEXUS STORE
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier destination for next-generation hardware, curated style collections, and certified trade-in solutions. Built for performance, designed for life.
            </p>

            {/* Live API Health Card */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 max-w-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">Live API Data Feed:</span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isLive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {isLive ? '200 OK (Live)' : 'Local Fallback'}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Endpoint: /api/homepage
              </div>
              {fetchedAt && (
                <div className="text-[10px] text-slate-500">
                  Last Synced: {fetchedAt}
                </div>
              )}
            </div>
          </div>

          {/* Column 1: Hardware & Deals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hardware
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#promo-deals" className="hover:text-white transition-colors">Apple Specials</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Google Pixel</a></li>
              <li><a href="#bento-grid" className="hover:text-white transition-colors">Smartwatches</a></li>
              <li><a href="#shop-by-need" className="hover:text-white transition-colors">Gaming Rigs</a></li>
              <li><a href="#bento-grid" className="hover:text-white transition-colors">Trade-In Estimator</a></li>
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#shop-by-need" className="hover:text-white transition-colors">Fashion & Style</a></li>
              <li><a href="#shop-by-need" className="hover:text-white transition-colors">Home & Living</a></li>
              <li><a href="#shop-by-need" className="hover:text-white transition-colors">Beauty & Care</a></li>
              <li><a href="#shop-by-need" className="hover:text-white transition-colors">Sports & Fitness</a></li>
              <li><a href="#shop-by-need" className="hover:text-white transition-colors">Bags & Accessories</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Assistance
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty & Repairs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} NEXUS Inc. All rights reserved. Built with precision.</span>
          </div>

          {/* Payment Badges & Back to top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Apple Pay</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Google Pay</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Visa</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Mastercard</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800 flex items-center gap-1.5 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
