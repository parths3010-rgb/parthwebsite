import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Flame, Percent } from 'lucide-react';
import { Product } from '../types';

interface HeroEverydayEditProps {
  surfsideTee: Product;
  recycledHoodie: Product;
  onAddToCart: (product: Product, size?: string) => void;
  onOpenProduct: (product: Product) => void;
  onShopTheEdit: () => void;
  showAuditBadges: boolean;
}

export const HeroEverydayEdit: React.FC<HeroEverydayEditProps> = ({
  surfsideTee,
  recycledHoodie,
  onAddToCart,
  onOpenProduct,
  onShopTheEdit,
  showAuditBadges,
}) => {
  return (
    <section id="edit" className="relative bg-[#F5F4EF] border-b border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Conversion Pitch */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Top editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-3 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
              <span>Curated Drop · Fall 2026 Edition</span>
              <span aria-hidden="true">·</span>
              <span>Mountain View Design Lab</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.08] mb-4 text-balance">
              The Everyday Edit.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mb-6">
              Our two most requested essentials, engineered with heavyweight recycled fleece and organic California ringspun cotton. Built to live in, season after season.
            </p>

            {/* GA4 Audit Highlight Callout (Optional transparent overlay) */}
            {showAuditBadges && (
              <div className="w-full bg-blue-50/90 border border-blue-200 rounded-xl p-3.5 mb-6 text-xs text-blue-900 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-blue-950 font-mono uppercase text-[11px]">
                  <Flame className="w-3.5 h-3.5 text-blue-600" />
                  <span>GA4 Top-of-Funnel Conversion Strategy</span>
                </div>
                <p className="text-blue-800 text-xs leading-relaxed">
                  Anchoring the <span className="font-semibold text-blue-950">Surfside Tee (11.7% CVR)</span> alongside the <span className="font-semibold text-blue-950">Recycled Black Hoodie ($5,565.00 gross)</span> solves homepage bounce rates by giving high-intent buyers immediate paths to verified best-performers.
                </p>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              <button
                onClick={onShopTheEdit}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>SHOP THE EDIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenProduct(surfsideTee)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-neutral-800 font-medium text-sm border border-neutral-300 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Surfside Tee ($32)</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-neutral-200/80 w-full flex items-center gap-6 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Certified Organic & Recycled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-blue-600" />
                <span>Free Play Sticker with Either Item</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Dual SKU Interactive Cards */}
          <div className="lg:col-span-6 relative">
            {/* Background Editorial Image */}
            <div className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden shadow-xl border border-neutral-200/70 group">
              <img
                src="/src/assets/images/hero_everyday_edit_1790217771286.jpg"
                alt="Google Everyday Edit apparel collection"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Floating Headline on Mobile / Overlay Tag */}
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300">
                    Signature Uniform
                  </span>
                  <p className="text-sm sm:text-base font-semibold">The Mountain View Essentials</p>
                </div>
                <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white font-mono">
                  From $32.00
                </span>
              </div>
            </div>

            {/* Featured Duo Cards Stack (Sticky fast-actions) */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Recycled Hoodie Quick Card */}
              <div className="bg-white rounded-xl p-3 border border-neutral-200 shadow-sm flex items-center gap-3">
                <img
                  src={recycledHoodie.image}
                  alt={recycledHoodie.name}
                  className="w-14 h-14 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-neutral-900 truncate">
                      {recycledHoodie.name}
                    </h3>
                    <span className="text-xs font-mono font-medium text-neutral-900">
                      ${recycledHoodie.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    GA4 Rev: <span className="text-neutral-800 font-semibold">{recycledHoodie.ga4Revenue}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={() => onAddToCart(recycledHoodie, 'M')}
                      className="text-[11px] bg-neutral-900 text-white px-2.5 py-1 rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Quick Add</span>
                    </button>
                    <button
                      onClick={() => onOpenProduct(recycledHoodie)}
                      className="text-[11px] text-neutral-600 hover:text-neutral-900 underline underline-offset-2"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Surfside Tee Quick Card */}
              <div className="bg-white rounded-xl p-3 border border-neutral-200 shadow-sm flex items-center gap-3">
                <img
                  src={surfsideTee.image}
                  alt={surfsideTee.name}
                  className="w-14 h-14 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-neutral-900 truncate">
                      {surfsideTee.name}
                    </h3>
                    <span className="text-xs font-mono font-medium text-neutral-900">
                      ${surfsideTee.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    GA4 CVR: <span className="text-emerald-600 font-semibold">{surfsideTee.ga4ConversionRate}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={() => onAddToCart(surfsideTee, 'L')}
                      className="text-[11px] bg-neutral-900 text-white px-2.5 py-1 rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Quick Add</span>
                    </button>
                    <button
                      onClick={() => onOpenProduct(surfsideTee)}
                      className="text-[11px] text-neutral-600 hover:text-neutral-900 underline underline-offset-2"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
