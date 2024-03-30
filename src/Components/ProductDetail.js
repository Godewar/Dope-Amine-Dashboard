import React, { useState, useEffect } from 'react';

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/product/658048b9490ff9d334948c75`);

        if (response.ok) {
          const fetchedProduct = await response.json();
          setProduct(fetchedProduct);
        } else {
          console.error('Error fetching product:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

  return (
    <div>
      <h1>Product Details</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : product ? (
        <div>
          <p>Product Name: {product.product_name}</p>
          <p>Color: {product.color}</p>
          <p>Size: {product.size}</p>
          <p>Description: {product.description}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Image: {product.image}</p>
          <p>Price: {product.price}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
