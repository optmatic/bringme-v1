"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Clock, ThumbsUp, Play, Newspaper } from "lucide-react";
import Image from "next/image";
import { ds } from "@/lib/design-system";

// Sample curated content - in a real app, this would come from your CMS or database
const curatedContent = {
  articles: [
    {
      id: "article-1",
      title: "The Future of Australian Democracy in a Changing World",
      source: "The Conversation",
      url: "https://example.com/article1",
      excerpt:
        "An insightful analysis of how democratic institutions are evolving in response to global challenges.",
      image:
        "/placeholder.svg?height=200&width=400&query=Australian parliament democracy future",
      date: "April 10, 2024",
      readTime: "8 min",
      tags: ["Democracy", "Politics"],
      type: "article",
    },
    {
      id: "article-2",
      title: "Climate Change and Australia's Economic Future",
      source: "The Guardian",
      url: "https://example.com/article2",
      excerpt:
        "How climate policy will shape Australia's economic landscape over the next decade.",
      image:
        "/placeholder.svg?height=200&width=400&query=Australian renewable energy climate economy",
      date: "March 28, 2024",
      readTime: "12 min",
      tags: ["Climate", "Economics"],
      type: "article",
    },
    {
      id: "article-3",
      title: "Indigenous Knowledge Systems and Modern Science",
      source: "ABC In-depth",
      url: "https://example.com/article3",
      excerpt:
        "Exploring the valuable intersection between traditional knowledge and contemporary scientific approaches.",
      image:
        "/placeholder.svg?height=200&width=400&query=Indigenous Australian knowledge science collaboration",
      date: "April 5, 2024",
      readTime: "10 min",
      tags: ["Indigenous", "Science"],
      type: "article",
    },
  ],
  media: [
    {
      id: "media-1",
      title: "Understanding Australia's Role in the Indo-Pacific",
      creator: "Lowy Institute",
      url: "https://youtube.com/watch?v=example1",
      thumbnail:
        "/placeholder.svg?height=200&width=400&query=Australia Indo-Pacific relations diplomacy",
      duration: "18:24",
      date: "March 15, 2024",
      tags: ["Foreign Policy", "Indo-Pacific"],
      type: "video",
      platform: "YouTube",
    },
    {
      id: "media-2",
      title: "The History of Australian Political Movements",
      creator: "Australian Politics Explained",
      url: "https://youtube.com/watch?v=example2",
      thumbnail:
        "/placeholder.svg?height=200&width=400&query=Australian political history movements protest",
      duration: "24:15",
      date: "February 28, 2024",
      tags: ["History", "Politics"],
      type: "video",
      platform: "YouTube",
    },
    {
      id: "media-3",
      title: "Australia's Housing Crisis Explained",
      creator: "ABC News In-depth",
      url: "https://abc.net.au/example3",
      thumbnail:
        "/placeholder.svg?height=200&width=400&query=Australian housing crisis urban development",
      duration: "32:10",
      date: "April 2, 2024",
      tags: ["Housing", "Economics"],
      type: "podcast",
      platform: "ABC Listen",
    },
  ],
  social: [
    {
      id: "social-1",
      author: "Dr. Jane Smith",
      handle: "@janesmith",
      platform: "Twitter",
      content:
        "Fascinating new research on how Australia's voting patterns have shifted over the last three decades. The regional/urban divide is becoming increasingly significant.",
      date: "April 12, 2024",
      likes: 1243,
      url: "https://twitter.com/example1",
      tags: ["Politics", "Research"],
      type: "tweet",
    },
    {
      id: "social-2",
      author: "Australian Policy Institute",
      handle: "@auspolicy",
      platform: "Twitter",
      content:
        "Our new report on housing affordability shows that without significant policy intervention, homeownership will remain out of reach for many young Australians for decades to come.",
      date: "April 8, 2024",
      likes: 876,
      url: "https://twitter.com/example2",
      tags: ["Housing", "Policy"],
      type: "tweet",
    },
    {
      id: "social-3",
      author: "Prof. Michael Wong",
      handle: "Michael Wong",
      platform: "LinkedIn",
      content:
        "Just published: Our team's analysis of Australia's renewable energy transition and the economic opportunities it presents for regional communities. Link to full paper in comments.",
      date: "April 5, 2024",
      likes: 342,
      url: "https://linkedin.com/example3",
      tags: ["Renewable Energy", "Economics"],
      type: "post",
    },
  ],
};

