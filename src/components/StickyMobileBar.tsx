import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface StickyMobileBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onQuickAddFeatured: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  cartItems,
  onOpenCart,
  onQuickAddFeatured,
}) => {
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.isGiftWithPurchase ? 0 : item.product.price * item.quantity),
    0
  );

  return (
    <aside
      aria-label="Mobile checkout quick-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-4 py-2.5 shadow-lg safe-area-bottom"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {totalCount > 0 ? (
          <>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-neutral-500">Subtotal:</span>
                <span className="text-sm font-bold font-mono text-neutral-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">
                {totalCount} item{totalCount > 1 ? 's' : ''} in cart
              </span>
            </div>

            <button
              onClick={onOpenCart}
              className="flex-1 max-w-[200px] h-11 bg-neutral-900 active:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 px-4 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Checkout Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-neutral-900">The Everyday Edit</span>
              <span className="text-[10px] text-neutral-500 font-mono">Surfside Tee & Hoodie from $32</span>
            </div>

            <button
              onClick={onQuickAddFeatured}
              className="h-11 bg-neutral-900 active:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 px-4 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Quick Bag ($32)</span>
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
