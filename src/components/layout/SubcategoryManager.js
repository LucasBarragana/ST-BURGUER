'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";

export default function SubcategoryManager() {
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editedSubcategory, setEditedSubcategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(data => setCategories(data));
    fetch('/api/subcategories').then(res => res.json()).then(data => setSubcategories(data));
  }, []);

  async function handleSubcategorySubmit(ev) {
    ev.preventDefault();
    const data = { name: subcategoryName, categoryId: selectedCategory };
    if (editedSubcategory) {
      data._id = editedSubcategory._id;
    }

    const response = await fetch('/api/subcategories', {
      method: editedSubcategory ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(editedSubcategory ? 'Subcategory updated' : 'Subcategory created');
      setSubcategoryName('');
      setSelectedCategory('');
      setEditedSubcategory(null);
      fetch('/api/subcategories').then(res => res.json()).then(data => setSubcategories(data));
    } else {
      toast.error('Error, sorry...');
    }
  }

  async function handleDeleteClick(_id) {
    const response = await fetch('/api/subcategories?_id=' + _id, {
      method: 'DELETE',
    });

    if (response.ok) {
      toast.success('Deleted');
      fetch('/api/subcategories').then(res => res.json()).then(data => setSubcategories(data));
    } else {
      toast.error('Error');
    }
  }

  return (
    <div className="mt-8 mx-auto">
      <form onSubmit={handleSubcategorySubmit}>
        <div>
          <label>
            {editedSubcategory ? 'Update subcategory' : 'New subcategory name'}
            {editedSubcategory && `: ${editedSubcategory.name}`}
          </label>
          <input
            type="text"
            value={subcategoryName}
            onChange={ev => setSubcategoryName(ev.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={ev => setSelectedCategory(ev.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categories?.length > 0 ? (
              categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>
        <button type="submit">
          {editedSubcategory ? 'Update' : 'Create'}
        </button>
        {editedSubcategory && (
          <button
            type="button"
            onClick={() => {
              setEditedSubcategory(null);
              setSubcategoryName('');
              setSelectedCategory('');
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <div>
        <h2 className="mt-8 mb-8 text-sm text-gray-500">Existing subcategories</h2>
        {subcategories?.length > 0 ? (
          subcategories.map(subcategory => (
            <div className="border-b border-primary py-2 flex justify-between" key={subcategory._id}>
              <div className="flex gap-2 items-center">{subcategory.name} (Category: {subcategory.categoryId.name})</div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditedSubcategory(subcategory);
                    setSubcategoryName(subcategory.name);
                    setSelectedCategory(subcategory.categoryId._id);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(subcategory._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No subcategories found</p>
        )}
      </div>
    </div>
  );
}
