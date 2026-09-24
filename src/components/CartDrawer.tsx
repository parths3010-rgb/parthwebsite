import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number, size?: string) => void;
  onRemoveItem: (productId: string, size?: string) => void;
  onCheckout: () => void;
  onSelectProduct: (p: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => {
    // If it's the free GWP item, price is 0
    if (item.isGiftWithPurchase) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const freeShippingThreshold = 50.0;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const total = Math.max(0, subtotal - discount);

  const hasApparel = cartItems.some(
    (item) => item.product.category === 'apparel' && item.quantity > 0
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toLowerCase() === 'google10' || promoCode.trim().toLowerCase() === 'everyday') {
      setPromoApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-lg font-bold text-neutral-900">Your Cart</h2>
              <span className="text-xs font-mono font-semibold bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping & GWP Micro Tracker */}
          <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-200 text-xs">
            <div className="flex justify-between items-center mb-1 font-mono text-[11px]">
              <span className="text-neutral-600">
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Free US Standard Delivery Unlocked!
                  </span>
                ) : (
                  <span>Add ${remainingForFreeShipping.toFixed(2)} more for Free US Shipping</span>
                )}
              </span>
              <span className="font-bold text-neutral-800 font-mono">
                {Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4285F4] transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>

            {hasApparel && (
              <div className="mt-2 text-[11px] flex items-center gap-1.5 text-amber-800 font-medium">
                <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Google Play Holographic Sticker Pack applied free with your apparel!</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-neutral-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-base font-semibold text-neutral-800">Your cart is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Browse "The Everyday Edit" to experience our high-converting apparel and accessories.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedSize || index}`} className="pt-4 first:pt-0 flex gap-3.5">
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            onClose();
                            onSelectProduct(item.product);
                          }}
                          className="text-xs sm:text-sm font-semibold text-neutral-900 hover:text-blue-600 transition-colors truncate cursor-pointer"
                        >
                          {item.product.name}
                        </h4>

                        {!item.isGiftWithPurchase && (
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                            className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Variant and Gift indicators */}
                      <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 mt-0.5">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.isGiftWithPurchase && (
                          <span className="text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded font-bold">
                            FREE GIFT (GWP)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper and price */}
                    <div className="flex items-center justify-between mt-2">
                      {item.isGiftWithPurchase ? (
                        <span className="text-xs text-neutral-500 font-mono italic">
                          1 Free Pack Included
                        </span>
                      ) : (
                        <div className="flex items-center border border-neutral-300 rounded-lg bg-neutral-50 text-xs font-mono">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1, item.selectedSize)}
                            className="px-2 py-0.5 text-neutral-600 hover:text-neutral-950 font-bold cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-semibold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1, item.selectedSize)}
                            className="px-2 py-0.5 text-neutral-600 hover:text-neutral-950 font-bold cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      <div className="text-right">
                        {item.isGiftWithPurchase ? (
                          <div className="flex items-center gap-1.5 font-mono text-xs">
                            <span className="line-through text-neutral-400">$8.00</span>
                            <span className="font-bold text-emerald-700">$0.00</span>
                          </div>
                        ) : (
                          <span className="text-xs sm:text-sm font-bold font-mono text-neutral-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50/50 space-y-3">
              {/* Promo Code Toggle */}
              {!promoApplied ? (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter 'GOOGLE10' for 10% off"
                    className="flex-1 bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-xs text-neutral-800 uppercase focus:outline-none focus:border-neutral-900"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-medium rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Promo GOOGLE10 Applied (10% Off)
                  </span>
                  <button
                    onClick={() => setPromoApplied(false)}
                    className="text-neutral-400 hover:text-neutral-800 text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Subtotal lines */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Standard Shipping</span>
                  <span>{isFreeShipping ? 'FREE' : '$4.99'}</span>
                </div>

                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-900">
                  <span>Total</span>
                  <span className="text-base">${(total + (isFreeShipping ? 0 : 4.99)).toFixed(2)}</span>
                </div>
              </div>

              {/* Instant Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-neutral-400 font-mono">
                Official Google Pay & Encrypted 256-Bit Checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
