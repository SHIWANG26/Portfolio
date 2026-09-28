import type {
  BlogPosting,
  BreadcrumbList,
  Person,
  SoftwareSourceCode,
  WebSite,
  WithContext,
} from "schema-dts";
import { siteConfig } from "./site-config";
import type { MDXDocument } from "./mdx";

function absoluteUrl(value: string): string {
  return new URL(value, siteConfig.url).toString();
}

export const getPersonSchema = (): WithContext<Person> => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  jobTitle: "Software Engineer",
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  knowsAbout: [
    "C++",
    "Java",
    "System Design",
    "Distributed Systems",
    "Microservices Architecture",
    "gRPC",
    "Apache Kafka",
    "Spring Boot",
    "Spring Security",
    "PostgreSQL",
  ],
});

export const getWebSiteSchema = (): WithContext<WebSite> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: `${siteConfig.name} — Software Engineering Portfolio`,
  description: siteConfig.description,
  publisher: { "@id": `${siteConfig.url}/#person` },
  inLanguage: "en-US",
});

export const getArticleSchema = (post: MDXDocument): WithContext<BlogPosting> => {
  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}/#article`,
    headline: post.metadata.title,
    description: post.metadata.summary,
    image: post.metadata.image
      ? absoluteUrl(post.metadata.image)
      : absoluteUrl(siteConfig.ogImage),
    datePublished: new Date(post.metadata.publishedAt).toISOString(),
    dateModified: new Date(
      post.metadata.updatedAt || post.metadata.publishedAt,
    ).toISOString(),
    url: canonicalUrl,
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
    keywords: post.metadata.tags?.join(", "),
  };
};

export const getProjectSchema = (
  project: MDXDocument,
): WithContext<SoftwareSourceCode> => {
  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${canonicalUrl}/#software`,
    name: project.metadata.title,
    description: project.metadata.summary,
    programmingLanguage: project.metadata.techStack?.join(", "),
    codeRepository: project.metadata.githubUrl,
    url: project.metadata.liveUrl || canonicalUrl,
    author: { "@id": `${siteConfig.url}/#person` },
    datePublished: new Date(project.metadata.publishedAt).toISOString(),
  };
};

export const getBreadcrumbSchema = (
  items: { name: string; url: string }[],
): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
