// Types for MongoDB collections

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsArticle {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string | Category;
  author: string | User;
  tags: string[];
  isFeatured: boolean;
  isBreaking: boolean;
  isTrending: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id?: string;
  content: string;
  article: string | NewsArticle;
  author: string | User;
  createdAt: Date;
  updatedAt: Date;
}