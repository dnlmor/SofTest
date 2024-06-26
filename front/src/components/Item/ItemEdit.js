import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import ItemEdit from '../ItemEdit';

jest.mock('axios');

test('submits form and updates item', async () => {
  const fetchItems = jest.fn();
  const item = { _id: '1', name: 'Item 1', description: 'Description 1', price: '10' };
  axios.put.mockResolvedValue({});

  render(<ItemEdit item={item} fetchItems={fetchItems} />);

  fireEvent.change(screen.getByPlaceholderText(/name/i), {
    target: { value: 'Updated Item 1' },
  });
  fireEvent.change(screen.getByPlaceholderText(/description/i), {
    target: { value: 'Updated Description 1' },
  });
  fireEvent.change(screen.getByPlaceholderText(/price/i), {
    target: { value: '20' },
  });

  fireEvent.click(screen.getByText(/update item/i));

  expect(axios.put).toHaveBeenCalledWith(`/api/items/${item._id}`, {
    name: 'Updated Item 1',
    description: 'Updated Description 1',
    price: '20',
  });

  expect(fetchItems).toHaveBeenCalled();
});
