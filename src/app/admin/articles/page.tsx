'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiPlus, FiFilter, FiSearch } from 'react-icons/fi';

// Mock data for articles
const mockArticles = [
  { id: 1, title: 'ময়মনসিংহে নতুন শিল্প পার্ক স্থাপনের ঘোষণা', category: 'অর্থনীতি', status: 'published', date: '১০ মে, ২০২৩', author: 'আবদুল করিম', featured: true, trending: true },
  { id: 2, title: 'জাতীয় বিশ্ববিদ্যালয়ের পরীক্ষার সময়সূচী প্রকাশ', category: 'শিক্ষা', status: 'published', date: '৯ মে, ২০২৩', author: 'নাজমুল হাসান', featured: false, trending: false },
  { id: 3, title: 'ময়মনসিংহ বিভাগে নতুন সড়ক নির্মাণের উদ্বোধন', category: 'উন্নয়ন', status: 'published', date: '৮ মে, ২০২৩', author: 'সাবরিনা আক্তার', featured: true, trending: false },
  { id: 4, title: 'জাতীয় ক্রিকেট দলে ময়মনসিংহের তরুণ ক্রিকেটার', category: 'খেলাধুলা', status: 'published', date: '৭ মে, ২০২৩', author: 'মাহমুদুল হাসান', featured: false, trending: true },
  { id: 5, title: 'ময়মনসিংহে আন্তর্জাতিক সাংস্কৃতিক উৎসবের আয়োজন', category: 'সংস্কৃতি', status: 'draft', date: '৬ মে, ২০২৩', author: 'তানিয়া আহমেদ', featured: false, trending: false },
  { id: 6, title: 'ময়মনসিংহের ঐতিহাসিক স্থানগুলো সংরক্ষণের উদ্যোগ', category: 'ঐতিহ্য', status: 'draft', date: '৫ মে, ২০২৩', author: 'রাকিবুল ইসলাম', featured: false, trending: false },
  { id: 7, title: 'ময়মনসিংহে নতুন মেডিকেল কলেজ স্থাপনের সিদ্ধান্ত', category: 'স্বাস্থ্য', status: 'published', date: '৪ মে, ২০২৩', author: 'ফারহানা খান', featured: true, trending: true },
  { id: 8, title: 'ময়মনসিংহে কৃষি মেলার আয়োজন', category: 'কৃষি', status: 'published', date: '৩ মে, ২০২৩', author: 'আরিফুল ইসলাম', featured: false, trending: false },
];

export default function ArticlesManagement() {
  const [articles, setArticles] = useState(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);

  // Filter articles based on search term and filters
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'published' && article.status === 'published') ||
      (statusFilter === 'draft' && article.status === 'draft') ||
      (statusFilter === 'featured' && article.featured) ||
      (statusFilter === 'trending' && article.trending);
    
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(articles.map(article => article.category))];

  // Handle delete confirmation
  const confirmDelete = (id: number) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle actual deletion
  const deleteArticle = () => {
    if (articleToDelete) {
      setArticles(articles.filter(article => article.id !== articleToDelete));
      setShowDeleteModal(false);
      setArticleToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">নিউজ আর্টিকেল ম্যানেজমেন্ট</h1>
        <Link 
          href="/admin/articles/create" 
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="mr-2" /> নতুন আর্টিকেল
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="আর্টিকেল খুঁজুন..."
                className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <select
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">সব স্ট্যাটাস</option>
                <option value="published">প্রকাশিত</option>
                <option value="draft">ড্রাফট</option>
                <option value="featured">ফিচার্ড</option>
                <option value="trending">ট্রেন্ডিং</option>
              </select>
              <FiFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category === 'all' ? 'সব ক্যাটাগরি' : category}
                  </option>
                ))}
              </select>
              <FiFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">শিরোনাম</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ক্যাটাগরি</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">স্ট্যাটাস</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">তারিখ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">লেখক</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {article.title}
                          </div>
                          <div className="flex space-x-2 mt-1">
                            {article.featured && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                                ফিচার্ড
                              </span>
                            )}
                            {article.trending && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                                ট্রেন্ডিং
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {article.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'}`}>
                        {article.status === 'published' ? 'প্রকাশিত' : 'ড্রাফট'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {article.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          href={`/admin/articles/edit/${article.id}`}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          <FiEdit size={18} />
                        </Link>
                        <button 
                          onClick={() => confirmDelete(article.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    কোন আর্টিকেল পাওয়া যায়নি
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">আর্টিকেল ডিলিট করুন</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">আপনি কি নিশ্চিত যে আপনি এই আর্টিকেলটি ডিলিট করতে চান? এই অ্যাকশন অপরিবর্তনীয়।</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={deleteArticle}
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