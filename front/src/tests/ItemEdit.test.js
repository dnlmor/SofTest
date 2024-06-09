import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ItemEdit from '../components/Item/ItemEdit';
import itemService from '../services/itemService';

jest.mock('../services/itemService');

test('edits an existing item', async () => {
  itemService.getItemById.mockResolvedValue({
    _id: '1',
    name: 'Existing Item',
    description: 'Existing Description',
    price: '200',
  });

  const { getByLabelText, getByText } = render(
    <MemoryRouter initialEntries={['/edit/1']}>
      <Route path="/edit/:id" component={ItemEdit} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByLabelText(/name/i).value).toBe('Existing Item');
    expect(getByLabelText(/description/i).value).toBe('Existing Description');
    expect(getByLabelText(/price/i).value).toBe('200');
  });

  fireEvent.change(getByLabelText(/name/i), { target: { value: 'Updated Item' } });
  fireEvent.change(getByLabelText(/description/i), { target: { value: 'Updated Description' } });
  fireEvent.change(getByLabelText(/price/i), { target: { value: '300' } });

  fireEvent.click(getByText(/update/i));

  expect(itemService.updateItem).toHaveBeenCalledWith('1', {
    name: 'Updated Item',
    description: 'Updated Description',
    price: '300',
  });
});
