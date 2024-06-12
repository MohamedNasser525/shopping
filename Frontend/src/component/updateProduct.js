import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function ProductFormUpdate() {
  // State to hold the form values
  
  const { id } = useParams();
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


    console.log(formdata);
    const result = await fetch(`https://localhost:7249/api/Items/update${id}`, {
        method: "PUT",
        body: JSON.stringify(formdata),
        headers: { "Content-Type": "application/json" },
        credentials: 'include' 
      });
      // Handle the result as needed
      navigate('/productlist');
    
  };
  

  

  return (
    <div className="product-form">
      <h2>update Product</h2>
      <form onSubmit={submitHandler}>
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
  );
}

export default ProductFormUpdate;
