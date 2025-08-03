'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiCheck, FiX } from 'react-icons/fi';

// Mock data for categories
const mockCategories = [
  { id: 1, name: 'রাজনীতি', slug: 'politics', articleCount: 24 },
  { id: 2, name: 'খেলাধুলা', slug: 'sports', articleCount: 18 },
  { id: 3, name: 'অর্থনীতি', slug: 'economy', articleCount: 15 },
  { id: 4, name: 'আন্তর্জাতিক', slug: 'international', articleCount: 12 },
  { id: 5, name: 'শিক্ষা', slug: 'education', articleCount: 9 },
  { id: 6, name: 'বিনোদন', slug: 'entertainment', articleCount: 21 },
  { id: 7, name: 'প্রযুক্তি', slug: 'technology', articleCount: 14 },
  { id: 8, name: 'স্বাস্থ্য', slug: 'health', articleCount: 11 },
  { id: 9, name: 'জীবনযাপন', slug: 'lifestyle', articleCount: 8 },
  { id: 10, name: 'ধর্ম', slug: 'religion', articleCount: 7 },
];

export default function CategoriesManagement() {
  const [categories, setCategories] = useState(mockCategories);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete confirmation
  const confirmDelete = (id: number) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle actual deletion
  const deleteCategory = () => {
    if (categoryToDelete) {
      setCategories(categories.filter(category => category.id !== categoryToDelete));
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  // Handle adding new category
  const addCategory = () => {
    if (newCategoryName.trim() && newCategorySlug.trim()) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName.trim(),
        slug: newCategorySlug.trim(),
        articleCount: 0
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setNewCategorySlug('');
      setIsAddingCategory(false);
    }
  };

  // Handle edit category
  const startEditing = (category: typeof mockCategories[0]) => {
    setEditingCategory(category.id);
    setEditName(category.name);
    setEditSlug(category.slug);
  };

  const saveEdit = (id: number) => {
    if (editName.trim() && editSlug.trim()) {
      setCategories(categories.map(category =>
        category.id === id
          ? { ...category, name: editName.trim(), slug: editSlug.trim() }
          : category
      ));
      setEditingCategory(null);
    }
  };

  const cancelEdit = () => {
    setEditingCategory(null);
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    return slug;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ক্যাটাগরি ম্যানেজমেন্ট</h1>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="mr-2" /> নতুন ক্যাটাগরি
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <input
          type="text"
          placeholder="ক্যাটাগরি খুঁজুন..."
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add Category Form */}
      {isAddingCategory && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">নতুন ক্যাটাগরি যোগ করুন</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">নাম</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                value={newCategoryName}
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                  if (!newCategorySlug) {
                    setNewCategorySlug(generateSlug(e.target.value));
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">স্লাগ</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setIsAddingCategory(false);
                setNewCategoryName('');
                setNewCategorySlug('');
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              বাতিল
            </button>
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              disabled={!newCategoryName.trim() || !newCategorySlug.trim()}
            >
              যোগ করুন
            </button>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">নাম</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">স্লাগ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">আর্টিকেল সংখ্যা</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingCategory === category.id ? (
                        <input
                          type="text"
                          className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingCategory === category.id ? (
                        <input
                          type="text"
                          className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                          value={editSlug}
                          onChange={(e) => setEditSlug(e.target.value)}
                        />
                      ) : (
                        <div className="text-sm text-gray-700 dark:text-gray-300">{category.slug}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">{category.articleCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingCategory === category.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveEdit(category.id)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          >
                            <FiCheck size={18} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditing(category)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => confirmDelete(category.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            disabled={category.articleCount > 0}
                            title={category.articleCount > 0 ? 'এই ক্যাটাগরিতে আর্টিকেল আছে' : ''}
                          >
                            <FiTrash2 size={18} className={category.articleCount > 0 ? 'opacity-50 cursor-not-allowed' : ''} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    কোন ক্যাটাগরি পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">ক্যাটাগরি ডিলিট করুন</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">আপনি কি নিশ্চিত যে আপনি এই ক্যাটাগরিটি ডিলিট করতে চান? এই অ্যাকশন অপরিবর্তনীয়।</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={deleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                ডিলিট
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}