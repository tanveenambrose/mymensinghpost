import mongoose, { Schema } from 'mongoose';
import { Comment } from '@/types';

const CommentSchema = new Schema<Comment>(
  {
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: 'NewsArticle',
      required: [true, 'Article is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.models.Comment || mongoose.model<Comment>('Comment', CommentSchema);

export default CommentModel;