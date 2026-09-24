export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'apparel' | 'accessories' | 'lifestyle';
  subCategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  description: string;
  features: string[];
  sizes?: string[];
  colors?: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  // GA4 Audit Metrics
  ga4Revenue: string;
  ga4ConversionRate?: string;
  ga4Insight: string;
  crossSellIds?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  isGiftWithPurchase?: boolean;
}

export interface BundleOffer {
  id: string;
  title: string;
  subtitle: string;
  productIds: string[];
  discountPercent: number;
  bundlePrice: number;
  regularPrice: number;
  description: string;
}
