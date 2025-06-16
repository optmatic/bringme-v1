import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  collections: {
    posts: collection({
      label: "Articles",
      slugField: "title",
      path: "src/content/articles/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({ label: "Content" }),
        publishedAt: fields.date({ label: "Published At" }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
        }),
        tags: fields.array(fields.relationship({ collection: "tags" })),
      },
    }),
  },
});
