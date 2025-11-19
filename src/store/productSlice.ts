import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, ProductState } from '../types/product.types';

const STORAGE_KEY = '@products_storage';
const MAX_PRODUCTS = 5;

// Async thunks for AsyncStorage operations
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }
);

export const saveProducts = createAsyncThunk(
  'products/saveProducts',
  async (products: Product[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      return products;
    } catch (error) {
      console.error('Error saving products:', error);
      throw error;
    }
  }
);

const initialState: ProductState = {
  products: [],
  maxProducts: MAX_PRODUCTS,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      if (state.products.length < MAX_PRODUCTS) {
        state.products.push(action.payload);
        state.error = null;
      } else {
        state.error = 'Maximum product limit reached';
      }
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.error = null;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load products
      .addCase(loadProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to load products';
      })
      // Save products
      .addCase(saveProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveProducts.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to save products';
      });
  },
});

export const { addProduct, updateProduct, deleteProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
