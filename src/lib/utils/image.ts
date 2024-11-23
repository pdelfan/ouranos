import imageCompression from "browser-image-compression";
import SmokeSignalLogo from "@/assets/images/smokeSignalLogo.png";
import WhiteWindLogo from "@/assets/images/whtwndLogo.jpg";
import LinkatLogo from "@/assets/images/LinkatLogo.jpg";
import FrontpageLogo from "@/assets/images/frontpageLogo.jpg";

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
      maxSizeMB: 0.95,
      maxWidthOrHeight: 3000,
      fileType: "image/jpeg",
      initialQuality: 0.9,
    });
    return compressed;
  } catch (error) {
    throw new Error("Could not compress image");
  }
}

export const getAtmosphereServiceLogo = (name: string) => {
  switch (name) {
    case "Smoke Signal":
      return SmokeSignalLogo.src;
    case "White Wind":
      return WhiteWindLogo.src;
    case "Linkat":
      return LinkatLogo.src;
    case "Frontpage":
      return FrontpageLogo;
    default:
      return "";
  }
};
