import React from 'react';
import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import NewsGrid from '@/components/ui/NewsGrid';
import Pagination from '@/components/ui/Pagination';

// This would normally come from the database based on the slug
const getMockCategory = (slug: string) => {
  const categories = [
    { name: 'রাজনীতি', slug: 'politics' },
    { name: 'খেলাধুলা', slug: 'sports' },
    { name: 'অর্থনীতি', slug: 'economy' },
    { name: 'আন্তর্জাতিক', slug: 'international' },
    { name: 'শিক্ষা', slug: 'education' },
    { name: 'বিনোদন', slug: 'entertainment' },
  ];

  return categories.find(category => category.slug === slug) || categories[0];
};

// This would normally come from the database
const getMockArticlesByCategory = (categorySlug: string) => {
  const mockArticles = [
    {
      _id: '1',
      title: 'ময়মনসিংহে নতুন শিল্প পার্ক স্থাপনের ঘোষণা, হাজার হাজার কর্মসংস্থান সৃষ্টি হবে',
      slug: 'new-industrial-park-in-mymensingh',
      excerpt: 'ময়মনসিংহে নতুন শিল্প পার্ক স্থাপনের ঘোষণা দিয়েছে সরকার। এই প্রকল্পের মাধ্যমে হাজার হাজার কর্মসংস্থান সৃষ্টি হবে বলে আশা করা হচ্ছে।',
      featuredImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: { name: 'অর্থনীতি', slug: 'economy' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'ময়মনসিংহ বিশ্ববিদ্যালয়ে আন্তর্জাতিক সম্মেলন শুরু, বিশ্বের বিভিন্ন দেশ থেকে গবেষকরা অংশগ্রহণ করছেন',
      slug: 'international-conference-at-mymensingh-university',
      excerpt: 'ময়মনসিংহ বিশ্ববিদ্যালয়ে তিন দিনব্যাপী আন্তর্জাতিক সম্মেলন শুরু হয়েছে। বিশ্বের বিভিন্ন দেশ থেকে গবেষকরা এতে অংশগ্রহণ করছেন।',
      featuredImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: { name: 'শিক্ষা', slug: 'education' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      title: 'ময়মনসিংহে নতুন মেডিকেল কলেজ হাসপাতাল উদ্বোধন, আধুনিক চিকিৎসা সেবা পাবেন অঞ্চলের মানুষ',
      slug: 'new-medical-college-hospital-in-mymensingh',
      excerpt: 'ময়মনসিংহে নতুন মেডিকেল কলেজ হাসপাতাল উদ্বোধন করা হয়েছে। এই হাসপাতালে আধুনিক চিকিৎসা সেবা পাবেন অঞ্চলের মানুষ।',
      featuredImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: { name: 'স্বাস্থ্য', slug: 'health' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: '4',
      title: 'ময়মনসিংহে আন্তর্জাতিক ক্রিকেট স্টেডিয়াম নির্মাণের সিদ্ধান্ত, ২০২৫ সালে কাজ শুরু হবে',
      slug: 'international-cricket-stadium-in-mymensingh',
      excerpt: 'ময়মনসিংহে আন্তর্জাতিক মানের ক্রিকেট স্টেডিয়াম নির্মাণের সিদ্ধান্ত নিয়েছে বাংলাদেশ ক্রিকেট বোর্ড। ২০২৫ সালে এর নির্মাণ কাজ শুরু হবে।',
      featuredImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80',
      category: { name: 'খেলাধুলা', slug: 'sports' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: '5',
      title: 'ময়মনসিংহে ঐতিহাসিক মসজিদ সংস্কারের উদ্যোগ, সংরক্ষণ করা হবে প্রাচীন স্থাপত্য',
      slug: 'historic-mosque-renovation-in-mymensingh',
      excerpt: 'ময়মনসিংহের ঐতিহাসিক মসজিদ সংস্কারের উদ্যোগ নেওয়া হয়েছে। এই সংস্কারের মাধ্যমে প্রাচীন স্থাপত্য সংরক্ষণ করা হবে।',
      featuredImage: 'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: { name: 'সংস্কৃতি', slug: 'culture' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: '6',
      title: 'ময়মনসিংহে নতুন আইটি পার্ক উদ্বোধন, তরুণদের জন্য সৃষ্টি হবে নতুন কর্মসংস্থান',
      slug: 'new-it-park-in-mymensingh',
      excerpt: 'ময়মনসিংহে নতুন আইটি পার্ক উদ্বোধন করা হয়েছে। এই পার্কের মাধ্যমে তরুণদের জন্য সৃষ্টি হবে নতুন কর্মসংস্থান।',
      featuredImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: { name: 'প্রযুক্তি', slug: 'technology' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: '7',
      title: 'ময়মনসিংহে বন্যার আশঙ্কা, নদীর পানি বিপদসীমার কাছাকাছি',
      slug: 'flood-warning-in-mymensingh',
      excerpt: 'ময়মনসিংহে বন্যার আশঙ্কা দেখা দিয়েছে। নদীর পানি বিপদসীমার কাছাকাছি পৌঁছেছে। প্রশাসন প্রস্তুতি নিচ্ছে।',
      featuredImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: { name: 'দুর্যোগ', slug: 'disaster' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: '8',
      title: 'ময়মনসিংহে জাতীয় ক্রীড়া প্রতিযোগিতা শুরু, দেশের বিভিন্ন প্রান্ত থেকে অংশগ্রহণ করছেন খেলোয়াড়রা',
      slug: 'national-sports-competition-in-mymensingh',
      excerpt: 'ময়মনসিংহে জাতীয় ক্রীড়া প্রতিযোগিতা শুরু হয়েছে। দেশের বিভিন্ন প্রান্ত থেকে অংশগ্রহণ করছেন খেলোয়াড়রা।',
      featuredImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: { name: 'খেলাধুলা', slug: 'sports' },
      createdAt: new Date().toISOString(),
    },
  ];

  return mockArticles.filter(article => article.category.slug === categorySlug);
};

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  // Make sure params is properly awaited
  const slug = params.slug;
  const category = getMockCategory(slug);
  const articles = getMockArticlesByCategory(slug);
  
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const articlesPerPage = 6;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  
  // Paginate articles
  const paginatedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href="/" className="hover:text-primary">হোম</Link>
            <span className="mx-2">&gt;</span>
            <span>{category.name}</span>
          </div>
        </div>

        {/* Articles Grid */}
        {paginatedArticles.length > 0 ? (
          <>
            <NewsGrid articles={paginatedArticles} columns={3} />
            {totalPages > 1 && (
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">কোন খবর পাওয়া যায়নি</h2>
            <p className="text-gray-600 dark:text-gray-400">
              এই বিভাগে কোন খবর পাওয়া যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।
            </p>
          </div>
        )}

        {/* Category Description */}
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{category.name} বিভাগ সম্পর্কে</h2>
          <p className="text-gray-700 dark:text-gray-300">
            ময়মনসিংহ পোস্টের {category.name} বিভাগে আপনি পাবেন সর্বশেষ এবং গুরুত্বপূর্ণ সব খবর। 
            আমরা নিশ্চিত করি যে আপনি সবসময় সঠিক এবং নির্ভরযোগ্য তথ্য পাচ্ছেন।
          </p>
        </div>
      </div>
    </MainLayout>
  );
}