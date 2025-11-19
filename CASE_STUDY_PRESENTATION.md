# Case Study Presentation — Product Management App

> Short: a 10–15 minute presentation describing goals, implementation, and outcomes.

---

## Slide 1 — Title

Product Management App

- Presenter: [Your Name]
- Role: Developer / PM
- Date: [MM/DD/YYYY]

Speaker notes: Briefly state the purpose: a small React Native Expo app to manage up to 5 products using Redux Toolkit and local storage.

---

## Slide 2 — TL;DR / Elevator Pitch

- What: Mobile app to create, edit, list, and persist up to 5 products.
- Why: Showcase end-to-end expo/react-native flow + Redux Toolkit state management.
- Outcome: Working Expo app with image picker, persistence and Toasts for UX.

Speaker notes: Keep it concise. Say what you built and why it matters to users or stakeholders.

---

## Slide 3 — Problem & Motivation

- Problem: Need a small demo app to manage product entries with images and persistent state.
- Constraints: Keep it simple (max 5 products), offline-first, cross-platform via Expo.

Speaker notes: Explain constraints and how they shaped architecture choices (Expo for fast iteration, Redux Toolkit for simple state).

---

## Slide 4 — Key Features

- Add / Edit / Delete product
- Upload or take product photos (expo-image-picker)
- Persist data via AsyncStorage
- Notifications via Toasts
- Responsive UI styled with project theme

Speaker notes: Call out core user flows and any UX design choices.

---

## Slide 5 — Architecture (high level)

- Frontend: Expo (React Native) app entry in `App.tsx`
- State: Redux Toolkit slice in `store/productSlice.ts`
- Persistence: `@react-native-async-storage/async-storage`
- Components: `ProductList`, `ProductCard`, `ProductForm`
- Native features: `expo-image-picker`

Image placeholder:

![Architecture diagram](assets/case_study/architecture.png)

Speaker notes: Walk through components and data flow: components -> Redux -> persistence.

---

## Slide 6 — Files of interest

- `App.tsx` — app entry
- `src/screens/HomeScreen.tsx` — main screen with list and add button
- `src/components/ProductForm.tsx` — product creation + image picker
- `src/store/productSlice.ts` — Redux Toolkit state + persistence logic
- `app.json` — Expo config

Speaker notes: Encourage reviewers to open these files during review.

---

## Slide 7 — Implementation details / snippets

- Redux Toolkit for predictable reducers and easy tests.
- AsyncStorage for persisting JSON state.
- `expo-image-picker` permission flow: request, pick/capture, save local uri.

Speaker notes: If you want, show a short code snippet from `productSlice` or the image-picker logic.

---

## Slide 8 — Tradeoffs & Edge Cases

- Limit to 5 products simplifies UX (no pagination/search).
- Image handling: storing URIs vs binary data — we store URIs to keep it simple.
- Concurrency: single-threaded app; no remote sync implemented.

Edge cases to test:
- Storage full / denied permissions
- Large images / memory
- Unexpected app termination during write

Speaker notes: Mention how you'd handle these for production (compression, background sync, server storage).

---

## Slide 9 — Results & Demo

- Demo: show adding, editing, deleting a product, picking an image, and restarting app to verify persistence.

Screenshots placeholders:

![Home screen](assets/case_study/screenshot-home.png)

![Add product](assets/case_study/screenshot-add.png)

Speaker notes: Walk the audience through the demo steps; keep it quick and focused.

---

## Slide 10 — Lessons Learned

- Expo accelerates iteration but requires version compatibility management.
- Redux Toolkit keeps state simple and testable.
- Small constraints (max 5 items) enabled quick UX decisions.

Speaker notes: Share personal takeaways and what you would do differently next time.

---

## Slide 11 — Next Steps

- Add remote sync (cloud backup / login)
- Improve image handling (compression + caching)
- Add better error handling and tests

Speaker notes: Concrete roadmap for further work.

---

## Slide 12 — Appendix / How to run locally

1. Install dependencies:

```bash
cd /Users/aremumoses/Documents/Github/Assessment
npm install
```

2. Start Expo dev server:

```bash
npm start
```

3. Open on device: scan QR in terminal or press `i` for iOS simulator or `a` for Android emulator (when available).

Notes: If you changed Expo SDK or package versions, run `npx expo doctor` to check mismatches.

---

## Slide 13 — Export / Printing instructions

macOS (quick):
- Open this file in VS Code or any Markdown viewer and Print -> Save as PDF.

Using Pandoc (better control):
- Install pandoc (and a TeX engine for best results):

```bash
brew install pandoc
brew install basictex   # or install MacTeX for full distribution
```

- Convert to PDF (using xelatex):

```bash
pandoc CASE_STUDY_PRESENTATION.md -o CASE_STUDY_PRESENTATION.pdf --from markdown -V geometry:margin=1in --pdf-engine=xelatex
```

Convert to HTML slides (reveal.js):

```bash
# generate a self-contained HTML slide deck (requires node/npm reveal or use CDN)
pandoc -t revealjs -s CASE_STUDY_PRESENTATION.md -o CASE_STUDY_PRESENTATION.html
```

Then open the HTML in Chrome and print to PDF for speaker-ready slides.

---

## Slide 14 — Contact / Q&A

- Contact: [Your email]
- Repo: (link) — point to this Git repo

Speaker notes: Invite questions and feedback.

---

*Replace image placeholders in `assets/case_study/` with real screenshots and diagrams before printing.*
