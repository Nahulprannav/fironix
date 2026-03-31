import { useEffect } from "react";
import { SITE_NAME } from "@/lib/site";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export function useSEO({ title, description, keywords, ogImage, ogUrl }: SEOProps) {
  useEffect(() => {
    // Basic Meta
    document.title = `${title} | ${SITE_NAME}`;
    
    const setMetaTag = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    }

    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }

    // Open Graph & Twitter
    setMetaTag("property", "og:title", `${title} | ${SITE_NAME}`);
    setMetaTag("name", "twitter:title", `${title} | ${SITE_NAME}`);
    
    if (ogImage) {
      setMetaTag("property", "og:image", ogImage);
      setMetaTag("name", "twitter:image", ogImage);
      setMetaTag("name", "twitter:card", "summary_large_image");
    }

    if (ogUrl) {
      setMetaTag("property", "og:url", ogUrl);
      
      // Canonical link
      let linkElement = document.querySelector(`link[rel="canonical"]`);
      if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "canonical");
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute("href", ogUrl);
    }
  }, [title, description, keywords, ogImage, ogUrl]);
}
