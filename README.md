# NightSwipe – Couples Night Out Picker

NightSwipe helps two people decide where to go by swiping through nearby venue cards and keeping track of the places they both like. This repo hosts the Expo/React Native app that powers the MVP experience.

## Features
- Landing → Swipe Deck → Result flow scaffolded with Expo Router.
- Dual-user simulation so you can toggle between "User A" and "User B" while testing.
- Tinder-style cards with mock venue data (photo, rating, price, address).
- Shared shortlist logic that will grow into the final aggregation flow in Phase 3.

> **Status:** Phase 2 polish in progress. Live data (Google Places) is not wired up yet, so everything runs against bundled mock data.

## Prerequisites
- **Node.js** ≥ 20.11 (Expo recommends 20.19.0+; use [nvm](https://github.com/nvm-sh/nvm) if you need to switch versions).
- **npm** (ships with Node) or **pnpm/yarn** if you prefer—examples below use npm.
- **Expo Go** app installed on the iOS App Store or Google Play Store for on-device preview.

## Quick Start
1. **Clone** the repository:
   ```bash
   git clone https://github.com/<your-org>/NightSwipeMVP.git
   cd NightSwipeMVP/app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment variables (optional for mock data):**
   - Copy `.env.example` to `.env` if you plan to experiment with API keys later.
   - For the current mock build you can leave `.env` empty or skip this step entirely.
4. **Start the Expo dev server:**
   ```bash
   npm start
   ```
   Pick the `tunnel` option in the CLI (or run `npx expo start --tunnel`) if testers are on a different network.
5. **Open in Expo Go:**
   - Scan the QR code from the terminal/browser tab using the Expo Go app.
   - The app should load automatically with the mock venue deck ready to swipe.

## Common npm Scripts
| Script | Description |
| --- | --- |
| `npm start` | Launch Expo dev server (interactive menu for tunnel/LAN options). |
| `npm run ios` / `npm run android` | Start Expo targeting the iOS Simulator or Android emulator. |
| `npm run web` | Launch the web version (experimental). |
| `npm run type-check` | Run TypeScript type checking without emitting files. |
| `npm run lint` | Lint the project with ESLint/Prettier rules. |

## Directory Highlights
```
NightSwipeMVP/
├── app/                # Expo project root (open this folder in your editor)
│   ├── app/            # Expo Router routes
│   ├── components/     # Reusable UI components (SwipeCard, UserToggle, etc.)
│   ├── constants/      # Theme tokens and shared style values
│   ├── data/           # Mock venue data used during Phase 2
│   ├── hooks/          # Custom hooks (swipe state, venues, etc.)
│   └── assets/         # App icons, wordmark, shared media drop-zone
└── README.md           # You are here
```

## Troubleshooting
- **Expo can’t find Metro bundler / stuck on 60%:** stop the dev server and rerun `npm start -- --tunnel` to refresh the connection.
- **White screen in Expo Go:** clear the Expo Go cache (shake device → `Reload` or `Reset cache`) and make sure your Node version meets the requirement.
- **Type errors after pulling changes:** run `npm install` to ensure dependencies match the lockfile, then `npm run type-check`.

## Contributing / Next Steps
- Phase 3 will introduce aggregation logic and a final decision screen.
- Google Places integration (Phase 4) will require filling out the `.env` file with API keys and enabling location permissions.
- If you make changes, follow Conventional Commit messages (`feat:`, `fix:`, `chore:`) and run lint/type-check before opening a PR.

Enjoy NightSwipe! Share the repo, scan the QR code, and start swiping.
