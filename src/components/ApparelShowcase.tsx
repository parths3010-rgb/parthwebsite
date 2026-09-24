import React, { useState } from 'react';
import { ShoppingBag, Check, Star, Eye } from 'lucide-react';
import { Product } from '../types';

interface ApparelShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onOpenProduct: (product: Product) => void;
  showAuditBadges: boolean;
}

export const ApparelShowcase: React.FC<ApparelShowcaseProps> = ({
  products,
  onAddToCart,
  onOpenProduct,
  showAuditBadges,
}) => {
  const [filter, setFilter] = useState<'all' | 'hoodies' | 'crewnecks' | 'tees'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const apparelProducts = products.filter((p) => p.category === 'apparel');

  const filteredProducts = apparelProducts.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'hoodies') return p.subCategory.toLowerCase().includes('hoodie');
    if (filter === 'crewnecks') return p.subCategory.toLowerCase().includes('crewneck') || p.subCategory.toLowerCase().includes('sweatshirt');
    if (filter === 'tees') return p.subCategory.toLowerCase().includes('t-shirt') || p.subCategory.toLowerCase().includes('tee');
    return true;
  });

  const handleAdd = (product: Product) => {
    const size = product.sizes ? product.sizes[1] || product.sizes[0] : undefined;
    onAddToCart(product, size);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  return (
    <section id="apparel" className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
              <span>High-Converting Wearables Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Apparel Essentials
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-xl">
              Engineered with sustainable organic textiles and archival Google developer motifs. All qualifying apparel unlocks the free Google Play sticker pack.
            </p>
          </div>

          {/* Interactive filter tabs (clean segmented control) */}
          <div className="mt-4 md:mt-0 flex items-center gap-1 p-1 bg-neutral-200/70 rounded-xl overflow-x-auto">
            {[
              { key: 'all', label: 'All Wearables' },
              { key: 'hoodies', label: 'Hoodies & Fleece' },
              { key: 'crewnecks', label: 'Crewnecks' },
              { key: 'tees', label: 'Tees' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  filter === tab.key
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-4/3 sm:aspect-square bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-white/90 backdrop-blur-xs text-neutral-900 text-[10px] font-mono font-medium px-2 py-0.5 rounded shadow-xs border border-neutral-200">
                      {product.subCategory}
                    </span>
                    <span className="bg-amber-400 text-neutral-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs font-mono">
                      +FREE GIFT
                    </span>
                  </div>

                  {/* Hover Quick View */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <button
                      onClick={() => onOpenProduct(product)}
                      className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white text-neutral-900 text-xs font-medium shadow hover:bg-neutral-50 flex items-center gap-1.5 transition-transform scale-95 group-hover:scale-100 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Specs</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                      <span className="font-mono text-[11px]">{product.sku}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-mono text-neutral-700">{product.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onOpenProduct(product)}
                      className="font-semibold text-neutral-900 text-base group-hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-lg font-bold font-mono text-neutral-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-mono text-neutral-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {showAuditBadges && (
                      <div className="mt-2 bg-blue-50/80 border border-blue-200/80 rounded-lg p-2 text-[11px] text-blue-900">
                        <span className="font-mono font-semibold block text-[10px]">GA4 AUDIT SIGNAL:</span>
                        <span className="text-[10px] text-blue-800 leading-tight block mt-0.5">
                          {product.ga4Insight}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2">
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={isAdded}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onOpenProduct(product)}
                      className="px-3 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-medium cursor-pointer"
                      title="Quick Specs"
                    >
                      Specs
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
