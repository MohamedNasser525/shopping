import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ProductList() {
  // State to hold the fetched data
  const [data, setData] = useState([]);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const result = await fetch("https://localhost:7249/api/Items/view", {
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

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`https://localhost:7249/api/Items/Delete/${itemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        // Remove the deleted item from the state
        setData(prevData => prevData.filter(item => item.id !== itemId));
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function when component mounts (init)
  }, []);

  return (
<div className="page">
  <div className="left-section">
    <h2>Product List</h2>
    <ul className="product-list-container">
      {data.map(dat => (
        <li key={dat.id} className="product-item">
          <div className="product-info">
            <h3>{dat.name}</h3>
            <p>Price: ${dat.cost}</p>
          </div>
          <div className="product-actions">
            <button onClick={() => handleDeleteItem(dat.id)}>Delete product</button>
            <Link to={`/update-product/${dat.id}`}>
              <button>Update product</button>
            </Link>
          </div>
        </li>
      ))}
    </ul>
    <Link to="/add-product">
      <button>Add Product</button>
    </Link>
  </div>
</div>

  );
}

export default ProductList;
