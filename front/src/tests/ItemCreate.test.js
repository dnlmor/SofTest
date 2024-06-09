import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ItemCreate from '../components/Item/ItemCreate';
import itemService from '../services/itemService';

jest.mock('../services/itemService');

test('creates a new item', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <ItemCreate />
    </MemoryRouter>
  );

  fireEvent.change(getByLabelText(/name/i), { target: { value: 'Test Item' } });
  fireEvent.change(getByLabelText(/description/i), { target: { value: 'Test Description' } });
  fireEvent.change(getByLabelText(/price/i), { target: { value: '100' } });

  fireEvent.click(getByText(/create/i));

  expect(itemService.createItem).toHaveBeenCalledWith({
    name: 'Test Item',
    description: 'Test Description',
    price: '100',
  });
});
