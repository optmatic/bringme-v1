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
        featureImage: fields.image({
          label: "Feature Image",
          directory: "public/images/articles",
        }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
        }),
        tags: fields.array(
          fields.relationship({
            label: "Tags",
            collection: "tags",
          })
        ),
      },
    }),
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",
      schema: {
        name: fields.text({ label: "Name" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        profileImage: fields.image({
          label: "Profile Image",
          directory: "public/images/authors",
        }),
      },
    }),
    tags: collection({
      label: "Tags",
      slugField: "name",
      path: "src/content/tags/*",
      schema: {
        name: fields.text({ label: "Name" }),
        description: fields.text({ label: "Description", multiline: true }),
      },
    }),
  },
});
