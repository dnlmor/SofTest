import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import itemService from '../../services/itemService';
import './ItemCreate.css';

function ItemCreate() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await itemService.createItem(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className="item-create"> {/* Use the appropriate class */}
      <h1>Create Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <button className="create-button" type="submit">Create</button>
      </form>
    </div>
  );
}

export default ItemCreate;
