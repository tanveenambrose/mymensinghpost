import Link from 'next/link';
import { FiFileText, FiFolder, FiUsers, FiEye, FiTrendingUp, FiMessageSquare } from 'react-icons/fi';

export default function AdminDashboard() {
  // Mock data for dashboard stats
  const stats = [
    { title: 'মোট আর্টিকেল', value: '১২৫', icon: FiFileText, color: 'bg-blue-500', link: '/admin/articles' },
    { title: 'মোট ক্যাটাগরি', value: '১২', icon: FiFolder, color: 'bg-green-500', link: '/admin/categories' },
    { title: 'মোট ইউজার', value: '৩৫', icon: FiUsers, color: 'bg-purple-500', link: '/admin/users' },
    { title: 'মোট ভিউ', value: '১২,৫৬৭', icon: FiEye, color: 'bg-yellow-500', link: '#' },
    { title: 'ট্রেন্ডিং আর্টিকেল', value: '১৫', icon: FiTrendingUp, color: 'bg-red-500', link: '/admin/articles?filter=trending' },
    { title: 'মোট কমেন্ট', value: '৩৫৬', icon: FiMessageSquare, color: 'bg-indigo-500', link: '#' },
  ];

  // Mock data for recent articles
  const recentArticles = [
    { id: 1, title: 'ময়মনসিংহে নতুন শিল্প পার্ক স্থাপনের ঘোষণা', category: 'অর্থনীতি', date: '১০ মে, ২০২৩', views: '১,২৩৪' },
    { id: 2, title: 'জাতীয় বিশ্ববিদ্যালয়ের পরীক্ষার সময়সূচী প্রকাশ', category: 'শিক্ষা', date: '৯ মে, ২০২৩', views: '৯৮৭' },
    { id: 3, title: 'ময়মনসিংহ বিভাগে নতুন সড়ক নির্মাণের উদ্বোধন', category: 'উন্নয়ন', date: '৮ মে, ২০২৩', views: '৭৬৫' },
    { id: 4, title: 'জাতীয় ক্রিকেট দলে ময়মনসিংহের তরুণ ক্রিকেটার', category: 'খেলাধুলা', date: '৭ মে, ২০২৩', views: '১,৫৪৩' },
    { id: 5, title: 'ময়মনসিংহে আন্তর্জাতিক সাংস্কৃতিক উৎসবের আয়োজন', category: 'সংস্কৃতি', date: '৬ মে, ২০২৩', views: '৬৫৪' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">অ্যাডমিন ড্যাশবোর্ড</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link 
            href={stat.link} 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Articles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">সাম্প্রতিক আর্টিকেল</h2>
          <Link 
            href="/admin/articles" 
            className="text-primary hover:underline"
          >
            সব দেখুন
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">শিরোনাম</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ক্যাটাগরি</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">তারিখ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ভিউ</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/articles/${article.id}`} className="text-primary hover:underline">
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{article.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{article.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{article.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}