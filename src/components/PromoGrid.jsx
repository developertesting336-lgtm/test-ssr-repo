import React from 'react';
import { ArrowRight, Sparkles, Smartphone, Laptop, Watch, Zap } from 'lucide-react';

export default function PromoGrid({ gridItems = [], onAction }) {
  const activeItems = gridItems.filter(i => i.isActive !== false);

  if (!activeItems.length) return null;

  // Find cards by type or order
  const largeCard = activeItems.find(i => i.type === 'large') || activeItems[0];
  const wideCard = activeItems.find(i => i.type === 'wide') || activeItems[1];
  const smallCards = activeItems.filter(i => i.type === 'small');
  const gradientCard = smallCards.find(i => i.gradient || !i.image) || smallCards[0];
  const darkSmallCard = smallCards.find(i => i !== gradientCard) || smallCards[1];

  const formatTitle = (item) => {
    if (item.titleLines && item.titleLines.length > 0) {
      return item.titleLines.map((line, i) => (
        <span key={i} className="block">
          {line.trim()}
        </span>
      ));
    }
    return item.title.replace(/\s+/g, ' ');
  };

  return (
    <section id="bento-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/50">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Limited Drops & Trade-Ins
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Exclusive Promotion Grid
        </h2>
        <p className="text-slate-500 text-sm sm:text-base">
          Unlock instant savings, limited hardware bundles, and trade-in upgrade credits across our flagship ecosystem.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 1. Large Card (Left Column - 5 cols) */}
        {largeCard && (
          <div className="lg:col-span-5 rounded-3xl bg-slate-900 overflow-hidden relative group min-h-[480px] lg:min-h-[580px] flex flex-col justify-between border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Image */}
            {largeCard.image && (
              <div className="absolute inset-0 z-0">
                <img
                  src={largeCard.image}
                  alt={largeCard.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
              </div>
            )}

            {/* Badge */}
            <div className="relative z-10 p-6 sm:p-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/30">
                <Smartphone className="w-3.5 h-3.5" />
                {largeCard.label || 'SPECIAL DEAL'}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 space-y-4">
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {formatTitle(largeCard)}
              </h3>
              
              <div>
                <button
                  onClick={() => onAction(largeCard.buttonText || 'Shop Now', largeCard)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 shadow-lg group-hover:translate-x-1 cursor-pointer"
                >
                  <span>{largeCard.buttonText || 'Shop Now'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-600" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right 7-Column Bento Stack */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* 2. Wide Card (Top - 7 cols) */}
          {wideCard && (
            <div className="rounded-3xl bg-slate-950 overflow-hidden relative group min-h-[260px] sm:min-h-[280px] flex flex-col justify-end border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300">
              {wideCard.image && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={wideCard.image}
                    alt={wideCard.title}
                    className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
              )}

              <div className="relative z-10 p-6 sm:p-8 max-w-lg space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                  <Laptop className="w-3.5 h-3.5" />
                  {wideCard.label || 'TRADE-IN BONUS'}
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {formatTitle(wideCard)}
                </h3>

                <div className="pt-1">
                  <button
                    onClick={() => onAction(wideCard.buttonText || 'Trade-In', wideCard)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <span>{wideCard.buttonText || 'Trade-In'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3 & 4. Bottom Row of 2 Small Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            
            {/* Gradient Card */}
            {gradientCard && (
              <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 sm:p-7 text-white flex flex-col justify-between shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                    <Zap className="w-3 h-3 fill-white" />
                    Best Price Guarantee
                  </span>
                </div>

                <div className="relative z-10 space-y-4 my-4">
                  <h4 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {formatTitle(gradientCard)}
                  </h4>

                  <button
                    onClick={() => onAction(gradientCard.buttonText || 'Shop Now', gradientCard)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <span>{gradientCard.buttonText || 'Shop Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Smartwatch Dark Card */}
            {darkSmallCard && (
              <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden relative group min-h-[240px] flex flex-col justify-between p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300">
                {darkSmallCard.image && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={darkSmallCard.image}
                      alt={darkSmallCard.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
                  </div>
                )}

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                    <Watch className="w-3 h-3" />
                    {darkSmallCard.label || 'SMARTWATCH'}
                  </span>
                </div>

                <div className="relative z-10 space-y-3">
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    {darkSmallCard.title || 'Activewear'}
                  </h4>

                  <button
                    onClick={() => onAction(darkSmallCard.buttonText || 'Explore', darkSmallCard)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md font-bold text-xs transition-all cursor-pointer border border-white/30"
                  >
                    <span>{darkSmallCard.buttonText || 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

