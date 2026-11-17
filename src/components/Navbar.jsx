import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Sparkles, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  User,
  LogOut
} from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenSearch, 
  isLive, 
  onRefreshData, 
  isLoading,
  currentUser,
  onLogout,
  onNavigate
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentTicker, setCurrentTicker] = useState(0);

  const announcements = [
    "🔥 EXCLUSIVE: Discover Latest Pixel & iPhone Offers Today",
    "🚚 FREE Express Shipping on all orders over $75",
    "🛡️ Official Brand Warranty & 30-Day Risk-Free Returns",
    "⚡ Trade-In Guarantee: Get instant credit on your old tech"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTicker((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const handleNavClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner Ticker */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-medium text-[11px] border border-indigo-500/30">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              SPOTLIGHT
            </span>
            <span className="font-medium text-slate-200 transition-opacity duration-300">
              {announcements[currentTicker]}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400">
            <button 
              onClick={onRefreshData}
              disabled={isLoading}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              title="Click to re-fetch live API"
            >
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>{isLoading ? 'Syncing...' : isLive ? 'Live API Active' : 'Fallback Mode'}</span>
              <RotateCcw className={`w-2.5 h-2.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <span className="text-slate-600">|</span>
            <a href="#tradein" className="hover:text-white transition-colors">Trade-In</a>
            <span className="text-slate-600">|</span>
            <a href="#help" className="hover:text-white transition-colors">Help & FAQ</a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/80' 
          : 'bg-white border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-8">
              <a 
                href="/" 
                onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
                className="flex items-center gap-2.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                  <Zap className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                      NEXUS
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      STORE
                    </span>
                  </div>
                  <p className="text-[10px] tracking-wider text-slate-400 font-medium -mt-0.5">
                    CURATED TECH & STYLE
                  </p>
                </div>
              </a>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
                <a 
                  href="#hero" 
                  className="px-3.5 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                >
                  Featured
                </a>
                <a 
                  href="#shop-by-need" 
                  className="px-3.5 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                >
                  Categories
                </a>
                <a 
                  href="#promo-deals" 
                  className="px-3.5 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                >
                  Special Offers
                </a>
                <a 
                  href="#bento-grid" 
                  className="px-3.5 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                >
                  Deals Grid
                </a>
                <a 
                  href="#newsletter" 
                  className="px-3.5 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                >
                  VIP Perks
                </a>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button / Trigger */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all text-xs font-medium cursor-pointer border border-transparent hover:border-slate-300"
                title="Search homepage products & categories"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Search tech, fashion...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white rounded border border-slate-300 text-slate-500 shadow-2xs font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => alert("Wishlist: You have " + wishlistCount + " saved items.")}
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Saved Items"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold">Bag</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[11px] font-bold">
                  {cartCount}
                </span>
              </button>

              {/* User Authentication Nav / Avatar */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-lg object-cover border border-indigo-200"
                    />
                    <span className="hidden md:inline text-xs font-bold text-slate-700">
                      {currentUser.name}
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          onLogout?.();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleNavClick('/login')}
                    className="px-3 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavClick('/signup')}
                    className="hidden sm:inline-flex px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-2 shadow-lg">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Featured Highlights
            </a>
            <a 
              href="#shop-by-need" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Shop By Need
            </a>
            <a 
              href="#promo-deals" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Apple & Trade-In Deals
            </a>
            <a 
              href="#bento-grid" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Promo Grid
            </a>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              {!currentUser ? (
                <>
                  <button
                    onClick={() => { handleNavClick('/login'); setMobileMenuOpen(false); }}
                    className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { handleNavClick('/signup'); setMobileMenuOpen(false); }}
                    className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold text-center"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { onLogout?.(); setMobileMenuOpen(false); }}
                  className="w-full py-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold"
                >
                  Sign Out ({currentUser.name})
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
