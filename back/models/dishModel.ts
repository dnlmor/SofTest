import mongoose, { Document, Schema } from 'mongoose';

export interface IDish extends Document {
  name: string;
  price: number;
  ingredients: string[];
  stock: number;
}

const dishSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} cannot be empty'],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

function arrayLimit(val: string[]): boolean {
  return val.length > 0;
}

export default mongoose.model<IDish>('Dish', dishSchema);
