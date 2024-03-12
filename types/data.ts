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

interface UploadImage extends File {
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

type AuditLog = {
  cid: string;
  createdAt: string;
}[];

interface Theme {
  label: string;
  value: string;
}
