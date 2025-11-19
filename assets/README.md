# Placeholder Asset Files

This directory should contain the following asset files for the app:

## Required Assets

1. **icon.png** (1024x1024)
   - App icon for both iOS and Android
   - Should be a square PNG with rounded corners

2. **splash.png** (1284x2778 for iOS, 1080x1920 for Android)
   - Splash screen image
   - Should have a background color of #6366f1 (primary color)

3. **adaptive-icon.png** (1024x1024)
   - Android adaptive icon foreground
   - Should be transparent background

4. **favicon.png** (48x48)
   - Web favicon

## Generating Assets

You can use the following tools to generate these assets:

1. **Expo Icon Generator**: Use Expo's built-in icon generator
   ```bash
   npx expo-icon
   ```

2. **Online Tools**:
   - https://www.appicon.co/
   - https://apetools.webprofusion.com/app/#/tools/imagegorilla

3. **Design Tools**:
   - Figma
   - Sketch
   - Adobe XD

## Default Behavior

If these assets are missing, Expo will use default placeholder icons. The app will still function correctly, but you should replace these with custom assets before production deployment.

## Recommended Icon Design

For this Product Management App, consider:
- A box/package icon (📦)
- Shopping bag icon
- Product grid icon
- Primary color (#6366f1) as background
- White foreground icon

The icon should be simple, recognizable, and work well at small sizes.
