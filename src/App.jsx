import { useState } from 'react';
import { debounce } from './utils/debounce';

const App = ({ placeholder, suggestions }) => {
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setResults([]);
    } else {
      const filtered = suggestions.filter(
        (item) =>
          item.toLowerCase().startsWith(query.toLowerCase()) ||
          item.toLowerCase() === query.toLowerCase(),
      );
      setResults(filtered);
    }
  };

  const debouncedSearch = debounce(handleSearch, 1000);

  return (
    <div>
      <input
        type='text'
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder={placeholder}
      />
      <ul>
        {results.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
