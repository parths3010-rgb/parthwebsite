import React, { useState } from 'react';
import { Plus, Gift, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { Product, BundleOffer } from '../types';

interface EverydaySetupCrossSellProps {
  bundle: BundleOffer;
  surfsideTee: Product;
  gravityBottle: Product;
  freeStickers: Product;
  onAddBundle: (teeSize: string) => void;
  showAuditBadges: boolean;
}

export const EverydaySetupCrossSell: React.FC<EverydaySetupCrossSellProps> = ({
  bundle,
  surfsideTee,
  gravityBottle,
  freeStickers,
  onAddBundle,
  showAuditBadges,
}) => {
  const [selectedTeeSize, setSelectedTeeSize] = useState('L');
  const [isBundleAdded, setIsBundleAdded] = useState(false);

  const handleAddBundle = () => {
    onAddBundle(selectedTeeSize);
    setIsBundleAdded(true);
    setTimeout(() => {
      setIsBundleAdded(false);
    }, 2000);
  };

  return (
    <section className="py-14 sm:py-18 bg-[#F5F3ED] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-sm">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
                <span>Conversion Accelerator · GA4 Cross-Sell Module</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Complete Your Everyday Google Setup
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                {bundle.description}
              </p>
            </div>

            {/* Price pill & discount banner */}
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200/80 px-4 py-2.5 rounded-2xl shrink-0">
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-xs font-mono text-neutral-400 line-through">
                    ${bundle.regularPrice.toFixed(2)}
                  </span>
                  <span className="text-xl font-bold font-mono text-neutral-900">
                    ${bundle.bundlePrice.toFixed(2)}
                  </span>
                </div>
                <span className="text-[11px] text-amber-800 font-semibold uppercase tracking-wider">
                  Save 10% + Free $8 Gift
                </span>
              </div>
            </div>
          </div>

          {showAuditBadges && (
            <div className="my-4 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-blue-950 font-mono">GA4 Basket Affinity Analysis: </span>
                <span>
                  Shoppers purchasing the Surfside Tee demonstrated a 14.1% cross-sell affinity for the Gravity Super G Bottle. Bundling them in a single tap elevates Average Order Value (AOV) from $32 to $54 while eliminating checkout hesitation through the GWP sticker incentive.
                </span>
              </div>
            </div>
          )}

          {/* Bundle Items Showcase */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Item 1: Surfside Tee */}
            <div className="md:col-span-4 flex items-center gap-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
              <img
                src={surfsideTee.image}
                alt={surfsideTee.name}
                className="w-20 h-20 rounded-xl object-cover bg-white shrink-0 border border-neutral-200/60"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Core Apparel</span>
                <h4 className="text-sm font-semibold text-neutral-900 truncate">{surfsideTee.name}</h4>
                <div className="text-xs font-mono text-neutral-700 font-medium mt-0.5">
                  ${surfsideTee.price.toFixed(2)}
                </div>

                {/* Size choice */}
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[10px] text-neutral-400 font-mono">Size:</span>
                  {['S', 'M', 'L', 'XL'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedTeeSize(s)}
                      className={`px-1.5 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                        selectedTeeSize === s
                          ? 'bg-neutral-900 text-white font-medium'
                          : 'bg-white border border-neutral-300 text-neutral-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Plus Icon */}
            <div className="md:col-span-1 flex justify-center text-neutral-400">
              <div className="w-8 h-8 rounded-full bg-neutral-200/80 flex items-center justify-center">
                <Plus className="w-4 h-4 text-neutral-700" />
              </div>
            </div>

            {/* Item 2: Gravity Super G Bottle */}
            <div className="md:col-span-4 flex items-center gap-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
              <img
                src={gravityBottle.image}
                alt={gravityBottle.name}
                className="w-20 h-20 rounded-xl object-cover bg-white shrink-0 border border-neutral-200/60"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Desk & Travel</span>
                <h4 className="text-sm font-semibold text-neutral-900 truncate">{gravityBottle.name}</h4>
                <div className="text-xs font-mono text-neutral-700 font-medium mt-0.5">
                  ${gravityBottle.price.toFixed(2)}
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-1">
                  Matte Obsidian · 24 oz
                </div>
              </div>
            </div>

            {/* Plus Free Gift Column */}
            <div className="md:col-span-3 flex flex-col items-center justify-center bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-amber-400/30 flex items-center justify-center mb-1.5">
                <Gift className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                BONUS GIFT INCLUDED
              </span>
              <p className="text-xs font-semibold text-neutral-900 mt-0.5">
                Google Play Sticker Pack
              </p>
              <div className="flex items-center gap-1 text-[11px] font-mono mt-1">
                <span className="line-through text-neutral-400">$8.00</span>
                <span className="text-emerald-700 font-bold">FREE ($0.00)</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-500">
              Includes: Surfside Tee (Size {selectedTeeSize}) + Gravity Super G Bottle + 6-Piece Sticker Pack.
            </div>

            <button
              onClick={handleAddBundle}
              disabled={isBundleAdded}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm ${
                isBundleAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white hover:shadow-md'
              }`}
            >
              {isBundleAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Setup Added with Free Stickers!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Everyday Setup to Cart — ${bundle.bundlePrice.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
