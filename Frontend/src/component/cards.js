import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Cart() {
  const { orderId } = useParams();
  const [data, setData] = useState({ order: { items: [], totalcost: 0 } });

  const fetchData = async () => {
    try {
      const result = await fetch(`https://localhost:7249/api/Order/get my order/${orderId}`, {
        method: 'GET',
        credentials: 'include'
      });
      const jsonData = await result.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteItem = async (itemId, itemIndex) => {
    try {
      const response = await fetch(`https://localhost:7249/api/Order/Delete item from order/${orderId}?i=${itemId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Calculate the new total cost after removing the item
        const itemToRemove = data.order.items[itemIndex];
        const newTotalCost = data.order.totalcost - itemToRemove.cost;

        // Remove the deleted item from the state and update the total cost
        setData(prevData => ({
          ...prevData,
          order: {
            ...prevData.order,
            items: prevData.order.items.filter((_, index) => index !== itemIndex),
            totalcost: newTotalCost
          }
        }));
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts (init)
  }, []);

  return (
    <div className="cart-container">
      {data && data.order ? (
        <>
          <h2>Order ID: {data.order.id}</h2>
          <h3>Total Items: {data.order.items.length}</h3>
          <ul>
            {data.order.items.map((item, index) => (
              <li key={item.id}>
                <div className="cart-item">
                  <div>{item.name}</div>
                  <div>${item.cost}</div>
                  <button onClick={() => handleDeleteItem(item.id, index)}>Delete</button> 
                </div>
              </li>
            ))}
          </ul>
          <h3>Total Cost: ${data.order.totalcost}</h3>
          <Link to={`/payment/${orderId}`}><button className="payment-button">Proceed to Payment</button></Link>
        </>
      ) : (
        <p>No order data available</p>
      )}
    </div>
  );
}

export default Cart;
