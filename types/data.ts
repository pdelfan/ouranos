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

enum LikelyType {
  HTML,
  Text,
  Image,
  Video,
  Audio,
  AptData,
  Other,
}

interface LinkMeta {
  error?: string;
  likelyType: LikelyType;
  url: string;
  title?: string;
  description?: string;
  image?: string;
}
