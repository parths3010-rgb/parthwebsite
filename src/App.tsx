import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GwpBanner } from './components/GwpBanner';
import { HeroEverydayEdit } from './components/HeroEverydayEdit';
import { BestSellersGrid } from './components/BestSellersGrid';
import { EverydaySetupCrossSell } from './components/EverydaySetupCrossSell';
import { ApparelShowcase } from './components/ApparelShowcase';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { Ga4AuditNotesModal } from './components/Ga4AuditNotesModal';
import { Footer } from './components/Footer';
import { PRODUCTS, EVERYDAY_BUNDLE } from './data/products';
import { Product, CartItem } from './types';
import { CheckCircle2, Gift } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAuditBadges, setShowAuditBadges] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ text: string; isGift?: boolean } | null>(null);

  // Products lookup
  const surfsideTee = PRODUCTS.find((p) => p.id === 'google-surfside-tee')!;
  const recycledHoodie = PRODUCTS.find((p) => p.id === 'google-recycled-black-hoodie')!;
  const gravityBottle = PRODUCTS.find((p) => p.id === 'google-gravity-super-g-bottle')!;
  const stickerPack = PRODUCTS.find((p) => p.id === 'google-play-sticker-pack')!;

  // 4 Curated Best Sellers
  const bestSellers = [
    recycledHoodie,
    PRODUCTS.find((p) => p.id === 'nano-banana-sweatshirt')!,
    surfsideTee,
    gravityBottle,
  ];

  const showToast = (text: string, isGift = false) => {
    setToastMessage({ text, isGift });
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Automatically manage the Free Gift With Purchase (GWP)
  useEffect(() => {
    const hasApparel = cartItems.some(
      (item) => item.product.category === 'apparel' && item.quantity > 0 && !item.isGiftWithPurchase
    );
    const hasStickerPack = cartItems.some((item) => item.isGiftWithPurchase);

    if (hasApparel && !hasStickerPack) {
      // Automatically add free sticker pack
      setCartItems((prev) => [
        ...prev,
        {
          product: stickerPack,
          quantity: 1,
          isGiftWithPurchase: true,
        },
      ]);
      showToast('🎉 Free Google Play Sticker Pack added with your apparel!', true);
    } else if (!hasApparel && hasStickerPack) {
      // Remove free sticker pack if no apparel in cart
      setCartItems((prev) => prev.filter((item) => !item.isGiftWithPurchase));
    }
  }, [cartItems, stickerPack]);

  const handleAddToCart = (product: Product, size?: string, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && !item.isGiftWithPurchase
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize: size || (product.sizes ? product.sizes[0] : undefined),
            isGiftWithPurchase: false,
          },
        ];
      }
    });

    showToast(`Added ${product.name} to cart`);
  };

  const handleAddBundle = (teeSize: string) => {
    // Add Surfside Tee
    handleAddToCart(surfsideTee, teeSize, 1);
    // Add Gravity Bottle
    handleAddToCart(gravityBottle, '24 oz', 1);
    showToast('✨ Everyday Google Setup added with 10% Bundle Discount!');
  };

  const handleUpdateQuantity = (productId: string, delta: number, size?: string) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size && !item.isGiftWithPurchase) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string, size?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToApparel = () => {
    setActiveCategory('apparel');
    const el = document.getElementById('apparel');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEdit = () => {
    setActiveCategory('edit');
    const el = document.getElementById('edit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered products for search
  const searchFilteredProducts = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* 1. Header & Navigation */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
        showAuditBadges={showAuditBadges}
        onToggleAuditBadges={() => setShowAuditBadges(!showAuditBadges)}
      />

      {/* 4. Promotional Gift-With-Purchase (GWP) Banner */}
      <GwpBanner
        cartItems={cartItems}
        onExploreApparel={scrollToApparel}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Search Filter Results View (if search active) */}
      {searchFilteredProducts ? (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
            <h2 className="text-xl font-bold">
              Search Results for "{searchQuery}" ({searchFilteredProducts.length})
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono text-neutral-500 hover:text-neutral-900 underline"
            >
              Clear Search
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchFilteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-neutral-200 p-4 flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase">
                    {product.subCategory}
                  </span>
                  <h3 className="font-semibold text-neutral-900 text-sm">{product.name}</h3>
                  <div className="mt-1 font-mono font-bold text-neutral-900">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 py-2 bg-neutral-900 text-white rounded-xl text-xs font-medium hover:bg-neutral-800"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="px-3 py-2 border border-neutral-300 rounded-xl text-xs hover:bg-neutral-50"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <main className="flex-1">
          {/* 2. Hero Banner ("The Everyday Edit") */}
          <HeroEverydayEdit
            surfsideTee={surfsideTee}
            recycledHoodie={recycledHoodie}
            onAddToCart={handleAddToCart}
            onOpenProduct={setSelectedProduct}
            onShopTheEdit={scrollToEdit}
            showAuditBadges={showAuditBadges}
          />

          {/* 3. Curated "Best Sellers" Grid */}
          <BestSellersGrid
            products={bestSellers}
            onAddToCart={handleAddToCart}
            onOpenProduct={setSelectedProduct}
            showAuditBadges={showAuditBadges}
          />

          {/* 6. Cross-Sell Bundle Module ("Complete Your Everyday Google Setup") */}
          <EverydaySetupCrossSell
            bundle={EVERYDAY_BUNDLE}
            surfsideTee={surfsideTee}
            gravityBottle={gravityBottle}
            freeStickers={stickerPack}
            onAddBundle={handleAddBundle}
            showAuditBadges={showAuditBadges}
          />

          {/* 5. High-Converting Apparel Showcase Section */}
          <ApparelShowcase
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onOpenProduct={setSelectedProduct}
            showAuditBadges={showAuditBadges}
          />
        </main>
      )}

      {/* Footer */}
      <Footer onOpenAudit={() => setIsAuditModalOpen(true)} />

      {/* 7. Sticky Mobile Checkout / Add to Cart Bottom Bar */}
      <StickyMobileBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onQuickAddFeatured={() => handleAddToCart(surfsideTee, 'L')}
      />

      {/* 8. Interactive Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
        onSelectProduct={setSelectedProduct}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        allProducts={PRODUCTS}
        onOpenProduct={setSelectedProduct}
        showAuditBadges={showAuditBadges}
      />

      {/* Checkout Simulation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

      {/* GA4 Audit Notes Documentation Modal */}
      <Ga4AuditNotesModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-in slide-in-from-top-3 fade-in duration-200 pointer-events-none">
          <div className="bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-neutral-700/80 flex items-center gap-2.5 text-xs font-medium">
            {toastMessage.isGift ? (
              <Gift className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
