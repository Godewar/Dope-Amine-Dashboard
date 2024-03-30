// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const UpdateProduct = () => {

//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [category, setCategory] = useState("");
//     const [company, setCompany] = useState("");
//     const [error, setError] = useState(false);
//     const params = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         getProductDetails();
//     }, [])


//     // Function for Showing Pre-Filled Data in the Form
//     const getProductDetails = async () => {
//         let result = await fetch(`http://localhost:5000/product/${params.id}`, {
//             headers: {
//                 authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
//             } 
//         });
//         result = await result.json();
//         setName(result.name);
//         setPrice(result.price);
//         setCategory(result.category);
//         setCompany(result.company);
//     }


//     // API Integration for Update Details of Product
//     const updateProduct = async () => {
//         if (!name || !price || !category || !company) {
//             setError(true);
//             return false;
//         }
//         let result = await fetch(`http://localhost:5000/product/${params.id}`, {
//             method: "Put",
//             body: JSON.stringify({ name, price, category, company }),
//             headers: {
//                 "Content-Type": "application/json",
//                 authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
//             }
//         });
//         result = await result.json();
//         navigate("/");
//         console.log(result);
//     }


//     return (
//         <div className="product">
//             <h1>Update Product Details</h1>
//             <input className="inputBox" type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} value={name} />
//             {error && !name && <span className="invalid-input" >Enter Valid Name</span>}

//             <input className="inputBox" type="text" placeholder="Enter Product Price" onChange={(e) => setPrice(e.target.value)} value={price} />
//             {error && !price && <span className="invalid-input" >Enter Valid Price</span>}

//             <input className="inputBox" type="text" placeholder="Enter Product Category" onChange={(e) => setCategory(e.target.value)} value={category} />
//             {error && !category && <span className="invalid-input" >Enter Valid Category</span>}

//             <input className="inputBox" type="text" placeholder="Enter Product Companmy" onChange={(e) => setCompany(e.target.value)} value={company} />
//             {error && !company && <span className="invalid-input" >Enter Valid Company</span>}

//             <button onClick={updateProduct} className="appButton" type="button">Update Product</button>
//         </div>
//     )
// }

// export default UpdateProduct;


import React, { useState, useEffect } from 'react';

const UpdateProduct = ({ productId }) => {
  const [productData, setProductData] = useState({
    product_name: '',
    color: '',
    size: '',
    description: '',
    quantity: 0,
    image: '',
    price: 0,
  });

  useEffect(() => {
    // Fetch the existing product data when the component mounts
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/product/ ${productId}`);
        if (response.ok) {
          const existingProduct = await response.json();
          setProductData(existingProduct);
        } else {
          console.error('Error fetching product data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/product/ ${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);
        // Handle success, e.g., redirect or show a success message
      } else {
        const error = await response.json();
        console.error('Error updating product:', error);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input
          type="text"
          name="product_name"
          value={productData.product_name}
          onChange={handleChange}
        />
      </label>

      <label>
        Color:
        <input
          type="text"
          name="color"
          value={productData.color}
          onChange={handleChange}
        />
      </label>

      <label>
        Size:
        <input
          type="text"
          name="size"
          value={productData.size}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
        />
      </label>

      <label>
        Image:
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleChange}
        />
      </label>

      <label>
        Price:
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
