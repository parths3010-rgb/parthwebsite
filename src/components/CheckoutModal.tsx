import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Package, Truck, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    address: '1600 Amphitheatre Pkwy',
    city: 'Mountain View',
    state: 'CA',
    zip: '94043',
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.isGiftWithPurchase ? 0 : item.product.price * item.quantity),
    0
  );
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
                <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                Google Pay Fast Checkout
              </span>
            </div>

            <h3 className="text-2xl font-bold text-neutral-900">Instant Order Checkout</h3>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              Review your items and shipping details to complete your order.
            </p>

            {/* Quick Summary Box */}
            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 mb-6 text-xs">
              <div className="space-y-2">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-neutral-700">
                    <span className="truncate max-w-[70%]">
                      {item.quantity}x {item.product.name} {item.selectedSize ? `(${item.selectedSize})` : ''}
                    </span>
                    <span className="font-mono font-medium">
                      {item.isGiftWithPurchase ? (
                        <span className="text-emerald-700 font-bold">FREE GIFT</span>
                      ) : (
                        `$${(item.product.price * item.quantity).toFixed(2)}`
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-200 flex justify-between font-bold text-sm text-neutral-900">
                <span>Total Due:</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-neutral-700 font-medium mb-1">Shipping Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Authorize Order · ${total.toFixed(2)}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
              Order Confirmed #GOOG-8821
            </span>
            <h3 className="text-2xl font-bold text-neutral-900 mt-1">
              Thank you, {formData.name}!
            </h3>
            <p className="text-xs text-neutral-600 mt-2 max-w-sm mx-auto">
              Your Google Merchandise order has been confirmed. A confirmation receipt has been dispatched to <span className="font-semibold text-neutral-900">{formData.email}</span>.
            </p>

            <div className="mt-6 bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs text-left space-y-2">
              <div className="flex items-center gap-2 text-neutral-800 font-medium">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Estimated Delivery: 2–3 Business Days (Mountain View Hub)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-800 font-medium">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Google Play Holographic Stickers Included Inside Packaging</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('details');
                onClose();
              }}
              className="mt-6 px-6 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-neutral-800"
            >
              Return to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
