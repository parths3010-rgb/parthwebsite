import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check, Plus, Gift, Flame } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, quantity?: number) => void;
  allProducts: Product[];
  onOpenProduct: (p: Product) => void;
  showAuditBadges: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  allProducts,
  onOpenProduct,
  showAuditBadges,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[1] || product.sizes[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Cross-sell paired products
  const crossSellProducts = (product.crossSellIds || [])
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  const handleAddCurrent = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleAddCrossSell = (crossProduct: Product) => {
    const size = crossProduct.sizes ? crossProduct.sizes[0] : undefined;
    onAddToCart(crossProduct, size, 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-neutral-600 hover:text-neutral-950 hover:bg-white shadow-xs border border-neutral-200 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: Product Media Gallery */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs border border-neutral-200">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* GA4 Audit Box if enabled */}
              {showAuditBadges && (
                <div className="bg-blue-50/90 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900">
                  <div className="flex items-center gap-1.5 font-semibold text-blue-950 font-mono">
                    <Flame className="w-3.5 h-3.5 text-blue-600" />
                    <span>GA4 Behavioral Insight</span>
                  </div>
                  <p className="mt-1 text-blue-800 leading-relaxed">
                    {product.ga4Insight}
                  </p>
                  <div className="mt-2 pt-2 border-t border-blue-200/80 flex items-center justify-between font-mono text-[11px]">
                    <span>Recorded Revenue: {product.ga4Revenue}</span>
                    {product.ga4ConversionRate && <span>CVR: {product.ga4ConversionRate}</span>}
                  </div>
                </div>
              )}

              {/* Free Gift Alert */}
              {product.category === 'apparel' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
                  <Gift className="w-5 h-5 text-amber-600 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-amber-950">Complimentary Gift Included</p>
                    <p className="text-amber-800">
                      Adding this apparel automatically adds the free Google Play Holographic Sticker Pack ($8 value) to your cart.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                {/* Taxonomy & SKU */}
                <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-2">
                  <span className="uppercase">{product.category} / {product.subCategory}</span>
                  <span>SKU: {product.sku}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-neutral-800 font-mono">
                    {product.rating}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({product.reviewsCount} customer reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-bold font-mono text-neutral-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base font-mono text-neutral-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    In Stock
                  </span>
                </div>

                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-neutral-600">Select Size:</span>
                      <span className="font-semibold text-neutral-900">{selectedSize}</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`py-2 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                            selectedSize === s
                              ? 'bg-neutral-900 text-white font-bold'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector & Primary CTA */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center border border-neutral-300 rounded-xl bg-neutral-50 px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-neutral-950 font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-bold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-neutral-950 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddCurrent}
                    disabled={isAdded}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white hover:shadow-md'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Assurance row */}
                <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-neutral-200 text-center text-[11px] text-neutral-500">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-neutral-700" />
                    <span>Free US Delivery over $50</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RefreshCw className="w-4 h-4 text-neutral-700" />
                    <span>30-Day Hassle Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-neutral-700" />
                    <span>Official Authenticity</span>
                  </div>
                </div>
              </div>

              {/* Cross-Sell Bundle Recommendation */}
              {crossSellProducts.length > 0 && (
                <div className="mt-6 pt-5 border-t border-neutral-200">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                      Frequently Paired Together
                    </span>
                    <span className="text-[10px] text-blue-700 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      GA4 14.1% Attach
                    </span>
                  </div>

                  <div className="space-y-2">
                    {crossSellProducts.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-200"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover bg-white shrink-0 border border-neutral-200"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-neutral-900 truncate">
                              {item.name}
                            </p>
                            <span className="text-xs font-mono text-neutral-600">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddCrossSell(item)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-[11px] font-semibold flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
