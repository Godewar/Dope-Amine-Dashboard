// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const ProductList = () => {
//     const [products, setProduct] = useState([]);

//     useEffect(() => {
//         getProducts();
//     }, [])


//     // Get Product - API Integration
//     const getProducts = async () => {
//         let result = await fetch("http://localhost:8080//api/product/newproduct", {
//             headers: {
//                 authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
//             }
//         });
//         result = await result.json();
//         setProduct(result);
//     }


//     // Delete Product - API Integration
//     const deleteProduct = async (id) => {
//         let result = await fetch(`http://localhost:8080/product/${id}`, {
//             method: "Delete",
//             headers: {
//                 authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
//             }
//         });
//         result = await result.json();
//         if (result) {
//             getProducts();
//         }
//     }


//     // Search Product - API Integration
//     const searchHandle = async (event) => {
//         let key = event.target.value;
//         if (key) {
//             let result = await fetch(`http://localhost:5000/search/${key}`, {
//                 headers: {
//                     authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
//                 }
//             });
//             result = await result.json();
//             if (result) {
//                 setProduct(result);
//             }
//         }
//         else {
//             getProducts();
//         }
//     }


//     return (
//         <div className="product-list">
//             <h1>Products List</h1>
//             {/* Search Box */}
//             <input className="search-product-box" type="text" placeholder="Search Product" onChange={searchHandle} />
//             <ul>
//                 <li>S. No</li>
//                 <li>Name</li>
//                 <li>Color</li>
//                 <li>Price</li>
//                 <li>Quantity</li>
//                 <li>Size</li>
//                 <li>Description</li>
//                 <li>Image</li>
//             </ul>
//             {
//                 products.length ? products.map((item, index) =>
//                     <ul key={item._id}>
//                         <li>{index + 1}</li>
//                         <li>{item.product_name}</li>
//                         <li>$ {item.price}</li>
//                         <li>{item.color}</li>
//                         <li>{item.size}</li>
//                         <li>{item.longDescription}</li>
//                         <li>{item.image}</li>
//                         <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
//                             <button> <Link to={"/update/" + item._id}> Update </Link> </button>
//                         </li>
//                     </ul>
//                 )
//                     : <h1> No Result Found </h1>
//             }
//         </div>
//     )
// }

// export default ProductList;

import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/Demoproduct/allproduct');

        if (response.ok) {
          const fetchedProducts = await response.json();
          setProducts(fetchedProducts);
        } else {
          console.error('Error fetching products:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <p>Product Name:{product.product_name}</p>
              <p>Color: {product.color}</p>
              <p>Size: {product.size}</p>
              <p>Description: {product.description}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
