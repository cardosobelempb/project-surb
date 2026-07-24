import type { MetadataRoute } from "next";

import { siteConfig } from "./config/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/contato", "/precos", "/termos", "/privacidade"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
