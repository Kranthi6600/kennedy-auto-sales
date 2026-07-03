"use client";

import { useEffect } from "react";
import { getCanonicalUrl } from "../lib/site";

interface SeoProps {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
  canonicalUrl?: string | null;
  canonicalPath?: string | null;
  robotsMeta?: string | null;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonicalUrl,
  canonicalPath,
  robotsMeta,
}: SeoProps) {
  const resolvedCanonical = canonicalUrl || (canonicalPath ? getCanonicalUrl(canonicalPath) : null);

  useEffect(() => {
    if (title) document.title = title;

    if (description) upsertMeta("name", "description", description);
    if (keywords) upsertMeta("name", "keywords", keywords);
    if (robotsMeta) upsertMeta("name", "robots", robotsMeta);

    if (ogTitle) upsertMeta("property", "og:title", ogTitle);
    if (ogDescription) upsertMeta("property", "og:description", ogDescription);
    if (ogImage) upsertMeta("property", "og:image", ogImage);

    if (twitterTitle) upsertMeta("name", "twitter:title", twitterTitle);
    if (twitterDescription) upsertMeta("name", "twitter:description", twitterDescription);
    if (twitterImage) upsertMeta("name", "twitter:image", twitterImage);

    if (resolvedCanonical) upsertLink("canonical", resolvedCanonical);
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    resolvedCanonical,
    robotsMeta,
  ]);

  return null;
}
