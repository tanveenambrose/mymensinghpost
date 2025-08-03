'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiFilter, FiSearch, FiCheck, FiX } from 'react-icons/fi';

// Mock data for users
const mockUsers = [
  { id: 1, name: 'আবদুল করিম', email: 'abdul@example.com', role: 'admin', status: 'active', joinDate: '১০ জানুয়ারি, ২০২৩' },
  { id: 2, name: 'নাজমুল হাসান', email: 'nazmul@example.com', role: 'editor', status: 'active', joinDate: '১৫ ফেব্রুয়ারি, ২০২৩' },
  { id: 3, name: 'সাবরিনা আক্তার', email: 'sabrina@example.com', role: 'author', status: 'active', joinDate: '২০ মার্চ, ২০২৩' },
  { id: 4, name: 'মাহমুদুল হাসান', email: 'mahmudul@example.com', role: 'author', status: 'inactive', joinDate: '৫ এপ্রিল, ২০২৩' },
  { id: 5, name: 'তানিয়া আহমেদ', email: 'tania@example.com', role: 'user', status: 'active', joinDate: '১২ মে, ২০২৩' },
  { id: 6, name: 'রাকিবুল ইসলাম', email: 'rakibul@example.com', role: 'user', status: 'active', joinDate: '১৮ জুন, ২০২৩' },
  { id: 7, name: 'ফারহানা খান', email: 'farhana@example.com', role: 'editor', status: 'inactive', joinDate: '২৫ জুলাই, ২০২৩' },
  { id: 8, name: 'আরিফুল ইসলাম', email: 'ariful@example.com', role: 'author', status: 'active', joinDate: '৩০ আগস্ট, ২০২৩' },
];

export default function UsersManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editRole, setEditRole] = useState('');
  const [editStatus, setEditStatus] = useState('');

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle delete confirmation
  const confirmDelete = (id: number) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle actual deletion
  const deleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  // Handle edit user
  const startEditing = (user: typeof mockUsers[0]) => {
    setEditingUser(user.id);
    setEditRole(user.role);
    setEditStatus(user.status);
  };

  const saveEdit = (id: number) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, role: editRole, status: editStatus }
        : user
    ));
    setEditingUser(null);
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ইউজার ম্যানেজমেন্ট</h1>
        <button
          onClick={() => window.location.href = '/admin/users/create'}
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="mr-2" /> নতুন ইউজার
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="ইউজার খুঁজুন..."
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
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">সব রোল</option>
                <option value="admin">অ্যাডমিন</option>
                <option value="editor">এডিটর</option>
                <option value="author">লেখক</option>
                <option value="user">ইউজার</option>
              </select>
              <FiFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">সব স্ট্যাটাস</option>
                <option value="active">সক্রিয়</option>
                <option value="inactive">নিষ্ক্রিয়</option>
              </select>
              <FiFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">নাম</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ইমেইল</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">রোল</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">স্ট্যাটাস</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">যোগদানের তারিখ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <select
                          className="p-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                        >
                          <option value="admin">অ্যাডমিন</option>
                          <option value="editor">এডিটর</option>
                          <option value="author">লেখক</option>
                          <option value="user">ইউজার</option>
                        </select>
                      ) : (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <select
                          className="p-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="active">সক্রিয়</option>
                          <option value="inactive">নিষ্ক্রিয়</option>
                        </select>
                      ) : (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                          {user.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingUser === user.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveEdit(user.id)}
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
                            onClick={() => startEditing(user)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => confirmDelete(user.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            disabled={user.role === 'admin'}
                            title={user.role === 'admin' ? 'অ্যাডমিন ডিলিট করা যাবে না' : ''}
                          >
                            <FiTrash2 size={18} className={user.role === 'admin' ? 'opacity-50 cursor-not-allowed' : ''} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    কোন ইউজার পাওয়া যায়নি
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">ইউজার ডিলিট করুন</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">আপনি কি নিশ্চিত যে আপনি এই ইউজারকে ডিলিট করতে চান? এই অ্যাকশন অপরিবর্তনীয়।</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={deleteUser}
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

// Helper functions for role badges
function getRoleBadgeClass(role: string) {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
    case 'editor':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
    case 'author':
      return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

function getRoleLabel(role: string) {
  switch (role) {
    case 'admin':
      return 'অ্যাডমিন';
    case 'editor':
      return 'এডিটর';
    case 'author':
      return 'লেখক';
    default:
      return 'ইউজার';
  }
}