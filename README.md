# Rozicoin Telegram Web App Frontend

Frontend prototype for a Telegram Web App crypto payment client. The demo is inspired by mobile wallet patterns and includes Telegram-aware navigation, auth, passcode setup, and a KYC-gated wallet onboarding flow.

## Run locally

Open `index.html` in a browser. The app is a dependency-free static frontend, so no install step is required for the demo.

For a local review URL, run:

```bash
npm start
```

Then open `http://127.0.0.1:5174`.

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

## Notes

The prototype uses mock data only. It is ready for team review as a frontend demo and can later be migrated into React/Vite or connected to Telegram WebApp SDK events.
