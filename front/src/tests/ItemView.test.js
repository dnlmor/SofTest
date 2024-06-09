import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ItemView from '../components/Item/ItemView';
import itemService from '../services/itemService';

jest.mock('../services/itemService');

test('renders item details', async () => {
  itemService.getItemById.mockResolvedValue({
    _id: '1',
    name: 'Item 1',
    description: 'Description 1',
    price: '100',
  });

  const { getByText } = render(
    <MemoryRouter initialEntries={['/view/1']}>
      <Route path="/view/:id" component={ItemView} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText(/item 1/i)).toBeInTheDocument();
    expect(getByText(/description 1/i)).toBeInTheDocument();
    expect(getByText(/100/i)).toBeInTheDocument();
  });
});
