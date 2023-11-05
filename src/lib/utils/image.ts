export function getAvatarSize(size?: AvatarSize): number[] {
  switch (size) {
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