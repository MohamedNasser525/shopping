import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function OrderCreatePage() {
  const [data, setData] = useState([]);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const result = await fetch("https://localhost:7249/api/Order/creat order", {
        method: 'GET',
        credentials: 'include'
      });
      const jsonData = await result.json();
      //console.log(jsonData);
      setData(jsonData);
      // console.log(data.orderId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreateOrder = () => {
    fetchData(); // Call fetchData function when the button is clicked
    // console.log(data.orderId);
};

    useEffect(() => {
        fetchData(); // Call the fetchData function when component mounts
    }, []);



    return (
      <div className="order-container fadeIn">
      <h1>Welcome to the Order Page</h1>
      {data && (
        <Link to={`/product-order/${data.orderId}`}>
          <button onClick={handleCreateOrder}>Create Order</button>
        </Link>
      )}
    </div>
    );
}

export default OrderCreatePage;