export function DiscoverContent() {
  const [activeTab, setActiveTab] = useState("all");

  // Combine all content types for the "All" tab with deterministic ordering
  const allContent = [
    ...curatedContent.articles.map((item) => ({ ...item, type: "article" })),
    ...curatedContent.media.map((item) => ({ ...item, type: "media" })),
    ...curatedContent.social.map((item) => ({ ...item, type: "social" })),
  ].sort((a, b) => {
    // Sort by date in descending order (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section>
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="border-b border-gray-200/60 mb-6">
          <TabsList className="bg-transparent h-auto p-0 mb-[-1px] overflow-x-auto">
            <TabsTrigger
              value="all"
              className={`px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium rounded-none border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-700 data-[state=active]:shadow-none data-[state=inactive]:border-transparent`}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="articles"
              className={`px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium rounded-none border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-700 data-[state=active]:shadow-none data-[state=inactive]:border-transparent`}
            >
              Articles
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className={`px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium rounded-none border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-700 data-[state=active]:shadow-none data-[state=inactive]:border-transparent`}
            >
              Media
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className={`px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium rounded-none border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-700 data-[state=active]:shadow-none data-[state=inactive]:border-transparent`}
            >
              Social
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {allContent.map((item) => (
              <ContentCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {curatedContent.articles.map((article) => (
              <ContentCard
                key={article.id}
                item={{ ...article, type: "article" }}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {curatedContent.media.map((media) => (
              <ContentCard key={media.id} item={{ ...media, type: "media" }} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="social" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {curatedContent.social.map((social) => (
              <ContentCard
                key={social.id}
                item={{ ...social, type: "social" }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

interface ContentCardProps {
  item: any;
}

function ContentCard({ item }: ContentCardProps) {
  // Render different card layouts based on content type
  switch (item.type) {
    case "article":
      return (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <article
            className={`${ds.components.cards.article} hover:shadow-md transition-all duration-300 overflow-hidden hover:border-green-300/60`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-1">
                <div className="relative h-40 md:h-full bg-gray-100 border border-gray-200/60 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    role="presentation"
                  />
                </div>
              </div>

              <div className="lg:col-span-3 p-4 md:p-6 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-white text-green-700 border border-green-200/60 px-2 py-0.5 text-xs font-medium font-inter rounded-none"
                  >
                    {item.source}
                  </Badge>
                  <div className="flex items-center text-xs text-slate-500">
                    <Newspaper className="h-3 w-3 mr-1" />
                    <span>Article</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-green-700 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 mb-4 flex-grow">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{item.date}</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-green-600 text-xs font-medium">
                    Read{" "}
                    <ExternalLink className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </a>
      );

    case "media":
      return (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <article
            className={`${ds.components.cards.article} hover:shadow-md transition-all duration-300 overflow-hidden hover:border-green-300/60`}
          >
            <div className="relative">
              <div className="relative aspect-[4/3] sm:aspect-video bg-gray-100 border-b border-gray-200/60 overflow-hidden">
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  role="presentation"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-12 h-12 rounded-none bg-white/90 flex items-center justify-center">
                    <Play className="h-5 w-5 text-green-600 ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs text-white">
                  {item.duration}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-white text-green-700 border border-green-200/60 px-2 py-0.5 text-xs font-medium font-inter rounded-none"
                  >
                    {item.creator}
                  </Badge>
                  <div className="flex items-center text-xs text-slate-500">
                    <span>{item.platform}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-green-700 transition-colors mb-2">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-slate-500">{item.date}</div>

                  <div className="flex items-center text-green-600 text-xs font-medium">
                    Watch{" "}
                    <ExternalLink className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </a>
      );

    case "social":
      return (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <article
            className={`${ds.components.cards.article} hover:shadow-md transition-all duration-300 overflow-hidden hover:border-green-300/60 p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium text-slate-900">{item.author}</div>
                <div className="text-sm text-slate-500">
                  {item.handle} • {item.platform}
                </div>
              </div>
              <div className="flex items-center text-xs text-slate-500">
                <span>Social</span>
              </div>
            </div>

            <p className="text-slate-800 mb-4 text-sm">{item.content}</p>

            <div className="flex items-center justify-between text-xs">
              <div className="text-slate-500">{item.date}</div>
              <div className="flex items-center text-slate-500">
                <ThumbsUp className="h-3 w-3 mr-1" />
                <span>{item.likes}</span>
              </div>
            </div>
          </article>
        </a>
      );

    default:
      return null;
  }
}
