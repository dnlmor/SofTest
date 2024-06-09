import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import itemService from '../../services/itemService';
import './ItemView.css';

function ItemView() {
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    itemService.getItemById(id).then(data => setItem(data));
  }, [id]);

  return (
    <div className="item-view">
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
}

export default ItemView;
