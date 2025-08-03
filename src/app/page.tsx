"use client";

import MainLayout from '@/components/layout/MainLayout';
import NewsCard from '@/components/ui/NewsCard';
import NewsGrid from '@/components/ui/NewsGrid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: {
    name: string;
    slug: string;
  };
  createdAt: string;
  isBreaking: boolean;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError('');
      try {
        const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            _id: doc.id,
            title: d.title,
            slug: d.title ? d.title.replace(/\s+/g, '-').toLowerCase().slice(0, 40) + '-' + doc.id.slice(-6) : doc.id,
            excerpt: d.description?.slice(0, 100) || '',
            featuredImage: d.photos?.[0] || '',
            category: { name: d.category, slug: d.category },
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : new Date().toISOString(),
            isBreaking: false,
          };
        });
        setArticles(data);
      } catch (err) {
        setError('সংবাদ লোড করতে সমস্যা হয়েছে।');
      }
      setLoading(false);
    }
    fetchNews();
  }, []);

  // Featured and trending logic (first article as featured, next 4 as trending)
  const featured = articles[0];
  const trending = articles.slice(1, 5);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breaking News Banner */}
        <div className="bg-red-600 text-white px-4 py-2 mb-6 rounded-md">
          <div className="flex items-center">
            <span className="font-bold mr-2">ব্রেকিং নিউজ:</span>
            <div className="overflow-hidden relative w-full">
              <div className="animate-marquee whitespace-nowrap">
                {articles.filter(a => a.isBreaking).map((article, index) => (
                  <span key={article._id} className="mx-4">
                    <Link href={`/news/${article.slug}`} className="hover:underline">
                      {article.title}
                    </Link>
                    {index < articles.filter(a => a.isBreaking).length - 1 && ' • '}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading && <div className="text-center py-8">লোড হচ্ছে...</div>}
        {error && <div className="text-center text-red-500 py-8">{error}</div>}
        {!loading && !error && (
          <>
            {/* Featured Article */}
            {featured && (
              <div className="mb-12">
                <NewsCard article={featured} variant="featured" />
              </div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Latest News */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">সর্বশেষ খবর</h2>
                  <Link href="/latest" className="text-primary hover:underline">
                    সব দেখুন
                  </Link>
                </div>
                <NewsGrid articles={articles.slice(0, 6)} columns={2} />
              </div>

              {/* Sidebar */}
              <div>
                {/* Trending News */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">ট্রেন্ডিং</h2>
                  <div className="space-y-4">
                    {trending.map(article => (
                      <NewsCard key={article._id} article={article} variant="compact" />
                    ))}
                  </div>
                </div>
                {/* Categories */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">বিভাগসমূহ</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'রাজনীতি', slug: 'politics' },
                      { name: 'খেলা', slug: 'sports' },
                      { name: 'অর্থনীতি', slug: 'economy' },
                      { name: 'আন্তর্জাতিক', slug: 'international' },
                      { name: 'শিক্ষা', slug: 'education' },
                      { name: 'বিনোদন', slug: 'entertainment' },
                    ].map(category => (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="bg-gray-100 hover:bg-primary hover:text-white rounded-md p-3 text-center transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
