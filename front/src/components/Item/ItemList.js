import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import ItemList from '../ItemList';

jest.mock('axios');

test('fetches and displays items', async () => {
  const items = [
    { _id: '1', name: 'Item 1' },
    { _id: '2', name: 'Item 2' },
  ];
  axios.get.mockResolvedValue({ data: items });

  render(<ItemList />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('Item 1')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('Item 2')).toBeInTheDocument());
});
