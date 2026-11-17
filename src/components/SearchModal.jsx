import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, Tag, Smartphone, Laptop, Shirt, Gamepad2, Sofa, Dumbbell, ShoppingBag } from 'lucide-react';

export default function SearchModal({ 
  isOpen, 
  onClose, 
  data = {}, 
  onSelectItem 
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose?.(); // Toggle handled in parent or here
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Flatten searchable items from all sections
  const allItems = [
    ...(data.hero || []).map(item => ({
      type: 'Hero Spotlight',
      title: `${item.title} ${item.highlight || ''}`,
      description: item.description,
      image: item.image,
      tag: item.badge,
      original: item
    })),
    ...(data.promoCards || []).map(item => ({
      type: 'Curated Deal',
      title: item.title,
      description: item.description,
      image: item.image,
      tag: item.eyebrow,
      original: item
    })),
    ...(data.promoGrid || []).map(item => ({
      type: 'Hardware Deal',
      title: item.title,
      description: item.label,
      image: item.image,
      tag: item.label,
      original: item
    })),
    ...(data.shopByNeed || []).map(item => ({
      type: 'Category',
      title: item.title,
      description: item.description,
      image: item.fallbackImage,
      tag: item.eyebrow,
      original: item
    }))
  ];

  const results = query.trim() === ''
    ? allItems.slice(0, 6)
    : allItems.filter(item => 
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.tag?.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10">
        
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-100 flex items-center px-6 py-4">
          <Search className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Apple, Pixel, Gaming, Fashion, Smartwatches..."
            className="w-full text-slate-800 placeholder-slate-400 text-base focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
            Quick:
          </span>
          {['iPhone', 'Pixel', 'MacBook', 'Gaming', 'Fashion', 'Smartwatch'].map((keyword) => (
            <button
              key={keyword}
              onClick={() => setQuery(keyword)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-600 transition-colors cursor-pointer text-xs font-medium"
            >
              {keyword}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <p className="font-semibold text-sm">No items found for "{query}"</p>
              <p className="text-xs text-slate-400">Try searching for generic terms like "Apple", "Watch", or "Style"</p>
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectItem(item.original);
                  onClose();
                }}
                className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 transition-all duration-200 cursor-pointer"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 group-hover:bg-indigo-100 text-indigo-700">
                      {item.tag || item.type}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.type}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm truncate mt-0.5 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    {item.description}
                  </p>
                </div>

                <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
          <span>Search powered by Live Homepage API</span>
          <span>Press <strong>ESC</strong> to dismiss</span>
        </div>

      </div>
    </div>
  );
}

