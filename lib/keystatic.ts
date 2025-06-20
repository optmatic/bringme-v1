import { createReader } from "@keystatic/core/reader";
import * as Markdoc from "@markdoc/markdoc";
import config from "../keystatic.config";
import {
  KeystaticArticle,
  KeystaticAuthor,
  KeystaticTag,
} from "./keystatic-types";

const reader = createReader(process.cwd(), config);

// Generate excerpt from content
function generateExcerpt(content: string, maxLength: number = 200): string {
  const plainText = content.replace(/<[^>]*>?/gm, "");

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Fix image URL for Next.js Image component
function fixImageUrl(image: any): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") {
    // If it's just a filename, prefix with /images/articles/
    if (image.startsWith("http://") || image.startsWith("https://"))
      return image;
    if (image.startsWith("/")) return image;
    return `/images/articles/${image}`;
  }
  if (typeof image === "object" && image.src) {
    if (image.src.startsWith("/")) return image.src;
    return `/images/articles/${image.src}`;
  }
  return undefined;
}

export async function getAllArticles(): Promise<KeystaticArticle[]> {
  const posts = await reader.collections.posts.all();

  return Promise.all(
    posts.map(async (post) => {
      const author = post.entry.author
        ? await reader.collections.authors.read(post.entry.author)
        : null;

      const tags =
        (await Promise.all(
          (post.entry.tags || [])
            .filter((tag) => tag)
            .map((tag) => reader.collections.tags.read(tag!))
        )) || [];

      const content = await post.entry.content();
      const htmlContent = content
        ? Markdoc.renderers.html(
            Markdoc.transform((content as { node: Markdoc.Node }).node)
          )
        : "";

      return {
        slug: post.slug,
        title: post.entry.title,
        content: htmlContent,
        publishedAt: post.entry.publishedAt || new Date().toISOString(),
        excerpt: generateExcerpt(htmlContent),
        readingTime: calculateReadingTime(htmlContent),
        featureImage: fixImageUrl(post.entry.featureImage),
        author: author
          ? {
              name: author.name || "Unknown Author",
              bio: author.bio,
              profileImage: fixImageUrl(author.profileImage),
            }
          : {
              name: "Unknown Author",
              bio: "",
            },
        tags: tags
          .filter((tag) => tag !== null)
          .map((tag) => ({
            name: tag!.name || "Untitled Tag",
            description: tag!.description,
          })),
      };
    })
  );
}

export async function getArticle(
  slug: string
): Promise<KeystaticArticle | null> {
  try {
    const post = await reader.collections.posts.read(slug);

    if (!post) return null;

    const author = post.author
      ? await reader.collections.authors.read(post.author)
      : null;

    const tags =
      (await Promise.all(
        (post.tags || [])
          .filter((tag) => tag)
          .map((tag) => reader.collections.tags.read(tag!))
      )) || [];

    const content = await post.content();
    const htmlContent = content
      ? Markdoc.renderers.html(
          Markdoc.transform((content as { node: Markdoc.Node }).node)
        )
      : "";

    return {
      slug,
      title: post.title,
      content: htmlContent,
      publishedAt: post.publishedAt || new Date().toISOString(),
      excerpt: generateExcerpt(htmlContent),
      readingTime: calculateReadingTime(htmlContent),
      featureImage: fixImageUrl(post.featureImage),
      author: author
        ? {
            name: author.name || "Unknown Author",
            bio: author.bio,
            profileImage: fixImageUrl(author.profileImage),
          }
        : {
            name: "Unknown Author",
            bio: "",
          },
      tags: tags
        .filter((tag) => tag !== null)
        .map((tag) => ({
          name: tag!.name || "Untitled Tag",
          description: tag!.description,
        })),
    };
  } catch (error) {
    console.error("Error reading article:", error);
    return null;
  }
}

export async function getFeaturedArticle(): Promise<KeystaticArticle | null> {
  const articles = await getAllArticles();
  return articles.length > 0 ? articles[0] : null;
}

export async function getAllAuthors(): Promise<KeystaticAuthor[]> {
  const authors = await reader.collections.authors.all();
  return authors.map((author) => ({
    name: author.entry.name || "Unknown Author",
    bio: author.entry.bio,
    profileImage: fixImageUrl(author.entry.profileImage),
  }));
}

export async function getAllTags(): Promise<KeystaticTag[]> {
  const tags = await reader.collections.tags.all();
  return tags.map((tag) => ({
    name: tag.entry.name || "Untitled Tag",
    description: tag.entry.description,
  }));
}
