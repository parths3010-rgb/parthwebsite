import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface BestSellersGridProps {
  products: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onOpenProduct: (product: Product) => void;
  showAuditBadges: boolean;
}

export const BestSellersGrid: React.FC<BestSellersGridProps> = ({
  products,
  onAddToCart,
  onOpenProduct,
  showAuditBadges,
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'google-recycled-black-hoodie': 'L',
    'nano-banana-sweatshirt': 'M',
    'google-surfside-tee': 'L',
    'google-gravity-super-g-bottle': '24 oz',
  });

  const [addedSkuId, setAddedSkuId] = useState<string | null>(null);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: Product) => {
    const size = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : undefined);
    onAddToCart(product, size);
    setAddedSkuId(product.id);
    setTimeout(() => {
      setAddedSkuId(null);
    }, 1600);
  };

  return (
    <section id="bestsellers" className="py-16 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
              <span>GA4 Optimization Audit · Top Revenue Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Curated Best Sellers
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-xl">
              The four foundational items driving 68% of storefront conversion volume, prioritized to eliminate browsing paralysis.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-neutral-500">
            <span>Real-time inventory:</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              All 4 SKUs In Stock
            </span>
          </div>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const currentSize = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : '');
            const isJustAdded = addedSkuId === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#FAF9F6] rounded-2xl border border-neutral-200/80 overflow-hidden hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Image Container with Hover Quick-View */}
                <div className="relative aspect-4/3 sm:aspect-square bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1 pointer-events-none">
                    {product.badge && (
                      <span className="bg-white/95 backdrop-blur-xs text-neutral-900 text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xs border border-neutral-200">
                        {product.badge}
                      </span>
                    )}
                    {product.category === 'apparel' && (
                      <span className="bg-amber-400 text-neutral-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs font-mono">
                        +FREE STICKER
                      </span>
                    )}
                  </div>

                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <button
                      onClick={() => onOpenProduct(product)}
                      className="pointer-events-auto px-3.5 py-2 rounded-full bg-white/95 text-neutral-900 text-xs font-medium shadow-md hover:bg-white flex items-center gap-1.5 transition-transform scale-95 group-hover:scale-100 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata & Rating */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                      <span className="font-mono text-[11px] uppercase tracking-wider">{product.subCategory}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-mono text-neutral-700 font-medium">{product.rating}</span>
                        <span className="text-neutral-400 text-[11px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onOpenProduct(product)}
                      className="font-semibold text-neutral-900 text-base leading-snug group-hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Price & GA4 Audit Revenue */}
                    <div className="mt-2 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold font-mono text-neutral-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs font-mono text-neutral-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-mono text-right">
                        <span className="text-neutral-500 block text-[10px]">GA4 REVENUE</span>
                        <span className="font-bold text-neutral-800">{product.ga4Revenue}</span>
                      </div>
                    </div>

                    {/* GA4 Audit Explainer Pill (Conditional or always visible) */}
                    {showAuditBadges && (
                      <div className="mt-2.5 bg-blue-50/80 border border-blue-200/80 rounded-lg p-2 text-[11px] text-blue-900">
                        <div className="flex items-center gap-1 font-semibold text-blue-950">
                          <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>Audit Metric: {product.ga4ConversionRate || product.ga4Revenue}</span>
                        </div>
                        <p className="text-[10px] text-blue-800 mt-0.5 leading-tight">
                          {product.ga4Insight}
                        </p>
                      </div>
                    )}

                    {/* Size Selector for Apparel */}
                    {product.sizes && product.sizes.length > 1 && (
                      <div className="mt-3.5 pt-3 border-t border-neutral-200/60">
                        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1.5 font-mono">
                          <span>Size:</span>
                          <span className="font-semibold text-neutral-800">{currentSize}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.slice(0, 5).map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`px-2 py-1 text-[11px] font-mono rounded transition-all cursor-pointer ${
                                currentSize === size
                                  ? 'bg-neutral-900 text-white font-medium'
                                  : 'bg-white text-neutral-700 hover:bg-neutral-200/80 border border-neutral-200'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Add to Cart CTA */}
                  <div className="mt-4 pt-3 border-t border-neutral-200/60">
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={isJustAdded}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs hover:shadow-md'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart — ${product.price.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
