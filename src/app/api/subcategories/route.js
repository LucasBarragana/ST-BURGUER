// api/subcategories.js
import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Subcategory } from "@/models/Subcategory";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { name, categoryId } = await req.json();
  if (await isAdmin()) {
    const subcategoryDoc = await Subcategory.create({ name, categoryId });
    await Category.findByIdAndUpdate(categoryId, { $push: { subcategories: subcategoryDoc._id } });
    return new Response(JSON.stringify(subcategoryDoc), { status: 200 });
  } else {
    return new Response(JSON.stringify({}), { status: 403 });
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name, categoryId } = await req.json();
  if (await isAdmin()) {
    await Subcategory.updateOne({ _id }, { name, categoryId });
    return new Response(JSON.stringify(true), { status: 200 });
  }
  return new Response(JSON.stringify(false), { status: 403 });
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    const subcategory = await Subcategory.findById(_id);
    await Category.findByIdAndUpdate(subcategory.categoryId, { $pull: { subcategories: _id } });
    await Subcategory.deleteOne({ _id });
    return new Response(JSON.stringify(true), { status: 200 });
  }
  return new Response(JSON.stringify(false), { status: 403 });
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const subcategories = await Subcategory.find().populate("categoryId");
    return new Response(JSON.stringify(subcategories), { status: 200 });
  } else {
    return new Response(JSON.stringify([]), { status: 403 });
  }
}
