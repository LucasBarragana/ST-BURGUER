import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

export const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
