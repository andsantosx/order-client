export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  tag?: string;
  stock: number;
  colors: string[];
  sizes: string[];
  originalPrice?: number;
}
