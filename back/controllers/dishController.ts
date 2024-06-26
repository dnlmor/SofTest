import { Request, Response } from 'express';
import Dish from '../models/dishModel';

export const createDish = async (req: Request, res: Response): Promise<void> => {
  try {
    const dish = new Dish(req.body);
    const savedDish = await dish.save();
    res.status(201).json(savedDish);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDishes = async (req: Request, res: Response): Promise<void> => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDishById = async (req: Request, res: Response): Promise<void> => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      res.status(404).json({ message: 'Dish not found' });
      return;
    }
    res.status(200).json(dish);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDish = async (req: Request, res: Response): Promise<void> => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dish) {
      res.status(404).json({ message: 'Dish not found' });
      return;
    }
    res.status(200).json(dish);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDish = async (req: Request, res: Response): Promise<void> => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) {
      res.status(404).json({ message: 'Dish not found' });
      return;
    }
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
