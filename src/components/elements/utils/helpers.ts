import slugify from "@sindresorhus/slugify";

/** Copy given string to clipboard. Returns true if successful, false if failed. */
export function copyToClipboard(text: string): boolean {
  const textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false;
  }
  document.body.removeChild(textArea);
  return true;
}

export function ellipsis(text: string, startLength: number, endlength: number): string {
  return text.substr(0, startLength) + "..." + text.substr(text.length - endlength, text.length);
}

export function dateTimeFormat(date: Date): string {
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const hour = new Intl.DateTimeFormat("en-GB", { hour: "numeric" }).format(date);
  const minute = new Intl.DateTimeFormat("en", { minute: "numeric" }).format(date);
  const dateTimeFormated = `${hour}:${minute} - ${month} ${day}, ${year}`;
  return dateTimeFormated;
}

export function convertToCamelCase(s: string): string {
  return slugify(s).replace(/-./g, (x) => x.replace("-", "").toUpperCase());
}
export function convertToPascalCase(s: string): string {
  return slugify(s).replace(/(^|-)./g, (x) => x.replace("-", "").toUpperCase());
}
