declare module "@tryghost/content-api" {
  export interface PostOrPage {
    id: string;
    uuid: string;
    title: string;
    slug: string;
    html: string;
    excerpt: string;
    feature_image: string;
    featured: boolean;
    created_at: string;
    updated_at: string;
    published_at: string;
    custom_excerpt: string;
    reading_time: number;
    tags: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
    authors: Array<{
      id: string;
      name: string;
      slug: string;
      profile_image: string;
      bio?: string;
    }>;
  }

  export interface GhostAPI {
    posts: {
      browse: (options?: any) => Promise<PostOrPage[]>;
      read: (options: {
        slug: string;
        include?: string[];
      }) => Promise<PostOrPage>;
    };
  }

  export default class GhostContentAPI {
    constructor(options: { url: string; key: string; version: string });
    posts: GhostAPI["posts"];
  }
}
