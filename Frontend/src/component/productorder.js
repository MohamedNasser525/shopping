import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProductOrder() {
  const { orderId } = useParams(); // Extract orderId from URL parameters

  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  //const [formdata, setFormData] = useState(new FormData());
  const fetchData = async () => {
    try {
      const result = await fetch("https://localhost:7249/api/Items/view", {
        method: 'GET',
        credentials: 'include'
      });
      const jsonData = await result.json();
      console.log(jsonData);
      setData(jsonData);
      const initialQuantities = {};
      jsonData.forEach(dat => {
        initialQuantities[dat.id] = 0;
      });
      console.log(jsonData);
      setQuantities(initialQuantities);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  

  const submitHandler = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
try {
  // Create FormData
  const formData = new FormData();

  // Populate FormData with ordered product IDs
  const orderedProductIds = [];
  Object.entries(quantities).forEach(([productId, quantity]) => {
    for (let i = 0; i < quantity; i++) {
      orderedProductIds.push(productId);
    }
  });
  orderedProductIds.forEach(productId => {
    formData.append('l', productId);
  });

  console.log(orderedProductIds);
  console.log(formData);

  // Construct URL
  const url = `https://localhost:7249/api/Order/make order/${orderId}`;

  console.log(formData)


  // Send request
  const result = await fetch(url, {
    method: "POST",
    credentials: 'include',
    body: formData // Send FormData directly
  });
  console.log(result);
  // Handle the result as needed
  // navigate('/productlist');
} catch (error) {
  console.error('Error adding product:', error);
}

  };


  useEffect(() => {
    fetchData();
   // console.log(orderId);
  }, []);

  useEffect(() => {
    // Calculate total price whenever quantities change
    let totalPrice = 0;
    data.forEach(dat => {
      totalPrice += dat.cost * quantities[dat.id];
    });
    setTotalPrice(totalPrice);
  }, [quantities, data]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  };

  const handleCreateOrder = () => {
    // Logic to create order ID
    const orderedProductIds = [];
    Object.entries(quantities).forEach(([productId, quantity]) => {
      for (let i = 0; i < quantity; i++) {
        orderedProductIds.push(productId);
      }
    });
    console.log(orderedProductIds);
    console.log("Order created!");
  };

  return (
    <div className="page-wrapper">
  <div className="product-list-container">
    {/* Display orderId at the top */}
    <h2>Order ID: {orderId}</h2>
    
    <h2>Product List</h2>
    <ul className="product-list">
      {data.map(dat => (
        <li key={dat.id} className="product-item">
          <div className="product-info">
            <h3>{dat.name}</h3>
            <p>Price: ${dat.cost}</p>
          </div>
          <div className="product-actions">
            <input
              type="number"
              min="0"
              value={quantities[dat.id]}
              onChange={e => handleQuantityChange(dat.id, parseInt(e.target.value))}
            />
            <p>Subtotal: ${(dat.cost * quantities[dat.id]).toFixed(2)}</p>
          </div>
        </li>
      ))}
    </ul>
    
    <div className="button-container">
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <button onClick={submitHandler}>Make Order</button>
      <Link to={`/cart/${orderId}`}>
        <button>Go to Cart</button>
      </Link>
    </div>
  </div>
</div>


  );
}

export default ProductOrder;
