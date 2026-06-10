import { useState, useEffect } from 'react';
import { useProducts } from './hooks/useProducts';

function App() {
  const products = useProducts();

  const handleSearch = (query) => {};

  return (
    <div>
      <h1>Products</h1>
      <input type='text' onChange={(e) => handleSearch(e.target.value)} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
