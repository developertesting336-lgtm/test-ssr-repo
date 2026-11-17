import React, { useState, useRef } from 'react';
import { 
  Shirt, 
  Gamepad2, 
  Sofa, 
  Sparkles, 
  Dumbbell, 
  ShoppingBag, 
  ArrowRight, 
  Play, 
  Pause,
  Compass,
  Check
} from 'lucide-react';

const iconMap = {
  Shirt,
  Gamepad2,
  Sofa,
  Sparkles,
  Dumbbell,
  ShoppingBag
};

function VideoCard({ item, onAction }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  const IconComponent = iconMap[item.icon] || Compass;

  const handleMouseEnter = () => {
    if (videoRef.current && !hasError) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !hasError) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current || hasError) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[440px]"
    >
      {/* Visual Background: Video + Fallback Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Fallback Image */}
        <img
          src={item.fallbackImage}
          alt={item.title}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Video Element */}
        {!hasError && item.video && (
          <video
            ref={videoRef}
            src={item.video}
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setHasError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
              isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}

        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
      </div>

      {/* Top Header Inside Card */}
      <div className="relative z-10 p-6 flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-600 transition-colors duration-300">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 block">
              {item.eyebrow || 'COLLECTION'}
            </span>
            <span className="text-xs font-medium text-slate-300">
              Query: #{item.query}
            </span>
          </div>
        </div>

        {/* Video Play Status Indicator Button */}
        {item.video && !hasError && (
          <button
            onClick={togglePlay}
            className="p-2 rounded-xl bg-slate-950/60 hover:bg-slate-900 backdrop-blur-md text-white/80 hover:text-white border border-white/15 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            title={isPlaying ? "Pause Video" : "Hover or Click to Play Video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white/80" />}
            <span className="text-[10px] hidden sm:inline font-mono">
              {isPlaying ? 'PLAYING' : 'VIDEO'}
            </span>
          </button>
        )}
      </div>

      {/* Bottom Content Inside Card */}
      <div className="relative z-10 p-6 sm:p-7 space-y-3">
        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
          {item.title}
        </h3>
        
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>

        <div className="pt-2">
          <button
            onClick={() => onAction(`Explore ${item.title}`, item)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/15 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md font-semibold text-xs tracking-wide transition-all duration-200 border border-white/20 hover:border-white cursor-pointer shadow-md"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopByNeed({ items = [], onAction }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const activeItems = items.filter(i => i.isActive !== false);

  if (!activeItems.length) return null;

  const filters = [
    { id: 'all', label: 'All Collections' },
    { id: 'fashion', label: 'Fashion & Style' },
    { id: 'gaming', label: 'Gaming Setup' },
    { id: 'home', label: 'Home & Living' },
    { id: 'beauty', label: 'Beauty & Care' },
    { id: 'sports', label: 'Sports & Fitness' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const filteredItems = selectedFilter === 'all' 
    ? activeItems 
    : activeItems.filter(item => item.query === selectedFilter || item.title.toLowerCase().includes(selectedFilter));

  return (
    <section id="shop-by-need" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/60">
      
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Curated Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Shop by Lifestyle & Need
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl">
            Hover over any category to experience interactive lifestyle previews and discover handpicked essentials designed for your routine.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item, idx) => (
          <VideoCard 
            key={item._id || idx} 
            item={item} 
            onAction={onAction} 
          />
        ))}
      </div>

    </section>
  );
}

