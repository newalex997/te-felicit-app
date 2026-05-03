# Mesaje din Suflet — Mobile App

Expo / React Native app (bundle ID: `com.pipedigital.mesajedinsuflet`). Generates AI greeting cards with customisable text and background images.

## Stack

- **Expo** ~54 / **expo-router** ~6 (file-based routing, 3 screens)
- **React Native** 0.81 / **React** 19
- **styled-components/native** for all UI styling
- **react-native-reanimated** ~4 + **react-native-gesture-handler** ~2.28 for animations and gestures
- **i18n-js** for translations (en / ro / ru / it)
- **AsyncStorage** for persistence (saved cards + locale)
- **expo-constants** for reading `expoConfig.version`

## Project Structure

```
app/
  _layout.tsx          Root layout — fonts, providers, offline gate
  index.tsx            Main screen (mood picker → card → actions)
  saved.tsx            Saved cards list
  settings.tsx         Language chooser + app info

components/
  GreetingCard.tsx     Animated card shell; owns image fade animation
  ActionButtons.tsx    "Try Another" + "Share" buttons
  MoodPicker.tsx       Horizontal scrollable pill selector
  CardImageButtons.tsx Save + refresh-image buttons (overlaid on card)
  CardFont/
    index.tsx          Orchestrates position groups + edit overlay
    CardFontContext.tsx Local context: which block is in edit mode
    CardFontButtons.tsx Font / color / effect / align / size toolbar
    TextBlockItem.tsx  Renders a single text block via DraggableText
    DraggableText.tsx  Pan + tap gesture wrapper around text
    TextEditOverlay.tsx Modal TextInput + keyboard-aware toolbar
    FontSizeSlider.tsx  Custom tapered pan-gesture slider
    StrokeText.tsx      Outline text via 8 offset shadow layers
    ColorCircleIcon.tsx 4-quadrant color circle icon
    useTextElementState.ts  Shared values for position + font size
    useTextGestures.ts      Pan + tap gesture composition
  LanguageChooser.tsx  Language list in Settings
  OfflineScreen.tsx    Full-screen offline placeholder
  Watermark.tsx        Bottom-right branding overlay

context/
  GreetingContext.tsx  Master state: texts, imageUrl, mood, holiday,
                       focused block, refresh/restore/cycle actions
  SavedCardsContext.tsx AsyncStorage-backed saved cards list
  ShareContext.tsx     react-native-view-shot capture + expo-sharing
  I18nContext.tsx      Locale state, setLocale, t()
  useTextBlockState.ts Per-block state: font, color, effect, align, size
                       + Reanimated fade animation

hooks/
  useAppFonts.ts       Loads all 7 Google font families; returns boolean
  useCardSwipe.ts      Swipe-out + spring-back card animation
  useNetworkStatus.ts  Polls expo-network every 5 s with change guard

api/
  client.ts            fetch wrapper; injects Accept-Language header
  greeting.ts          greetingApi: getGreeting / getMessage / getImage / getMoods
  Api.ts               Auto-generated from OpenAPI spec (run: npm run generate:api)

styles/
  screen.styles.ts     Shared Container / Header / BackButton / Title
                       (used by saved.styles + settings.styles)
  index.styles.ts      Main screen styled components
  saved.styles.ts      Saved screen (re-exports from screen.styles)
  settings.styles.ts   Settings screen (re-exports from screen.styles)
  languageChooser.styles.ts

constants/
  gradients.ts         UNUSED — safe to delete

i18n/
  index.ts             I18n instance, detectLocale, resolveLocale
  locales/             en.json  ro.json  ru.json  it.json
```

## Key Patterns

### Styling
- All styles in `styled-components/native`; never inline styles in JSX except for dynamic values that must be computed at render time.
- Theme tokens live in `theme.ts` — always prefer `theme.colors.*`, `theme.space.*`, `theme.radii.*` over hardcoded hex/px values.
- Screen-level shared primitives live in `styles/screen.styles.ts` (Container, Header, BackButton, Title).
- Import styles with `{ styled } from "styled-components/native"` (named export), not the default export.

### Imports
- All imports use relative paths (`../`, `./`). No `@/` alias — it's not reliably configured across Metro + TypeScript.

### State management
- No Redux / Zustand. Pure React context.
- `GreetingContext` is the single source of truth for the card state.
- `useTextBlockState` manages per-block font/color/effect/align/size + Reanimated fade.
- `useTextElementState` manages per-block drag position + animated font size (Reanimated shared values).
- Context values passed down include stable `useCallback`-wrapped functions where possible.

### Animations
- `react-native-reanimated` for all animations. `useSharedValue` + `useAnimatedStyle` pattern.
- `react-native-gesture-handler` for pan/tap via `Gesture.*` composition.

### Text blocks
- Two blocks: `"slogan"` and `"message"` (type `TextBlockId`).
- Position is one of 9 grid values (`top-left`, `center`, `bottom-right`, etc.) from the API.
- `DraggableText` is the leaf renderer; `TextBlockItem` wraps it with layout measurement.
- Editing a block opens `TextEditOverlay` (full-screen modal with `TextInput`).

### i18n
- Keys defined in all four `locales/*.json` files.
- Current keys: tryAnother, loading, share, sharing, holidaysLabel, moodsLabel, offlineTitle, offlineSubtitle, save, settings, language, appInfo, version, savedCards, noSavedCards, delete.
- `t()` is obtained from `useI18n()` hook; locale auto-detected from device, user-overridable, persisted in AsyncStorage.

### API
- Base URL hardcoded in `api/client.ts`.
- `Api.ts` is auto-generated — never edit by hand; run `npm run generate:api` to regenerate.
- `greetingApi.getMoods()` re-fetches on locale change (labels are locale-aware from the server).

### Persistence
- `@mesajedinsuflet/saved_cards` key in AsyncStorage — array of `SavedCard`.
- `@locale` key in AsyncStorage — `SupportedLocale` string.

## Things to Watch

- `constants/gradients.ts` is dead code — never imported. Delete it.
- Version string is read from `Constants.expoConfig?.version` (expo-constants), not hardcoded.
- `useNetworkStatus` uses a functional setState updater to avoid re-renders when connectivity is unchanged.
- `blockToConfig` in `GreetingContext.tsx` is a module-level pure function (not inside the component).
- `POSITION_STYLES` lookup table in `CardFont/index.tsx` maps position strings to flex styles.
- `StrokeText` renders 8 offset copies of text to simulate a stroke/outline effect — intentional, not a bug.
