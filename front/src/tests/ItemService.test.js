import itemService from '../services/itemService';

global.fetch = jest.fn();

test('gets items', async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue([{ _id: '1', name: 'Item 1' }]),
  });

  const items = await itemService.getItems();

  expect(items).toEqual([{ _id: '1', name: 'Item 1' }]);
  expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/items');
});

test('gets item by id', async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue({ _id: '1', name: 'Item 1' }),
  });

  const item = await itemService.getItemById('1');

  expect(item).toEqual({ _id: '1', name: 'Item 1' });
  expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/items/1');
});

test('creates item', async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue({ _id: '1', name: 'Item 1' }),
  });

  const newItem = { name: 'Item 1' };
  const item = await itemService.createItem(newItem);

  expect(item).toEqual({ _id: '1', name: 'Item 1' });
  expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/items', expect.objectContaining({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  }));
});

test('updates item', async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue({ _id: '1', name: 'Updated Item' }),
  });

  const updatedItem = { name: 'Updated Item' };
  const item = await itemService.updateItem('1', updatedItem);

  expect(item).toEqual({ _id: '1', name: 'Updated Item' });
  expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/items/1', expect.objectContaining({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedItem),
  }));
});

test('deletes item', async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue({ message: 'Item deleted' }),
  });

  const response = await itemService.deleteItem('1');

  expect(response).toEqual({ message: 'Item deleted' });
});
