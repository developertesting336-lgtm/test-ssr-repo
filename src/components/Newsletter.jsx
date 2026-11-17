import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Newsletter({ onShowToast }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast?.('Please enter a valid email address.');
      return;
    }
    setIsSubscribed(true);
    onShowToast?.('🎉 Welcome to NEXUS VIP! Check your inbox for your 15% discount code.');
  };

  return (
    <section id="newsletter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
        
        {/* Glow ambient circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            NEXUS INSIDER CLUB
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Unlock 15% Off Your Next Upgrade
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Be the first to access limited hardware drops, private flash sales, and early-bird trade-in multipliers directly in your inbox.
          </p>

          {isSubscribed ? (
            <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-white flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div className="text-left">
                <h4 className="font-bold text-sm">You are on the VIP Guest List!</h4>
                <p className="text-xs text-emerald-200">Use coupon code <span className="font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded">NEXUS15</span> at checkout.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
              <div className="relative w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                <span>Join VIP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2">
            <span>✓ No spam guarantee</span>
            <span>✓ One-click unsubscribe</span>
            <span>✓ 15% instant voucher</span>
          </div>

        </div>
      </div>
    </section>
  );
}

