export const validateProductName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return 'Product name is required';
  }
  if (name.trim().length < 3) {
    return 'Product name must be at least 3 characters';
  }
  if (name.trim().length > 50) {
    return 'Product name must be less than 50 characters';
  }
  return null;
};

export const validateProductPrice = (price: string): string | null => {
  if (!price || price.trim().length === 0) {
    return 'Product price is required';
  }
  
  const priceNumber = parseFloat(price);
  
  if (isNaN(priceNumber)) {
    return 'Please enter a valid number';
  }
  
  if (priceNumber <= 0) {
    return 'Price must be greater than 0';
  }
  
  if (priceNumber > 1000000) {
    return 'Price must be less than 1,000,000';
  }
  
  return null;
};

export const validateProductImage = (imageUri: string): string | null => {
  if (!imageUri || imageUri.trim().length === 0) {
    return 'Product image is required';
  }
  return null;
};

export const formatPrice = (price: string): string => {
  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber)) return price;
  return priceNumber.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
