export interface KeystaticArticle {
  slug: string;
  title: string;
  content: string;
  publishedAt: string;
  excerpt: string;
  featureImage?: string;
  readingTime: number;
  author: {
    name: string;
    bio: string;
    profileImage?: string;
  };
  tags: Array<{
    name: string;
    description: string;
  }>;
}

export interface KeystaticAuthor {
  name: string;
  bio: string;
  profileImage?: string;
}

export interface KeystaticTag {
  name: string;
  description: string;
}
