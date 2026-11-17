import React, { useState, useEffect, useCallback } from 'react';
import { fetchHomepageData } from './services/api';
import { fallbackHomepageData } from './data/fallbackData';

import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import TrustBar from './components/TrustBar';
import PromoCards from './components/PromoCards';
import ShopByNeed from './components/ShopByNeed';
import PromoGrid from './components/PromoGrid';
import Newsletter from './components/Newsletter';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import Footer from './components/Footer';
import Toast from './components/Toast';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

export default function App({ url = '/', initialData = null }) {
  // Determine route: from prop (SSR) or browser location
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || url;
    }
    return url;
  });

  const [data, setData] = useState(initialData || fallbackHomepageData.data);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isLive, setIsLive] = useState(!!initialData);
  const [fetchedAt, setFetchedAt] = useState('');
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(null);

  // Cart & UI State
  const [cartItems, setCartItems] = useState([
    {
      id: 'demo-iphone-1',
      title: 'iPhone Deals - Limited Time',
      price: 899,
      quantity: 1,
      variant: '128GB Midnight',
      image: 'https://res.cloudinary.com/gsc8tqvl/image/upload/v1794543372/Untitled_design_5.png.jpg'
    }
  ]);
  const [wishlistCount, setWishlistCount] = useState(2);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  // Client routing listener for popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentRoute(path);
  };

  const loadData = useCallback(async (isManual = false) => {
    setIsLoading(true);
    try {
      const result = await fetchHomepageData();
      setData(result.data);
      setIsLive(result.isLive);
      setFetchedAt(result.fetchedAt);
      if (isManual) {
        showToast(result.isLive ? '✅ Successfully synced live data from API!' : '⚠️ Using fallback offline cache');
      }
    } catch (e) {
      console.error(e);
      showToast('⚠️ Failed to refresh API, fallback data in use');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    // If not supplied via SSR initialData, fetch on client
    if (!initialData) {
      loadData(false);
    }
  }, [initialData, loadData]);

  // Cart actions
  const handleAddToCart = (newItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === newItem.id && item.variant === newItem.variant);
      if (existing) {
        return prev.map(item => 
          item.id === newItem.id && item.variant === newItem.variant
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from shopping bag');
  };

  const handleCheckout = (total) => {
    showToast(`🎉 Order placed successfully! Total: $${total.toFixed(2)}. Confirmation sent.`);
    setCartItems([]);
    setCartOpen(false);
  };

  const handleActionClick = (actionName, item) => {
    setQuickViewItem(item);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Render Routes
  if (currentRoute === '/login') {
    return (
      <LoginPage
        onNavigate={navigateTo}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome back, ${user.name}!`);
        }}
      />
    );
  }

  if (currentRoute === '/signup') {
    return (
      <SignupPage
        onNavigate={navigateTo}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Account created! Welcome, ${user.name}!`);
        }}
      />
    );
  }

  // Default: Homepage
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        isLive={isLive}
        onRefreshData={() => loadData(true)}
        isLoading={isLoading}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Signed out successfully.');
        }}
        onNavigate={navigateTo}
      />

      <main className="flex-1">
        {/* 1. Hero Carousel */}
        <HeroCarousel
          heroes={data?.hero || []}
          onSelectHero={(hero) => setQuickViewItem(hero)}
          onAction={handleActionClick}
        />

        {/* 2. Trust Propositions Bar */}
        <TrustBar />

        {/* 3. Promo Cards (Apple Deals & Trade-In) */}
        <PromoCards
          cards={data?.promoCards || []}
          onAction={handleActionClick}
        />

        {/* 4. Shop By Need (Video Interactive Cards) */}
        <ShopByNeed
          items={data?.shopByNeed || []}
          onAction={handleActionClick}
        />

        {/* 5. Bento Grid Promotions */}
        <PromoGrid
          gridItems={data?.promoGrid || []}
          onAction={handleActionClick}
        />

        {/* 6. VIP Club & Newsletter */}
        <Newsletter
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer
        isLive={isLive}
        fetchedAt={fetchedAt}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Global Live Search Overlay (Cmd+K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={data}
        onSelectItem={(item) => setQuickViewItem(item)}
      />

      {/* Interactive Quick View / Purchase Modal */}
      <QuickViewModal
        item={quickViewItem}
        isOpen={!!quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onAddToCart={handleAddToCart}
        onShowToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
