import GhostContentAPI, { PostOrPage } from "@tryghost/content-api";

// Validate required environment variables
const GHOST_URL = process.env.GHOST_URL;
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY;

// Debug logging for environment variables
console.log("Ghost Configuration:", {
  url: GHOST_URL ? `${GHOST_URL.substring(0, 10)}...` : "not set",
  hasApiKey: !!GHOST_CONTENT_API_KEY,
  apiKeyLength: GHOST_CONTENT_API_KEY?.length,
});

if (!GHOST_URL || !GHOST_CONTENT_API_KEY) {
  throw new Error(
    "Ghost CMS configuration is missing. Please set GHOST_URL and GHOST_CONTENT_API_KEY in your .env.local file.\n" +
      "You can get these values from your Ghost admin panel under Settings > Integrations > Custom Integrations."
  );
}

// Validate API key format
if (!/^[a-f0-9]{26}$/.test(GHOST_CONTENT_API_KEY)) {
  throw new Error(
    `Invalid GHOST_CONTENT_API_KEY format. The key must be exactly 26 hexadecimal characters.\n` +
      `Current key length: ${GHOST_CONTENT_API_KEY.length} characters\n` +
      `Please check your Ghost admin panel under Settings > Integrations > Custom Integrations`
  );
}

// Validate URL format
try {
  new URL(GHOST_URL);
} catch (e) {
  throw new Error(
    `Invalid GHOST_URL format: ${GHOST_URL}\n` +
      "Please ensure it's a valid URL (e.g., http://localhost:2368 for local development)"
  );
}

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: GHOST_URL,
  key: GHOST_CONTENT_API_KEY,
  version: "v5.0",
});

export interface GhostPost extends PostOrPage {
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
  }>;
}

async function testGhostConnection() {
  const testUrl = `${GHOST_URL}/ghost/api/v3/content/posts/?key=${GHOST_CONTENT_API_KEY}`;
  console.log("Testing Ghost connection to:", testUrl);

  try {
    const response = await fetch(testUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Ghost connection test successful:", {
      status: response.status,
      hasPosts: !!data?.posts,
      postCount: data?.posts?.length || 0,
    });

    return true;
  } catch (error) {
    const errorDetails = {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown error type",
      url: testUrl,
      timestamp: new Date().toISOString(),
    };
    console.error("Ghost connection test failed:", errorDetails);
    return false;
  }
}

export async function getPosts(options = {}) {
  try {
    console.log(`Attempting to fetch posts from ${GHOST_URL}`);

    // Test the API connection first
    const connectionTest = await testGhostConnection();
    if (!connectionTest) {
      console.error("Skipping posts fetch due to failed connection test");
      return [];
    }

    const posts = await api.posts
      .browse({
        include: ["tags", "authors"],
        ...options,
      })
      .catch((err) => {
        const errorDetails = {
          message: err?.message || "Unknown error",
          name: err?.name || "Unknown error type",
          stack: err?.stack,
          url: GHOST_URL,
          hasApiKey: !!GHOST_CONTENT_API_KEY,
          apiKeyLength: GHOST_CONTENT_API_KEY?.length,
          options: JSON.stringify(options),
        };
        console.error("Ghost API Error:", errorDetails);
        throw err;
      });

    return posts;
  } catch (error) {
    const errorDetails = {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown error type",
      stack: error instanceof Error ? error.stack : undefined,
      url: GHOST_URL,
      hasApiKey: !!GHOST_CONTENT_API_KEY,
      apiKeyLength: GHOST_CONTENT_API_KEY?.length,
    };
    console.error("Error in getPosts:", errorDetails);
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    const post = await api.posts
      .read({
        slug,
        include: ["tags", "authors"],
      })
      .catch((err: Error) => {
        console.error("Error fetching post:", err);
        return null;
      });

    return post;
  } catch (error) {
    console.error("Error in getPost:", error);
    return null;
  }
}

export async function getFeaturedPost() {
  try {
    const posts = await api.posts
      .browse({
        limit: 1,
        filter: "featured:true",
        include: ["tags", "authors"],
      })
      .catch((err: Error) => {
        console.error("Error fetching featured post:", err);
        return [];
      });

    return posts[0] || null;
  } catch (error) {
    console.error("Error in getFeaturedPost:", error);
    return null;
  }
}

export async function getPostsByTag(tag: string, options = {}) {
  try {
    const posts = await api.posts
      .browse({
        filter: `tag:${tag}`,
        include: ["tags", "authors"],
        ...options,
      })
      .catch((err: Error) => {
        console.error("Error fetching posts by tag:", err);
        return [];
      });

    return posts;
  } catch (error) {
    console.error("Error in getPostsByTag:", error);
    return [];
  }
}
