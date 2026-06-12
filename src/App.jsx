import { useState, useMemo, useEffect, useRef } from 'react';
import { debounce } from './utils/debounce';
import { filterSuggestions } from './utils/filterSuggestions';

const App = ({ placeholder, suggestions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results = filterSuggestions({ query, suggestions });
  const containerRef = useRef(null);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setQuery(value);
        setIsOpen(true);
      }, 1000),
    [],
  );

  const handleSelect = (item) => {
    setQuery(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className='relative'>
      <input
        className='p-2 w-full border-b border-gray-200 focus:outline-none'
        type='text'
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder={placeholder}
      />
      {isOpen && results.length > 0 && (
        <ul className='absolute w-full bg-white border border-gray-200 rounded shadow-md'>
          {results.map((item) => (
            <li
              key={item}
              onMouseDown={() => handleSelect(item)}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100'
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
