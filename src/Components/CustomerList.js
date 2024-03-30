import React, { useState, useEffect } from 'react';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/customer/allcustomer');

        if (response.ok) {
          const fetchedCustomers = await response.json();
          setCustomers(fetchedCustomers);
        } else {
          console.error('Error fetching customers:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCustomers();
  }, []);

  return (
    <div>
      <h1>All Customers</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer._id}>
              <p>Name: {customer.name}</p>
              <p>Email: {customer.email}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;
