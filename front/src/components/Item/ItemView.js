import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import ItemView from '../ItemView';

jest.mock('axios');

test('fetches and displays item details', async () => {
  const item = { _id: '1', name: 'Item 1', description: 'Description 1', price: '10' };
  axios.get.mockResolvedValue({ data: item });

  render(<ItemView match={{ params: { id: '1' } }} />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('Item 1')).toBeInTheDocument());
  expect(screen.getByText('Description 1')).toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
});
