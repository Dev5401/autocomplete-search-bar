# AutocompleteSearchBar

A flexible, accessible React component for autocomplete search with keyboard navigation, async data support, and full TypeScript types.

---

## Installation

```bash
npm install autocomplete-search-bar
# or
yarn add autocomplete-search-bar
```

---

## Quick Start

```tsx
import { AutocompleteSearchBar } from 'autocomplete-search-bar';

const fruits = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Mango'];

export default function App() {
  return (
    <AutocompleteSearchBar
      suggestions={fruits}
      placeholder="Search fruits..."
      onSelect={(value) => console.log('Selected:', value)}
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `suggestions` | `string[] \| SuggestionItem[]` | `[]` | Static list of suggestions |
| `onFetchSuggestions` | `(query: string) => Promise<string[] \| SuggestionItem[]>` | — | Async function for dynamic suggestions |
| `onSelect` | `(value: string \| SuggestionItem) => void` | — | Called when a suggestion is selected |
| `onSearch` | `(query: string) => void` | — | Called when the user submits a search |
| `placeholder` | `string` | `"Search..."` | Input placeholder text |
| `minChars` | `number` | `1` | Minimum characters before suggestions appear |
| `debounceMs` | `number` | `300` | Debounce delay for `onFetchSuggestions` (ms) |
| `maxSuggestions` | `number` | `10` | Maximum number of suggestions shown |
| `highlightMatch` | `boolean` | `true` | Bolds the matching portion of each suggestion |
| `clearOnSelect` | `boolean` | `false` | Clears the input after a selection |
| `disabled` | `boolean` | `false` | Disables the input |
| `loading` | `boolean` | `false` | Shows a loading indicator in the dropdown |
| `className` | `string` | — | Custom class on the root element |
| `inputProps` | `React.InputHTMLAttributes<HTMLInputElement>` | — | Passed directly to the `<input>` element |

### SuggestionItem shape

```ts
interface SuggestionItem {
  label: string;   // Display text
  value: string;   // Value passed to onSelect
  meta?: string;   // Optional secondary text shown in the dropdown
}
```

---

## Examples

### Async / API-backed suggestions

```tsx
async function fetchUsers(query: string) {
  const res = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
  const users = await res.json();
  return users.map((u) => ({ label: u.name, value: u.id, meta: u.email }));
}

<AutocompleteSearchBar
  onFetchSuggestions={fetchUsers}
  onSelect={(item) => router.push(`/users/${item.value}`)}
  debounceMs={200}
  minChars={2}
  placeholder="Find a user..."
/>
```

### Controlled input

```tsx
const [query, setQuery] = useState('');

<AutocompleteSearchBar
  suggestions={suggestions}
  inputProps={{ value: query, onChange: (e) => setQuery(e.target.value) }}
  onSelect={(val) => {
    setQuery(val.label ?? val);
  }}
/>
```

### Custom styling

```tsx
<AutocompleteSearchBar
  suggestions={data}
  className="my-search"
  onSelect={handleSelect}
/>
```

```css
.my-search input {
  border: 2px solid #6c63ff;
  border-radius: 8px;
  padding: 10px 14px;
}

.my-search [role="listbox"] {
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

---

## Keyboard Navigation

| Key | Action |
|---|---|
| `↓` / `↑` | Move through suggestions |
| `Enter` | Select the highlighted suggestion or submit search |
| `Escape` | Close the dropdown |
| `Tab` | Close the dropdown and move focus |

---

## Accessibility

- Follows the [ARIA Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) (`role="combobox"`, `role="listbox"`, `aria-activedescendant`)
- Fully keyboard navigable
- Screen-reader announcements for suggestion count and selection
- Respects `prefers-reduced-motion`

---

## TypeScript

The package ships full TypeScript types. No `@types/` package needed.

```ts
import type { AutocompleteSearchBarProps, SuggestionItem } from 'autocomplete-search-bar';
```

---

## Browser Support

Chrome, Firefox, Safari, Edge — all evergreen versions.

---

## License

MIT