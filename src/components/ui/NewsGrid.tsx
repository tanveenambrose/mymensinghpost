import NewsCard from './NewsCard';

interface NewsGridProps {
  articles: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    category: { name: string; slug: string };
    createdAt: string;
    isBreaking?: boolean;
  }>;
  columns?: 2 | 3 | 4;
}

const NewsGrid = ({ articles, columns = 3 }: NewsGridProps) => {
  const getGridClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className={`grid ${getGridClass()} gap-6`}>
      {articles.map((article) => (
        <NewsCard key={article._id} article={article} />
      ))}
    </div>
  );
};

export default NewsGrid;