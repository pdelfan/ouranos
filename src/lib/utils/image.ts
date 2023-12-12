import { BskyAgent } from "@atproto/api";
import imageCompression from "browser-image-compression";

export function getAvatarSize(size?: AvatarSize): number[] {
  switch (size) {
    case "xs":
      return [20, 20];
    case "sm":
      return [30, 30];
    case "md":
      return [50, 50];
    case "lg":
      return [70, 70];
    default:
      return [40, 40];
  }
}

export async function compressImage(image: UploadImage) {
  try {
    const compressed = await imageCompression(image, {
      maxSizeMB: 1,
      maxWidthOrHeight: 3000,
      fileType: "image/jpeg",
      initialQuality: 0.9,
    });
    return compressed;
  } catch (error) {
    throw new Error("Could not compress image");
  }
}