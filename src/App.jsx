import { useState, useEffect } from 'react';
import { debounce } from './utils/debounce';

function App() {
  const [products, setProducts] = useState([]);

  const handleSearch = (query) => {
    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
    )
      .then((res) => res.json())
      .then((data) => setProducts(data?.products))
      .catch((error) => console.error(error));
  };

  const debouncedSearch = debounce(handleSearch, 500);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data?.products))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <input type='text' onChange={(e) => debouncedSearch(e.target.value)} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// user queries -> debounce will fetch title and display in dropdown
