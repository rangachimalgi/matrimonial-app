# Spark — Matrimonial App

React Native (Expo) + Supabase matrimonial app.

## Run on your phone (USB / Expo Go)

1. Install **Expo Go** on your phone
2. Connect the same Wi‑Fi as your Mac (or use tunnel)
3. From this folder:

```bash
npm start
```

4. Scan the QR code in Expo Go, or press `a` for Android if USB debugging is set up

## Folder structure

```
src/
  app/                 # Expo Router screens (routes only)
    _layout.tsx
    index.tsx
    welcome.tsx
  components/
    welcome/           # UI pieces for welcome flow
  constants/
    theme.ts
  assets/images/
```

Native splash is configured in `app.json` via `expo-splash-screen`.
The first in-app screen is `welcome` (Get Started).
