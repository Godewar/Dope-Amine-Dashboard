// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddProduct = () => {

//     const [product_name, setProduct_name] = useState("");
//     const [color, setColor] = useState("");
//     const [size, setSize] = useState("")
//     const [price, setPrice] = useState("");
//     const [quantity, setQuantity] = useState("");
//     const [image, setImage] = useState("");
//     const [longDescription, setLongDescription] = useState("");
//     const [error, setError] = useState(false);
    
//     let navigate = useNavigate();

//     // API Integration
//     const handleaddProduct = async () => {

//         if (!product_name ||!color ||!quantity ||!size ||!image || !price || !longDescription) {
//             setError(true);
//             return false;
//         }

//         // const userId = JSON.parse(localStorage.getItem("user"))._id;
//         let result = await fetch("http://localhost:8080/api/product/newproduct", {
//             method: "post",
//             body: JSON.stringify({ product_name, color, size, longDescription, quantity, image, price }),
//             headers: {
//                 "Content-Type": "application/json",
//                 authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
//             },
//         });
//         result = await result.json();
//         navigate("/");
//     }


//     return (
//         <div className="product">
//             <h1>Add Product Details</h1>
//             <input className="inputBox" type="text" placeholder="Enter Product Name" onChange={(e) => setProduct_name(e.target.value)} value={product_name} />
//             {error && !product_name && <span className="invalid-input" >Enter Valid Name</span>}
//             <input className="inputBox" type="text" placeholder="Add Color" onChange={(e) => setColor(e.target.value)} value={color} />
//             {error && !color && <span className="invalid-input" >Add Color</span>}
//             <input className="inputBox" type="text" placeholder="set Size" onChange={(e) => setSize(e.target.value)} value={size} />
//             {error && !size && <span className="invalid-input" >Add Color</span>}


//             <input className="inputBox" type="text" placeholder="Enter Product Price" onChange={(e) => setPrice( e.target.value)} value={price} />
//             {error && !price && <span className="invalid-input" >Enter Valid Price</span>}

//             <input className="inputBox" type="text" placeholder="Enter Quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
//             {error && !quantity && <span className="invalid-input" >Enter Quantity</span>}
//             <input className="inputBox" type="text" placeholder="Add Image" onChange={(e) => setImage(e.target.value)} value={image} />
//             { error && !image && <span className="invalid-input" >Add image</span>}

//             <input className="inputBox" type="text" placeholder="Add Description" onChange={(e) => setLongDescription(e.target.value)} value={longDescription} />
//             { error && !longDescription && <span className="invalid-input" >Enter Description</span>}



//             <button onClick={handleaddProduct} className="appButton" type="button">Add Product</button>
//         </div>
//     )
// }

// export default AddProduct;



import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    product_name: '',
    color: '',
    size: '',
    description: '',
    quantity: 0,
    image: '',
    price: 0,
  });

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
      const response = await fetch('http://localhost:5050/api/Demoproduct/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product created:', result);
        // Handle success, e.g., redirect or show a success message
      } else {
        const error = await response.json();
        console.error('Error creating product:', error);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='productForm'>
      <label>
        Product Name:
        <input
   className="addBox"
  type="text"
   placeholder="Enter Product Name"
  name="product_name"
  onChange={handleChange}
  value={productData.product_name}
/>
      </label>

      <label>
        Color:
        <input
           className="addBox"
          type="text"
          name="color"
          value={productData.color}
          placeholder="Add Product Color"
          onChange={handleChange}
        />
      </label>

      <label>
        Size:
        <input
        placeholder="Enter Product Size"
        className="addBox"
          type="text"
          name="size"
          value={productData.size}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <input
         className="addBox"
          type="text"
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Add Product Description"
        />
      </label>

      <label>
        Quantity:
        <input
         className="addBox"
          type="number"
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
        />
      </label>

      <label>
        Image:
        <input
         className="addBox"
          type="text"
          name="image"
          value={productData.image}
          onChange={handleChange}
          placeholder="Add Product Image"
        />
      </label>

      <label>
        Price:
        <input
         className="addBox"
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Enter Product Price"
        />
      </label>

      <button className='newButton' type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddProduct;
