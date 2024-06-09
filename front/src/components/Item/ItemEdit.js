import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import itemService from '../../services/itemService';
import './ItemEdit.css';

function ItemEdit() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await itemService.getItemById(id);
        setItem(fetchedItem);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await itemService.updateItem(id, item);
      navigate('/');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="item-edit"> 
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={item.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={item.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" value={item.price} onChange={handleChange} />
        </div>
        <button className="update-button" type="submit">Update</button>
      </form>
    </div>
  );
}

export default ItemEdit;
