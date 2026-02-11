# Te Felicit

A mobile application that displays daily greeting cards — a background image with overlaid text relevant to the current day. The user can generate another variation or share the card as an image.

No login required. No ads. Just open and enjoy.

> MVP v1.0 — The goal is validation of usage and sharing behavior, not revenue.

## Features

- **Card of the day** — see a greeting card immediately on launch
- **Try another** — generate a new variation (limited to 3–5 per day)
- **Share** — share the current card as an image via system share sheet (WhatsApp, Viber, Telegram, gallery, etc.)

## Tech Stack

| Layer          | Technology                                          |
| -------------- | --------------------------------------------------- |
| Frontend       | React Native (Expo)                                 |
| Backend        | NestJS                                              |
| Database       | MySQL                                               |
| Infrastructure | DigitalOcean (hosting, CDN, S3-compatible storage)  |

**Platforms:** iOS, Android

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

Then open the app in a [development build](https://docs.expo.dev/develop/development-builds/introduction/), [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/), or [Expo Go](https://expo.dev/go).

This project uses [file-based routing](https://docs.expo.dev/router/introduction) — edit files inside the **app** directory to develop.

## Card Content

Each card is composed of:
- A **background image** tagged with a theme (morning, family, health, blessing, neutral)
- A **text message** generated from predefined templates using AI variation

Content rules:
- No repeated backgrounds or text within a configurable window
- No exact duplicates within the same day
- Text tone: simple, polite, emotionally neutral or positive
- Max text length: 120–180 characters
