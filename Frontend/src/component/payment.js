import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { orderId } = useParams();
  const [data, setData] = useState([]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const url = `https://localhost:7249/api/Pay/${orderId}`;
      const result = await fetch(url, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await result.json();
      console.log(jsonData);
      setData(jsonData);
      // Navigate to the success page with state
      navigate('/success', { state: { data: jsonData } });
      console.log(result);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <p><strong>Total Cost:</strong> 10000</p>
      <p><strong>Order ID:</strong> {orderId}</p>
      <form className="payment-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="Nameofvisa">Name of visa ID:</label>
          <input
            type="text"
            id="Nameofvisa"
            name="Nameofvisa"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberofvisa">Visa ID:</label>
          <input
            type="text"
            id="numberofvisa"
            name="numberofvisa"
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit">Payment</button>
      </form>
    </div>
  );
}

export default Payment;
