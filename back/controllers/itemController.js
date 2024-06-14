const Item = require('../models/itemModel');

async function getNanoid() {
  const { nanoid } = await import('nanoid');
  return nanoid;
}

exports.createItem = async (req, res) => {
  try {
    const nanoid = await getNanoid();
    const itemData = { ...req.body, hash: nanoid() };
    const newItem = new Item(itemData);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.readItem = async (hash) => {
  try {
    if (!hash) {
      throw new Error('Invalid item id');
    }

    return await Item.findOne({ hash });
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.updateItemHash = async (hash) => {
  try {
    if (!hash) {
      throw new Error('Incomplete arguments');
    }

    const item = await Item.findOne({ hash });
    if (!item) {
      throw new Error('Item not found');
    }

    const nanoid = await getNanoid();
    item.hash = nanoid();

    return await item.save();
  } catch (err) {
    return Promise.reject(err);
  }
};
