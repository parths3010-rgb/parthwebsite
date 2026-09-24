import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, BarChart2, Sparkles, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenAuditModal: () => void;
  showAuditBadges: boolean;
  onToggleAuditBadges: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  onOpenAuditModal,
  showAuditBadges,
  onToggleAuditBadges,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'The Everyday Edit', category: 'edit' },
    { label: 'Best Sellers', category: 'bestsellers' },
    { label: 'Apparel', category: 'apparel' },
    { label: 'Accessories', category: 'accessories' },
    { label: 'Shop All', category: 'all' },
  ];

  const handleNavClick = (cat: string) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(cat);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
        {/* Top Minimal Utility Bar */}
        <div className="bg-neutral-900 text-neutral-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-neutral-200">Official Google Merchandise Store</span>
            <span className="hidden sm:inline text-neutral-500">·</span>
            <span className="hidden sm:inline text-neutral-400">GA4 Optimization Prototype</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleAuditBadges}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] transition-colors ${
                showAuditBadges
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-neutral-400 hover:text-white bg-neutral-800'
              }`}
              title="Toggle GA4 Analytics Overlays on SKUs"
            >
              <BarChart2 className="w-3 h-3" />
              <span>{showAuditBadges ? 'GA4 Data: ON' : 'GA4 Data: OFF'}</span>
            </button>

            <button
              onClick={onOpenAuditModal}
              className="text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Read GA4 Audit Rationale
            </button>
          </div>
        </div>

        {/* Main Header Container (Strict 3-zone contract) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5"
            >
              {/* Google 4-Color Accents */}
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] transition-transform group-hover:scale-110"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] transition-transform group-hover:scale-110"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] transition-transform group-hover:scale-110"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] transition-transform group-hover:scale-110"></span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-lg tracking-tight text-neutral-900 leading-none">
                  Google <span className="font-light text-neutral-600">Merchandise Store</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-mono">
                  Everyday Collection
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.category;
              return (
                <button
                  key={link.category}
                  onClick={() => handleNavClick(link.category)}
                  className={`relative py-1 transition-colors whitespace-nowrap text-[13.5px] ${
                    isActive
                      ? 'text-neutral-900 font-semibold'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Audit Rationale, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Bar */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-neutral-100 rounded-full px-3 py-1.5 border border-neutral-300 w-44 sm:w-60 transition-all">
                  <Search className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search Hoodie, Tee, Bottle..."
                    className="bg-transparent text-xs w-full text-neutral-900 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      onSearchChange('');
                      setIsSearchOpen(false);
                    }}
                    className="text-neutral-400 hover:text-neutral-700 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
                  aria-label="Open search bar"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Cart Action */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:px-3 sm:py-2 flex items-center gap-2 text-neutral-800 bg-neutral-100 hover:bg-neutral-200/90 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-neutral-900"
              aria-label="View shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-neutral-900" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#4285F4] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm animate-in zoom-in">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-neutral-900">
                Cart {totalItemsCount > 0 ? `(${totalItemsCount})` : ''}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></span>
                <span className="font-semibold text-neutral-900">Google Store</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4 flex-1">
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">Navigation</p>
              {navLinks.map((link) => (
                <button
                  key={link.category}
                  onClick={() => handleNavClick(link.category)}
                  className="w-full flex items-center justify-between py-2 text-left text-base font-medium text-neutral-800 hover:text-neutral-950 border-b border-neutral-100"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              ))}

              <div className="pt-4 space-y-3">
                <button
                  onClick={() => {
                    onToggleAuditBadges();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium bg-neutral-100 text-neutral-800 rounded-lg hover:bg-neutral-200"
                >
                  <BarChart2 className="w-4 h-4 text-blue-600" />
                  <span>{showAuditBadges ? 'Hide GA4 Insights' : 'Show GA4 Insights'}</span>
                </button>

                <button
                  onClick={() => {
                    onOpenAuditModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>View GA4 Audit Documentation</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-500">
              <p>Free domestic delivery on orders $50+</p>
              <p className="mt-1 font-mono text-[11px]">GA4 Optimization Prototype</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
