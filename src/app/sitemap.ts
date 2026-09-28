import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllDocuments } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllDocuments("projects").map(
    (project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: new Date(
        project.metadata.updatedAt || project.metadata.publishedAt,
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const blogRoutes: MetadataRoute.Sitemap = getAllDocuments("blog").map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt || post.metadata.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
