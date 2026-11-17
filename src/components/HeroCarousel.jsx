import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  Flame,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function HeroCarousel({ heroes = [], onSelectHero, onAction }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const activeHeroes = heroes.filter(h => h.isActive !== false);
  const count = activeHeroes.length || 1;

  useEffect(() => {
    if (isPaused || count <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, 6000);

    return () => clearInterval(timerRef.current);
  }, [isPaused, count, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % count);
  };

  if (!activeHeroes.length) return null;

  const current = activeHeroes[currentIndex] || activeHeroes[0];

  return (
    <section 
      id="hero" 
      className="relative w-full bg-slate-950 text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with smooth cross-fade */}
      <div className="absolute inset-0 z-0">
        {activeHeroes.map((item, idx) => (
          <div
            key={item._id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transition: 'opacity 1s ease-in-out, transform 8s ease-out' }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          </div>
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36 min-h-[580px] lg:min-h-[660px] flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>{current.badge || "Featured Collection"}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            {current.title}{' '}
            {current.highlight && (
              <span className="block mt-1 bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
                {current.highlight}
              </span>
            )}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
            {current.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onAction(current.primaryButtonText || 'Shop Now', current)}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:translate-y-[-1px] transition-all duration-200 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>{current.primaryButtonText || 'Shop Now'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {current.secondaryButtonText && (
              <button
                onClick={() => onAction(current.secondaryButtonText, current)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition-all duration-200 cursor-pointer"
              >
                <span>{current.secondaryButtonText}</span>
              </button>
            )}
          </div>

          {/* Micro trust indicators */}
          <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 font-medium border-t border-white/10 max-w-lg">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Authentic Guaranteed
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              2-Year Warranty
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Fast Delivery
            </span>
          </div>

        </div>

        {/* Thumbnail Selector Cards on Desktop */}
        <div className="hidden lg:flex absolute bottom-12 right-8 items-center gap-3 z-20">
          {activeHeroes.map((item, idx) => (
            <button
              key={item._id || idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex items-center gap-3 p-2.5 rounded-2xl backdrop-blur-xl border text-left transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'bg-white/20 border-indigo-400/80 shadow-lg shadow-indigo-500/20 w-60'
                  : 'bg-slate-900/60 border-white/10 hover:bg-white/10 w-44 opacity-75'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
              />
              <div className="overflow-hidden">
                <span className="text-[10px] text-indigo-300 font-semibold block uppercase truncate">
                  {item.badge}
                </span>
                <span className="text-xs font-bold text-white block truncate">
                  {item.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-slate-950/50 hover:bg-slate-900 text-white backdrop-blur-md border border-white/15 shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-slate-950/50 hover:bg-slate-900 text-white backdrop-blur-md border border-white/15 shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Progress Bar & Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {activeHeroes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-indigo-500'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

