import React, { useState } from 'react';

const DeleteProduct = ({ productId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await fetch(`http://localhost:8080/api/product/ ${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Product deleted successfully');
        // Handle success, e.g., redirect or show a success message
      } else {
        const error = await response.json();
        console.error('Error deleting product:', error);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Product'}
      </button>
    </div>
  );
};

export default DeleteProduct;
