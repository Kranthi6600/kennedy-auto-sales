const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "span", "div",
  "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6",
  "img", "a", "table", "thead", "tbody", "tr", "th", "td",
  "blockquote", "hr", "figure", "figcaption", "video", "source",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "width", "height", "title"]),
  video: new Set(["src", "controls", "width", "height"]),
  source: new Set(["src", "type"]),
  span: new Set(["class", "style"]),
  div: new Set(["class", "style"]),
  p: new Set(["class", "style"]),
  table: new Set(["class"]),
  td: new Set(["class", "colspan", "rowspan"]),
  th: new Set(["class", "colspan", "rowspan"]),
};

const DANGEROUS_ATTRS = /^(on|javascript:|data:|vbscript:)/i;

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  cleanNode(doc.body);
  return doc.body.innerHTML;
}

function cleanNode(node: Node) {
  const children = Array.from(node.childNodes);
  for (const child of children) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as Element;
      const tag = el.tagName.toLowerCase();

      if (!ALLOWED_TAGS.has(tag)) {
        // Replace disallowed elements with their text content
        const text = document.createTextNode(el.textContent || "");
        el.replaceWith(text);
        continue;
      }

      // Remove dangerous attributes
      const attrs = Array.from(el.attributes);
      for (const attr of attrs) {
        const name = attr.name.toLowerCase();
        const value = attr.value.trim();

        const allowedForTag = ALLOWED_ATTRS[tag];
        const isAllowed = allowedForTag ? allowedForTag.has(name) : false;
        const isGlobalSafe = name === "class" || name === "style";

        if (DANGEROUS_ATTRS.test(name) || DANGEROUS_ATTRS.test(value)) {
          el.removeAttribute(attr.name);
        } else if (!isAllowed && !isGlobalSafe) {
          el.removeAttribute(attr.name);
        }

        // Sanitize href/src for javascript: protocols
        if ((name === "href" || name === "src") && DANGEROUS_ATTRS.test(value)) {
          el.removeAttribute(attr.name);
        }
      }

      // Add rel="noopener noreferrer" to target="_blank" links
      if (tag === "a" && el.getAttribute("target") === "_blank") {
        el.setAttribute("rel", "noopener noreferrer");
      }

      cleanNode(el);
    } else if (child.nodeType === Node.COMMENT_NODE) {
      child.remove();
    }
  }
}

export function stripTags(html: string): string {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
