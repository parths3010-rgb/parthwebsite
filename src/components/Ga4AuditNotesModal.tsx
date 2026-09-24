import React from 'react';
import { X, BarChart3, TrendingUp, CheckCircle, Lightbulb, Target } from 'lucide-react';
import { GA4_AUDIT_POINTS } from '../data/products';

interface Ga4AuditNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Ga4AuditNotesModal: React.FC<Ga4AuditNotesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full"
          aria-label="Close audit notes"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
            <BarChart3 className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
            GA4 Optimization Audit Documentation
          </span>
        </div>

        <h3 className="text-2xl font-bold text-neutral-900">
          Executive CRO & Architecture Rationale
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 mb-6">
          How this prototype restructures the Google Merchandise Store experience based on quantitative Google Analytics 4 funnel analysis.
        </p>

        {/* Audit Findings List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {GA4_AUDIT_POINTS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-semibold text-neutral-900">{item.title}</h4>
                </div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {item.metric}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-neutral-600">
                  <span className="font-semibold text-neutral-700 shrink-0 font-mono text-[11px]">PROBLEM:</span>
                  <span>{item.finding}</span>
                </div>

                <div className="flex items-start gap-2 text-neutral-900 bg-white p-2.5 rounded-xl border border-neutral-200/70">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-800 font-mono text-[11px]">UX SOLUTION: </span>
                    <span className="text-neutral-700">{item.solution}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            Mountain View Analytics Lab
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
