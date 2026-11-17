import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Check, 
  ShieldCheck, 
  Truck, 
  Star, 
  Share2, 
  Sparkles 
} from 'lucide-react';

export default function QuickViewModal({ 
  item, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onShowToast 
}) {
  const [selectedVariant, setSelectedVariant] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !item) return null;

  // Determine pricing and details based on item properties
  const title = item.title || item.name || 'Featured Hardware';
  const highlight = item.highlight || '';
  const description = item.description || 'Premium design with certified durability, guaranteed authentic and backed by full factory warranty.';
  const image = item.image || item.fallbackImage || 'https://res.cloudinary.com/gsc8tqvl/image/upload/v1794543375/wallpaperflare.com_wallpaper.jpg';
  const badge = item.badge || item.eyebrow || item.label || 'SPECIAL DEAL';
  
  // Assign realistic mock pricing based on content
  const price = item.price || (title.toLowerCase().includes('iphone') ? 999 : title.toLowerCase().includes('pixel') ? 799 : title.toLowerCase().includes('watch') ? 299 : title.toLowerCase().includes('gaming') ? 499 : 149);

  const handleAdd = () => {
    onAddToCart({
      id: item._id || Math.random().toString(),
      title: `${title} ${highlight}`.trim(),
      price: price,
      quantity: quantity,
      variant: selectedVariant,
      image: image
    });
    onShowToast?.(`Added "${title}" to your shopping bag!`);
    onClose();
  };

  const toggleWishlist = () => {
    setIsSaved(!isSaved);
    onShowToast?.(isSaved ? 'Removed from wishlist' : 'Saved to your wishlist!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Media View */}
        <div className="relative bg-slate-950 min-h-[340px] md:min-h-full flex items-center justify-center p-8 overflow-hidden group">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-2xl max-h-[460px] shadow-lg group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              {badge}
            </span>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          {/* Close button */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-slate-500 font-semibold ml-1.5">(4.9/5 • 120+ reviews)</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {title} {highlight && <span className="text-indigo-600">{highlight}</span>}
              </h3>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900">
              ${price}
            </span>
            <span className="text-sm line-through text-slate-400 font-medium">
              ${Math.round(price * 1.25)}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
              Save 20%
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {description}
          </p>

          {/* Variants */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select Configuration:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              {['Standard', 'Pro Bundle', 'Elite Edition'].map((variant) => (
                <button
                  key={variant}
                  onClick={() => setSelectedVariant(variant)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedVariant === variant
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold text-sm"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • ${(price * quantity).toFixed(2)}</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isSaved 
                    ? 'border-rose-200 bg-rose-50 text-rose-500' 
                    : 'border-slate-200 text-slate-400 hover:text-slate-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Guarantee badges */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-indigo-600" />
                Dispatches within 24h
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                2-Year Factory Warranty
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

