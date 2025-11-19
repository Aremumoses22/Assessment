import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProductCard from './ProductCard';
import { Product } from '../types/product.types';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface ProductListProps {
  products: Product[];
  maxProducts: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  maxProducts,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  const canAddMore = products.length < maxProducts;

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyTitle}>No Products Yet</Text>
      <Text style={styles.emptySubtitle}>
        Add your first product to get started
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>My Products</Text>
        <Text style={styles.headerSubtitle}>
          {products.length} of {maxProducts} products
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(products.length / maxProducts) * 100}%`,
                backgroundColor:
                  products.length === maxProducts ? COLORS.error : COLORS.primary,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onEdit={onEdit} onDelete={onDelete} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      {canAddMore && (
        <TouchableOpacity
          style={styles.fab}
          onPress={onAddNew}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabGradient}
          >
            <Text style={styles.fabText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
      
      {!canAddMore && (
        <View style={styles.limitBanner}>
          <Text style={styles.limitText}>
            ⚠️ Maximum product limit reached
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  progressContainer: {
    marginTop: SPACING.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.full,
    ...SHADOWS.lg,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 32,
    color: COLORS.surface,
    fontWeight: '300',
  },
  limitBanner: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: SPACING.lg,
    right: SPACING.lg,
    backgroundColor: COLORS.warning,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.md,
  },
  limitText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.surface,
    textAlign: 'center',
  },
});

export default ProductList;
