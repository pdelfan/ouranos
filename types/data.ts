interface EmojiData {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string[];
  unified: string;
}

interface Language {
  code: string;
  name: string;
}

interface UploadImage {
  url: string;
  path?: string;
  altText?: string;
}
