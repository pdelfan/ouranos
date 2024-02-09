export function abbreviateNumber(num: number): string {
  if (num < 1000) {
    return num.toString(); // Return the number as-is if less than 1000
  }

  const units = ["k", "m"];
  let unitIndex = -1;

  do {
    num /= 1000;
    unitIndex++;
  } while (num >= 1000 && unitIndex < units.length - 1);

  return num.toFixed(1) + units[unitIndex];
}
