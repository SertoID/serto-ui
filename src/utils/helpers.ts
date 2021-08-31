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

export function truncateDid(did: string, maxCharCount = 20): string {
  const overMaxCount = did.length > maxCharCount;
  return did.includes("did:web") ? did : overMaxCount ? hexEllipsis(did) : did;
}

/** Finds where "0x" hex value starts and takes start length from there. */
export function hexEllipsis(text: string, startLength = 4, endLength = 4): string {
  const addressIndex = text.indexOf("0x") === -1 ? text.lastIndexOf(":") + 1 : text.indexOf("0x") + 2;
  return ellipsis(text, addressIndex + startLength, endLength);
}

export function dateTimeFormat(date: Date): string {
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric" }).format(date);
  const dateTimeFormated = ` ${month} ${day}, ${year} at ${time}`;
  return dateTimeFormated;
}

/** <input type="datetime-local"> element requires a nonstandard time format ("yyyy-MM-ddThh:mm"). This converts from ISO datetime string into that format.  */
export function isoToDatetimeLocal(isoString: string): string {
  const offset = new Date().getTimezoneOffset() * 1000 * 60;
  const offsetDate = new Date(isoString).valueOf() - offset;
  return new Date(offsetDate).toISOString().substring(0, 16);
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
    // eslint-disable-next-line no-constant-condition
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createMockApiRequest = (response?: any): ((...args: any[]) => Promise<any>) => {
  return (async (...args: any[]) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("SertoUiContext mock API request resolving. Request args:", ...args);
        resolve(response);
      }, 500),
    );
  }) as any;
};

export interface NftIdentifierResult {
  contractAddress: string;
  tokenId: string;
  error: string;
}

export function getNftIdentifiersFromUrl(url: string): NftIdentifierResult {
  let contractAddress = "";
  let tokenId = "";
  let error = "";
  if (url) {
    const splitVal = url.split("?");
    if (splitVal && splitVal.length > 0) {
      url = splitVal[0];
    }
    const splitURL = url.split("/");
    const length = splitURL.length;
    if (length < 2) {
      error = "Contract Address or TokenID not found on URL";
    } else {
      const theorizedAddress = splitURL[length - 2];
      const addressMatch = theorizedAddress.startsWith("0x") && theorizedAddress.length == 42;
      if (!addressMatch) {
        error = "Unable to find Contract Address in provided URL";
      } else {
        contractAddress = theorizedAddress;
        const tokenIdMatch = splitURL[length - 1].match("[0-9]+");
        if (!tokenIdMatch || tokenIdMatch.length == 0) {
          error = "Unable to find Token ID in provided URL";
        } else {
          tokenId = tokenIdMatch[0];
        }
      }
    }
  }
  return { contractAddress, tokenId, error };
}
