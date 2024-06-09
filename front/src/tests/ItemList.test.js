import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ItemList from '../components/Item/ItemList';
import itemService from '../services/itemService';

jest.mock('../services/itemService');

test('renders item list', async () => {
  itemService.getItems.mockResolvedValue([
    { _id: '1', name: 'Item 1' },
    { _id: '2', name: 'Item 2' },
  ]);

  const { getByText } = render(
    <MemoryRouter>
      <ItemList />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText(/item 1/i)).toBeInTheDocument();
    expect(getByText(/item 2/i)).toBeInTheDocument();
  });
});
