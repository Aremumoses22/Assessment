import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Product } from '../types/product.types';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { formatPrice } from '../utils/validation';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onEdit(product)}
        style={styles.card}
      >
        <Image source={{ uri: product.imageUri }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(product.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.border,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  deleteButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  deleteText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
});

export default ProductCard;
