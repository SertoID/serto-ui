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

export function ellipsis(text: string, startLength: number, endLength: number): string {
  if (startLength + endLength + 2 >= text.length) {
    // +2 because there's reason to ellide something shorter than "..."
    return text;
  }
  return text.substr(0, startLength) + "..." + text.substr(text.length - endLength, text.length);
}

/** Finds where "0x" hex value starts and takes start length from there. */
export function hexEllipsis(text: string, startLength = 4, endLength = 4): string {
  const addressIndex = text.indexOf("0x");
  return ellipsis(text, (addressIndex === -1 ? 0 : addressIndex + 2) + startLength, endLength);
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

export function getAllUrlSearchParam(name: string): string[] {
  if (window.URLSearchParams) {
    const urlParams = new URLSearchParams(window.location.search.slice(1));
    return urlParams.getAll(name);
  } else {
    // eslint-disable-next-line no-useless-escape
    const nameForRegex = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + nameForRegex + "=([^&#]*)", "g");
    const output = [];
    let results: RegExpExecArray | null;
    while (true) {
      results = regex.exec(window.location.search);
      if (!results) {
        break;
      }
      output.push(decodeURIComponent(results[1].replace(/\+/g, " ")));
    }
    return output;
  }
}
