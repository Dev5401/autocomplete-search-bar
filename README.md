# Autocomplete Search Bar

A lightweight React autocomplete search component built with Vite, Tailwind CSS v4, and Vitest.

---

## Project Structure

```
src/
├── assets/
│   └── suggestions.json       # Static list of suggestions
├── utils/
│   ├── debounce.js            # Debounce utility
│   └── filterSuggestions.js   # Pure filter function
├── App.jsx                    # Autocomplete component
├── main.jsx                   # Entry point
└── index.css                  # Tailwind import
```

---

## Getting Started

```bash
npm install
npm run dev
```

---

## How It Works

`main.jsx` passes a `suggestions` array and a `placeholder` string into `App.jsx`:

```jsx
<App
  placeholder="Search..."
  suggestions={suggestions}
/>
```

`App.jsx` debounces the input, filters suggestions via `filterSuggestions`, and shows a dropdown of matches.

**Debounce** — the input change is debounced by 1000ms before updating `query`, so `filterSuggestions` isn't called on every keystroke.

**Dropdown** — opens when there are matching results, closes when clicking outside or selecting an item. Uses `onMouseDown` instead of `onClick` on list items to prevent the input's blur event from closing the dropdown before the selection registers.

---

## Utils

### `filterSuggestions({ query, suggestions })`

Pure function. Returns suggestions that start with or exactly match the query (case-insensitive). Returns an empty array when the query is empty or whitespace only.

### `debounce(fn, delay)`

Returns a debounced version of `fn` that waits `delay` ms after the last call before executing.

---

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm test             # Run tests in watch mode
npm run test:run     # Single test run (CI)
```

---

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)