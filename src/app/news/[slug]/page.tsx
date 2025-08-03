import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

import MainLayout from '@/components/layout/MainLayout';
import NewsCard from '@/components/ui/NewsCard';

// This would normally come from the database based on the slug
const getMockArticle = (slug: string) => {
  const mockArticles = [
    {
      _id: '1',
      title: 'ময়মনসিংহে নতুন শিল্প পার্ক স্থাপনের ঘোষণা, হাজার হাজার কর্মসংস্থান সৃষ্টি হবে',
      slug: 'new-industrial-park-in-mymensingh',
      excerpt: 'ময়মনসিংহে নতুন শিল্প পার্ক স্থাপনের ঘোষণা দিয়েছে সরকার। এই প্রকল্পের মাধ্যমে হাজার হাজার কর্মসংস্থান সৃষ্টি হবে বলে আশা করা হচ্ছে।',
      content: `<p>ময়মনসিংহে নতুন শিল্প পার্ক স্থাপনের ঘোষণা দিয়েছে সরকার। এই প্রকল্পের মাধ্যমে হাজার হাজার কর্মসংস্থান সৃষ্টি হবে বলে আশা করা হচ্ছে।</p>

<p>শিল্পমন্ত্রী জানিয়েছেন, ময়মনসিংহের ভালুকা উপজেলায় ৫০০ একর জমির উপর এই শিল্প পার্ক স্থাপন করা হবে। এখানে বস্ত্র, ইলেকট্রনিক্স, খাদ্য প্রক্রিয়াজাতকরণ, ফার্মাসিউটিক্যালস এবং হালকা প্রকৌশল শিল্প স্থাপনের জন্য বিশেষ জোন থাকবে।</p>

<p>"আমরা আশা করছি এই শিল্প পার্কের মাধ্যমে প্রায় ৫০ হাজার মানুষের কর্মসংস্থান হবে। এছাড়া স্থানীয় অর্থনীতিতে এর ইতিবাচক প্রভাব পড়বে," শিল্পমন্ত্রী বলেন।</p>

<p>প্রকল্পটি আগামী বছরের শুরুতে নির্মাণ কাজ শুরু হবে এবং ২০২৬ সালের মধ্যে সম্পূর্ণ করার পরিকল্পনা রয়েছে। সরকার এই প্রকল্পে প্রায় ১০০০ কোটি টাকা বিনিয়োগ করবে।</p>

<p>স্থানীয় বাসিন্দারা এই উদ্যোগকে স্বাগত জানিয়েছেন। তারা আশা করছেন এর ফলে অঞ্চলের অর্থনৈতিক উন্নয়ন ত্বরান্বিত হবে এবং যুবকদের কর্মসংস্থানের সুযোগ বাড়বে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: { name: 'অর্থনীতি', slug: 'economy' },
      author: { name: 'আবদুল করিম', _id: 'author1' },
      createdAt: new Date().toISOString(),
      tags: ['শিল্প', 'অর্থনীতি', 'কর্মসংস্থান', 'ময়মনসিংহ'],
      isBreaking: true,
      viewCount: 1250,
    },
    {
      _id: '2',
      title: 'ময়মনসিংহ বিশ্ববিদ্যালয়ে আন্তর্জাতিক সম্মেলন শুরু, বিশ্বের বিভিন্ন দেশ থেকে গবেষকরা অংশগ্রহণ করছেন',
      slug: 'international-conference-at-mymensingh-university',
      excerpt: 'ময়মনসিংহ বিশ্ববিদ্যালয়ে তিন দিনব্যাপী আন্তর্জাতিক সম্মেলন শুরু হয়েছে। বিশ্বের বিভিন্ন দেশ থেকে গবেষকরা এতে অংশগ্রহণ করছেন।',
      content: `<p>ময়মনসিংহ বিশ্ববিদ্যালয়ে তিন দিনব্যাপী আন্তর্জাতিক সম্মেলন শুরু হয়েছে। বিশ্বের বিভিন্ন দেশ থেকে গবেষকরা এতে অংশগ্রহণ করছেন।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: { name: 'শিক্ষা', slug: 'education' },
      author: { name: 'নাজমুল হাসান', _id: 'author2' },
      createdAt: new Date().toISOString(),
      tags: ['শিক্ষা', 'বিশ্ববিদ্যালয়', 'গবেষণা', 'ময়মনসিংহ'],
      viewCount: 850,
    },
  ];

  return mockArticles.find(article => article.slug === slug) || mockArticles[0];
};

// This would normally come from the database
const getRelatedArticles = (currentArticleId: string) => {
  const mockArticles = [
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
  ];

  return mockArticles.filter(article => article._id !== currentArticleId).slice(0, 3);
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: PageProps) {
  // Make sure params is properly awaited
  const slug = params.slug;
  const article = getMockArticle(slug);
  const relatedArticles = getRelatedArticles(article._id);
  
  const formattedDate = format(new Date(article.createdAt), 'PPP', { locale: bn });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link href="/" className="hover:text-primary">হোম</Link>
              <span className="mx-2">&gt;</span>
              <Link href={`/category/${article.category.slug}`} className="hover:text-primary">
                {article.category.name}
              </Link>
              <span className="mx-2">&gt;</span>
              <span>{article.title.substring(0, 30)}...</span>
            </div>

            {/* Article Header */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>লেখক: {article.author.name}</span>
                <span className="mx-2">•</span>
                <span>{formattedDate}</span>
                <span className="mx-2">•</span>
                <span>{article.viewCount} বার পঠিত</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-96 mb-8">
              <Image 
                src={article.featuredImage} 
                alt={article.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map(tag => (
                <Link 
                  key={tag} 
                  href={`/tag/${tag}`}
                  className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Author Info */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold">{article.author.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">সাংবাদিক</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                ময়মনসিংহ পোস্টের সিনিয়র সাংবাদিক। দীর্ঘ ১০ বছর ধরে সাংবাদিকতা করছেন।
              </p>
            </div>

            {/* Comments Section Placeholder */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">মন্তব্য (0)</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  মন্তব্য করতে লগইন করুন
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Related Articles */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">সম্পর্কিত খবর</h2>
              <div className="space-y-4">
                {relatedArticles.map(article => (
                  <NewsCard key={article._id} article={article} variant="compact" />
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">জনপ্রিয় ট্যাগ</h2>
              <div className="flex flex-wrap gap-2">
                {['রাজনীতি', 'খেলাধুলা', 'শিক্ষা', 'স্বাস্থ্য', 'অর্থনীতি', 'প্রযুক্তি', 'বিনোদন'].map(tag => (
                  <Link 
                    key={tag} 
                    href={`/tag/${tag}`}
                    className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}