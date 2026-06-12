import { useState, useMemo } from 'react';
import { debounce } from './utils/debounce';
import { useSearch } from './hooks/useSearch';

const App = ({ placeholder, suggestions }) => {
  const [query, setQuery] = useState('');
  const results = useSearch({ query, suggestions });
  
  const debouncedSearch = useMemo(
    () => debounce((value) => setQuery(value), 1000),
    []
  );

  return (
    <div>
      <input
        className='p-4'
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
