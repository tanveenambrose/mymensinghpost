import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';

interface NewsCardProps {
  article: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    category: { name: string; slug: string };
    createdAt: string;
    isBreaking?: boolean;
  };
  variant?: 'default' | 'featured' | 'compact';
}

const NewsCard = ({ article, variant = 'default' }: NewsCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
    locale: bn,
  });

  if (variant === 'featured') {
    return (
      <div className="group relative overflow-hidden rounded-lg">
        <div className="relative h-80 w-full overflow-hidden rounded-lg">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          {article.isBreaking && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
              ব্রেকিং
            </div>
          )}
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <Link
              href={`/category/${article.category.slug}`}
              className="text-primary hover:underline text-sm font-medium mb-2 inline-block"
            >
              {article.category.name}
            </Link>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              <Link href={`/news/${article.slug}`} className="hover:underline">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-300 text-sm mb-2">{article.excerpt}</p>
            <p className="text-gray-400 text-xs">{formattedDate}</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex space-x-4 group">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {article.isBreaking && (
            <div className="absolute top-1 left-1 bg-red-600 text-white px-1 py-0.5 text-[10px] font-bold rounded">
              ব্রেকিং
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1 line-clamp-2">
            <Link href={`/news/${article.slug}`} className="hover:text-primary">
              {article.title}
            </Link>
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{formattedDate}</p>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {article.isBreaking && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            ব্রেকিং
          </div>
        )}
      </div>
      <div className="p-4">
        <Link
          href={`/category/${article.category.slug}`}
          className="text-primary hover:underline text-sm font-medium mb-2 inline-block"
        >
          {article.category.name}
        </Link>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
          <Link href={`/news/${article.slug}`} className="hover:text-primary">
            {article.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">{formattedDate}</p>
      </div>
    </div>
  );
};

export default NewsCard;