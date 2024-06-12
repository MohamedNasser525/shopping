import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const data = location.state?.data;

  useEffect(() => {
    // Log the data when the component mounts
    console.log('Page initialized with data:', data);
  }, [data]);

  return (
    <div className="success-container">
      <h2>Payment Successful!</h2>
      {data ? (
        <div className="order-details">
          <p><strong>Order ID:</strong> {data.order.id}</p>
          <p><strong>Total Cost:</strong> {data.order.totalcost}</p>
          <p><strong>Status:</strong> {data.order.status}</p>
          <div>
            <h3>Items:</h3>
            <ul>
              {data.order.items.map((item) => (
                <li key={item.id}>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Cost:</strong> {item.cost}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Success;
