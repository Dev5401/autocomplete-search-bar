import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data?.products))
      .catch((error) => console.error(error));
  }, []);

  return products;
};
