import React, { useState, useEffect } from 'react';

const MyOrderList = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        // Make a GET request to your backend API to fetch my orders
        const response = await fetch('http://localhost:5050/api/order/allneworder');

        if (response.ok) {
          const fetchedMyOrders = await response.json();
          setMyOrders(fetchedMyOrders);
        } else {
          console.error('Error fetching my orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {myOrders.map((order) => (
            <li key={order._id}>
              <p>Product Name: {order.product_name}</p>
              <p>Status: {order.status}</p>
              <p>Description: {order.description}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrderList;
