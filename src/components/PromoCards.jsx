import React from 'react';
import { ArrowRight, Sparkles, Tag, RefreshCw } from 'lucide-react';

export default function PromoCards({ cards = [], onAction }) {
  const activeCards = cards.filter(c => c.isActive !== false);

  if (!activeCards.length) return null;

  return (
    <section id="promo-deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Featured Spotlight</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Curated Tech Specials
          </h2>
        </div>
        <p className="text-slate-500 text-sm max-w-md">
          Explore manufacturer-certified Apple hardware and exchange your previous devices for guaranteed top dollar trade-in value.
        </p>
      </div>

      {/* Grid of 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activeCards.map((card, idx) => {
          const isApple = card.eyebrow?.toLowerCase().includes('apple');

          return (
            <div
              key={card._id || idx}
              className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 min-h-[420px] flex flex-col justify-end bg-slate-900 border border-slate-800"
            >
              {/* Background Image with Zoom on Hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
                <div className="absolute inset-0 bg-indigo-950/20 mix-blend-multiply" />
              </div>

              {/* Top Eyebrow Tag */}
              <div className="absolute top-6 left-6 z-10">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md border ${
                  isApple 
                    ? 'bg-white/90 text-slate-900 border-white/50' 
                    : 'bg-emerald-500/90 text-white border-emerald-400/50'
                }`}>
                  {isApple ? <Tag className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
                  {card.eyebrow || 'SPECIAL OFFER'}
                </span>
              </div>

              {/* Content Block */}
              <div className="relative z-10 p-6 sm:p-8 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  {card.title}
                </h3>
                
                <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                  {card.description?.replace(/\s0\.$/, '.')}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onAction(card.buttonText || 'Explore', card)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 shadow-md group-hover:translate-x-1 cursor-pointer"
                  >
                    <span>{card.buttonText || 'Shop Now'}</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

