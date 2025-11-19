import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  loadProducts,
  saveProducts,
} from '../store/productSlice';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { Product } from '../types/product.types';
import { COLORS } from '../constants/theme';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, maxProducts } = useAppSelector((state) => state.products);
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    // Load products on mount
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    // Save products whenever they change
    if (products.length > 0 || products.length === 0) {
      dispatch(saveProducts(products));
    }
  }, [products, dispatch]);

  const handleAddNew = () => {
    if (products.length >= maxProducts) {
      Toast.show({
        type: 'error',
        text1: 'Product Limit Reached',
        text2: `You can only add up to ${maxProducts} products`,
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    setSelectedProduct(undefined);
    setIsFormVisible(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormVisible(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
    Toast.show({
      type: 'success',
      text1: 'Product Deleted',
      text2: 'Product has been removed successfully',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleSubmit = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (selectedProduct) {
      // Update existing product
      dispatch(
        updateProduct({
          ...selectedProduct,
          ...productData,
        })
      );
      Toast.show({
        type: 'success',
        text1: 'Product Updated',
        text2: 'Product details have been updated successfully',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      dispatch(addProduct(newProduct));
      Toast.show({
        type: 'success',
        text1: 'Product Added',
        text2: `${products.length + 1} of ${maxProducts} products`,
        position: 'bottom',
        visibilityTime: 2000,
      });
      
      // Check if limit reached after adding
      if (products.length + 1 >= maxProducts) {
        setTimeout(() => {
          Toast.show({
            type: 'info',
            text1: '📦 Product Limit Reached',
            text2: 'You have reached the maximum limit of 5 products',
            position: 'top',
            visibilityTime: 4000,
          });
        }, 2500);
      }
    }
    setIsFormVisible(false);
    setSelectedProduct(undefined);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setSelectedProduct(undefined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <ProductList
        products={products}
        maxProducts={maxProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />

      <Modal
        visible={isFormVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCancel}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ProductForm
            product={selectedProduct}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </SafeAreaView>
      </Modal>

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default HomeScreen;
