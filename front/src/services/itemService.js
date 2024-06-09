import axios from '../api/axios';

const API_URL = '/api/items';

const itemService = {
  async getItems() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching items: ${error.message}`);
    }
  },

  async getItemById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching item by ID: ${error.message}`);
    }
  },

  async createItem(item) {
    try {
      const response = await axios.post(API_URL, item, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error creating item: ${error.message}`);
    }
  },

  async updateItem(id, item) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, item, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating item: ${error.message}`);
    }
  },

  async deleteItem(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting item: ${error.message}`);
    }
  }
};

export default itemService;
