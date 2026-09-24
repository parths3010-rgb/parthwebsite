import React from 'react';
import { ShieldCheck, Leaf, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAudit }) => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800 pb-20 md:pb-12 pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-neutral-800">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-neutral-800 text-neutral-300">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Sustainable Cotton & Fleece</h4>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Every piece in The Everyday Edit is cut from 100% GOTS certified organic ringspun cotton or recycled polyester fleece.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-neutral-800 text-neutral-300">
              <ShieldCheck className="w-5 h-5 text-[#4285F4]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Official Merchandise Guarantee</h4>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Direct from Google Mountain View campus. Guaranteed authenticity, durable stitching, and premium eco-friendly screenprints.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-neutral-800 text-neutral-300">
              <HeartHandshake className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Free GWP Sticker Rewards</h4>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Complimentary 6-pack collectible holographic stickers bundled with all orders containing apparel items.
              </p>
            </div>
          </div>
        </div>

        {/* Links & Brand Row */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
              <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
              <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
              <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
            </div>
            <span className="font-semibold text-white text-sm">Google Merchandise Store</span>
            <span className="text-neutral-600 font-mono">·</span>
            <span className="text-neutral-500 font-mono">Mountain View, CA</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
            <a href="#edit" className="hover:text-white transition-colors">The Everyday Edit</a>
            <a href="#bestsellers" className="hover:text-white transition-colors">Best Sellers</a>
            <a href="#apparel" className="hover:text-white transition-colors">Apparel</a>
            <button
              onClick={onOpenAudit}
              className="hover:text-white transition-colors underline underline-offset-2 cursor-pointer"
            >
              GA4 Optimization Audit Notes
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500 font-mono">
          <p>© 2026 Google LLC. All rights reserved. Prototype for UX Optimization.</p>
          <p>Built with Google Design System & GA4 Conversion Principles</p>
        </div>
      </div>
    </footer>
  );
};
