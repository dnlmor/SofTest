import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import ItemCreate from '../ItemCreate';

jest.mock('axios');

test('submits form and creates item', async () => {
  const fetchItems = jest.fn();
  axios.post.mockResolvedValue({});

  render(<ItemCreate fetchItems={fetchItems} />);

  fireEvent.change(screen.getByPlaceholderText(/name/i), {
    target: { value: 'Item 1' },
  });
  fireEvent.change(screen.getByPlaceholderText(/description/i), {
    target: { value: 'Description 1' },
  });
  fireEvent.change(screen.getByPlaceholderText(/price/i), {
    target: { value: '10' },
  });

  fireEvent.click(screen.getByText(/create item/i));

  expect(axios.post).toHaveBeenCalledWith('/api/items', {
    name: 'Item 1',
    description: 'Description 1',
    price: '10',
  });

  expect(fetchItems).toHaveBeenCalled();
});
