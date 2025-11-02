import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wandainventory.co.ke",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    // Add more routes
  ];
}
