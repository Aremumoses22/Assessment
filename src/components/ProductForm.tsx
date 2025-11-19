import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Product } from '../types/product.types';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import {
  validateProductName,
  validateProductPrice,
  validateProductImage,
} from '../utils/validation';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [imageUri, setImageUri] = useState(product?.imageUri || '');
  const [isLoading, setIsLoading] = useState(false);
  
  const [nameError, setNameError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      // Using Alert would require import from react-native
      console.warn('Camera roll permissions not granted');
    }
  };

  const pickImage = async () => {
    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
        setImageError(null);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera permissions to take photos!');
        return;
      }

      setIsLoading(true);
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
        setImageError(null);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    // Validate all fields
    const nameValidation = validateProductName(name);
    const priceValidation = validateProductPrice(price);
    const imageValidation = validateProductImage(imageUri);

    setNameError(nameValidation);
    setPriceError(priceValidation);
    setImageError(imageValidation);

    // If all validations pass, submit
    if (!nameValidation && !priceValidation && !imageValidation) {
      onSubmit({
        name: name.trim(),
        price: price.trim(),
        imageUri,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>
            {product ? 'Edit Product' : 'Add New Product'}
          </Text>

          {/* Image Section */}
          <View style={styles.imageSection}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>📷</Text>
                <Text style={styles.imagePlaceholderSubtext}>No image selected</Text>
              </View>
            )}
            
            <View style={styles.imageButtons}>
              <TouchableOpacity
                style={[styles.imageButton, styles.primaryButton]}
                onPress={pickImage}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.surface} />
                ) : (
                  <Text style={styles.imageButtonText}>Choose Image</Text>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.imageButton, styles.secondaryButton]}
                onPress={takePhoto}
                disabled={isLoading}
              >
                <Text style={styles.imageButtonTextSecondary}>Take Photo</Text>
              </TouchableOpacity>
            </View>
            
            {imageError && <Text style={styles.errorText}>{imageError}</Text>}
          </View>

          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={[styles.input, nameError ? styles.inputError : null]}
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameError(null);
              }}
              placeholder="Enter product name"
              placeholderTextColor={COLORS.disabled}
            />
            {nameError && <Text style={styles.errorText}>{nameError}</Text>}
          </View>

          {/* Price Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (USD)</Text>
            <TextInput
              style={[styles.input, priceError ? styles.inputError : null]}
              value={price}
              onChangeText={(text) => {
                setPrice(text);
                setPriceError(null);
              }}
              placeholder="0.00"
              placeholderTextColor={COLORS.disabled}
              keyboardType="decimal-pad"
            />
            {priceError && <Text style={styles.errorText}>{priceError}</Text>}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {product ? 'Update' : 'Add Product'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xl,
  },
  imageSection: {
    marginBottom: SPACING.xl,
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  imagePlaceholderSubtext: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  imageButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  imageButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  imageButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  imageButtonTextSecondary: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  cancelButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.md,
  },
  submitButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
});

export default ProductForm;
