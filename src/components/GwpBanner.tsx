import React from 'react';
import { Gift, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface GwpBannerProps {
  cartItems: CartItem[];
  onExploreApparel: () => void;
  onOpenCart: () => void;
}

export const GwpBanner: React.FC<GwpBannerProps> = ({
  cartItems,
  onExploreApparel,
  onOpenCart,
}) => {
  // Check if any apparel is in cart
  const hasApparelInCart = cartItems.some(
    (item) => item.product.category === 'apparel' && item.quantity > 0
  );

  return (
    <section className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white border-b border-neutral-800 relative overflow-hidden">
      {/* Subtle Google accent glow */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#4285F4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[#34A853]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left: Sticker icon & Main GWP Pitch */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 p-2 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
              <Gift className="w-5 h-5 text-amber-400 animate-bounce" />
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                  GA4 Promotion Anchor
                </span>
                <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-white">
                  FREE GOOGLE PLAY COLLECTIBLE STICKER PACK WITH ANY APPAREL PURCHASE
                </p>
              </div>
              <p className="text-xs text-neutral-300 mt-0.5 hidden sm:block">
                Add any hoodie, tee, or crewneck to automatically apply your complimentary 6-piece holographic pack ($8.00 retail value).
              </p>
            </div>
          </div>

          {/* Right: Real-time dynamic qualification badge & action */}
          <div className="flex items-center gap-3 shrink-0">
            {hasApparelInCart ? (
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Unlocked in Cart · View Gift</span>
              </button>
            ) : (
              <button
                onClick={onExploreApparel}
                className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-900 text-xs font-semibold hover:bg-neutral-100 transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>Shop Apparel & Claim</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
