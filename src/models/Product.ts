
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  available: boolean;
}
