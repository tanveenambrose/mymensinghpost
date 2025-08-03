import mongoose, { Schema } from 'mongoose';
import { Category } from '@/types';

const CategorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.models.Category || mongoose.model<Category>('Category', CategorySchema);

export default CategoryModel;