# Rozicoin Telegram Web App Frontend

Frontend prototype for a Telegram Web App crypto payment client. The demo is inspired by mobile wallet patterns and includes Telegram-aware navigation, auth, passcode setup, and a KYC-gated wallet onboarding flow.

## Run locally

Install dependencies and start the Vite dev server:

```bash
npm install
npm run dev
```

Then open `http://127.0.0.1:5174`.

## Project structure

- `src/components` - shared UI, layout, intro, and app shell components
- `src/pages` - screen groups for auth, KYC, wallet, send, swap, activity, and settings
- `src/hooks` - app state, Telegram Web App setup, and motion preference hooks
- `src/services` - Telegram helpers and mock wallet data/services
- `src/data` - flow navigation and KYC constants
- `src/styles` - global design system and animation styles

## Current scope

- Telegram Mini App shell with fixed Back and Main Button behavior
- Auth start, terms/risk consent, passcode, and restore screens
- KYC intro, personal details, document type, document scan, selfie check, review, approved, and rejected states
- Verified wallet home with balance, quick actions, assets, and network selector
- Receive address screen with QR mock and copy feedback
- Send flow with recipient, amount, confirmation, success, and failure states
- Swap quote, confirmation, and success states
- Activity list, transaction detail, profile, security, limits, and support screens
- Light and dark theme toggle
- First-run launch animation, animated screen transitions, wallet micro-interactions, and reduced-motion support

## Notes

The prototype uses mock data only. It is ready for team review as a frontend demo and can later be migrated into React/Vite, Remotion-style timeline components, or connected to Telegram WebApp SDK events.
