export interface Product {
  id: string;
  name: string;
  price: string;
  imageUri: string;
  createdAt: number;
}

export interface ProductState {
  products: Product[];
  maxProducts: number;
  isLoading: boolean;
  error: string | null;
}
