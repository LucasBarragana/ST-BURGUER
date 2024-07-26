// components/CategoriesPage.js
'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import SubcategoryManager from "@/components/layout/SubcategoryManager";
import { useProfile } from "@/components/UseProfile";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(categories => setCategories(categories));
  }, []);

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const data = { name: categoryName };
    if (editedCategory) {
      data._id = editedCategory._id;
    }

    const response = await fetch('/api/categories', {
      method: editedCategory ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(editedCategory ? 'Category updated' : 'Category created');
      setCategoryName('');
      setEditedCategory(null);
      fetch('/api/categories')
        .then(res => res.json())
        .then(categories => setCategories(categories));
    } else {
      toast.error('Error, sorry...');
    }
  }

  async function handleDeleteClick(_id) {
    const response = await fetch(`/api/categories?_id=${_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      toast.success('Deleted');
      fetch('/api/categories')
        .then(res => res.json())
        .then(categories => setCategories(categories));
    } else {
      toast.error('Error');
    }
  }

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData?.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 max-w-5xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="flex justify-between gap-10">
        <div className="w-1/2">
          <form className="mt-8" onSubmit={handleCategorySubmit}>
            <div className="flex gap-2 items-end">
              <div className="grow">
                <label>
                  {editedCategory ? 'Update category' : 'New category name'}
                  {editedCategory && (
                    <>: <b>{editedCategory.name}</b></>
                  )}
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={ev => setCategoryName(ev.target.value)}
                />
              </div>
              <div className="pb-2 flex gap-2">
                <button className="border border-primary" type="submit">
                  {editedCategory ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(null);
                    setCategoryName('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
          <div>
            <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
            <div className="mt-2">
              {categories?.length > 0 ? (
                categories.map(category => (
                  <div key={category._id} className="border-b border-primary py-2 flex justify-between">
                    <div className="flex gap-2 items-center">
                      {category.name}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditedCategory(category);
                          setCategoryName(category.name);
                        }}
                      >
                        Edit
                      </button>
                      <DeleteButton onClick={() => handleDeleteClick(category._id)} />
                    </div>
                  </div>
                ))
              ) : (
                <p>No categories found</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <SubcategoryManager categories={categories || []} />
        </div>
      </div>
    </section>
  );
}
