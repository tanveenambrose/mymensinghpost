'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiFileText, FiFolder, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react';

const sidebarItems = [
  { name: 'ড্যাশবোর্ড', href: '/admin', icon: FiHome },
  { name: 'নিউজ আর্টিকেল', href: '/admin/articles', icon: FiFileText },
  { name: 'ক্যাটাগরি', href: '/admin/categories', icon: FiFolder },
  { name: 'ইউজার', href: '/admin/users', icon: FiUsers },
  { name: 'সেটিংস', href: '/admin/settings', icon: FiSettings },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen shadow-md fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold text-primary">MymensinghPost</h1>
        </Link>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <item.icon className="mr-3" size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
          <li className="mt-6">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex w-full items-center p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiLogOut className="mr-3" size={18} />
              <span>লগ আউট</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;