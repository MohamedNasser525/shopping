import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ProductForm() {
  // State to hold the form values
  

  const [formdata, setFormData] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { name, cost } = formdata;
      const url = `https://localhost:7249/api/Items/add?n=${encodeURIComponent(name)}&c=${encodeURIComponent(cost)}`;
      const result = await fetch(url, {
        method: "POST",
        credentials: 'include'
      });
      // Handle the result as needed
      navigate('/productlist');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  

  

  return (
    <div className="page2">
  <div className="left-section">
    <div className="login-box">
      <h2>Add a Product</h2>
      <form onSubmit={submitHandler} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Cost:</label>
          <input
            type="number"
            id="cost"
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
  );
}

export default ProductForm;
