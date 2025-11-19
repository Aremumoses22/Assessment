# Product Management App 📦

A professional React Native mobile application for managing up to 5 products with images, names, and prices. Built with modern best practices and designed to showcase advanced React Native development skills.

![React Native](https://img.shields.io/badge/React%20Native-0.73-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6?style=flat&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0-764ABC?style=flat&logo=redux)
![Expo](https://img.shields.io/badge/Expo-50.0-000020?style=flat&logo=expo)

## 🎯 Features

### Core Requirements
- ✅ **Product Management**: Add up to 5 products with name, photo, and price
- ✅ **Image Upload**: Camera and gallery integration with expo-image-picker
- ✅ **Limit Notification**: Toast notifications when product limit is reached
- ✅ **State Management**: Redux Toolkit for predictable state management
- ✅ **Clean UI/UX**: Modern, professional interface with smooth animations

### Bonus Features (Going Above & Beyond)
- ⚡ **TypeScript**: Full type safety throughout the application
- 💾 **Offline Storage**: Persistent data with AsyncStorage
- ✨ **Animations**: Smooth transitions and micro-interactions
- ✏️ **Edit & Delete**: Full CRUD operations for products
- 🎨 **Professional Design**: Custom theme system with consistent styling
- 📝 **Form Validation**: Comprehensive input validation with error messages
- 🔔 **Toast Notifications**: User-friendly feedback for all actions
- 📊 **Progress Indicator**: Visual representation of product count
- 🎭 **Empty States**: Elegant handling of empty product list
- 🌈 **Gradient Buttons**: Eye-catching UI elements

## 🏗️ Architecture & Technical Decisions

### State Management: Redux Toolkit
**Why Redux Toolkit?**
- Industry-standard solution for complex state management
- Built-in best practices (Immer for immutability, thunks for async)
- Excellent TypeScript support
- DevTools integration for debugging
- Scalable for future feature additions

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ProductCard.tsx     # Individual product display
│   ├── ProductForm.tsx     # Add/Edit product form
│   └── ProductList.tsx     # Product grid with FAB
├── screens/            # App screens
│   └── HomeScreen.tsx      # Main screen with modal management
├── store/              # Redux state management
│   ├── store.ts            # Store configuration
│   ├── productSlice.ts     # Product state & actions
│   └── hooks.ts            # Typed Redux hooks
├── types/              # TypeScript definitions
│   └── product.types.ts    # Product interfaces
├── utils/              # Helper functions
│   └── validation.ts       # Form validation logic
└── constants/          # App constants
    └── theme.ts            # Design system tokens
```

### Key Technical Highlights

#### 1. Type Safety with TypeScript
- Strict mode enabled for maximum type safety
- Custom types for all data structures
- Typed Redux hooks for state access
- Prevents runtime errors and improves developer experience

#### 2. Async Storage Integration
```typescript
// Automatic persistence on state changes
useEffect(() => {
  dispatch(saveProducts(products));
}, [products]);
```

#### 3. Form Validation
- Real-time validation for all inputs
- Clear error messages
- Price formatting and validation
- Image requirement checks

#### 4. Responsive Animations
- Scale animations on card press
- Smooth modal transitions
- Progress bar animations
- Toast notifications with timing

## 📱 Screenshots & Demo

### Main Screen
- Product grid layout
- Progress indicator showing X/5 products
- Floating Action Button (FAB) for adding products
- Empty state with helpful message

### Add/Edit Product Form
- Image picker with camera and gallery options
- Name input with validation (3-50 characters)
- Price input with decimal keyboard
- Real-time validation feedback
- Action buttons (Cancel/Submit)

### Notifications
- Success toast when product added
- Warning when limit reached
- Confirmation on delete
- Update confirmation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on physical device (optional)

### Installation

1. **Clone or extract the project**
   ```bash
   cd Assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## 📦 Dependencies

### Core Dependencies
- **react-native**: 0.73.0 - Core framework
- **expo**: ~50.0.0 - Development platform
- **@reduxjs/toolkit**: ^2.0.1 - State management
- **react-redux**: ^9.0.4 - React bindings for Redux
- **typescript**: ^5.1.3 - Type safety

### Feature Dependencies
- **expo-image-picker**: ~14.7.1 - Camera & gallery access
- **@react-native-async-storage/async-storage**: 1.21.0 - Persistent storage
- **react-native-toast-message**: ^2.2.0 - User notifications
- **expo-linear-gradient**: ~12.7.0 - Gradient UI elements

## 🧪 Testing Checklist

### Functional Testing
- [x] Add product with all fields
- [x] Add product up to maximum limit (5)
- [x] Edit existing product
- [x] Delete product
- [x] Image picker from gallery works
- [x] Camera capture works
- [x] Form validation catches errors
- [x] Toast notifications display correctly
- [x] Data persists after app restart

### Edge Cases
- [x] Attempt to add 6th product (shows limit notification)
- [x] Submit form with empty fields (validation errors)
- [x] Submit with invalid price (validation error)
- [x] Close form without saving (no changes)
- [x] Rapid button taps (no duplicate actions)

## 🎨 Design System

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Success**: #22c55e (Green)
- **Error**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)
- **Background**: #f8fafc (Light Gray)
- **Surface**: #ffffff (White)

### Typography
- Title: 32px, Bold
- Heading: 24px, SemiBold
- Body: 16px, Regular
- Caption: 14px, Regular

## 🔒 Security & Best Practices

1. **Input Validation**: All user inputs are validated before storage
2. **Type Safety**: TypeScript prevents common runtime errors
3. **Immutable State**: Redux Toolkit ensures state immutability
4. **Error Handling**: Try-catch blocks for async operations
5. **Permission Requests**: Proper handling of camera/gallery permissions

## 📈 Scalability Considerations

### Future Enhancements
- Cloud sync with Firebase/Supabase
- User authentication
- Product categories
- Search and filter functionality
- Export data as CSV/PDF
- Multiple image uploads per product
- Barcode scanning
- Price history tracking
- Share products via social media

### Code Maintainability
- Modular component structure
- Separation of concerns (UI/Logic/State)
- Consistent naming conventions
- Comprehensive comments
- Reusable utility functions

## 🎯 Skills Demonstrated

### Must-Have Skills ✅
- [x] **3+ years React Native experience** - Professional-grade code structure
- [x] **JavaScript (ES6+) & TypeScript** - Modern syntax, strong typing
- [x] **State Management** - Redux Toolkit implementation
- [x] **Mobile Best Practices** - Permissions, storage, UX patterns
- [x] **Responsive UI/UX** - Adaptive layouts, animations
- [x] **Git** - Clean commit history, proper .gitignore

### Bonus Points ⭐
- [x] **Expo** - Full Expo SDK integration
- [x] **Offline Storage** - AsyncStorage implementation
- [x] **Modern Tooling** - TypeScript, structured project
- [x] **CI/CD Ready** - Structured for automated builds

## 📄 License

This project was created as part of a job application case study.

## 👤 Developer

**Aremu Moses**
- Submission Date: November 19, 2025
- Position: React Native Developer

## 🙏 Acknowledgments

Thank you for reviewing this case study. I've gone beyond the basic requirements to demonstrate:
- Deep understanding of React Native ecosystem
- Production-ready code quality
- Attention to user experience
- Ability to work with modern tools and best practices

I look forward to discussing the technical decisions and architecture choices in more detail during the interview process.

---

**Note**: This app is ready for immediate testing. Simply run `npm install` and `npm start` to experience the full functionality on any device or simulator.
