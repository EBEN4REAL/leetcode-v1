export function clipText<T extends string>(text: T, maxLength: number) {
  if (text) {
    if (text.length <= maxLength) {
      return text;
    }

    const clippedText = text.substring(0, maxLength) + "...";
    return clippedText as T;
  }
}
