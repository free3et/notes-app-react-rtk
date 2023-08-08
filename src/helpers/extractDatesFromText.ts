export function extractDatesFromText(text: string): string[] {
  const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
  return text.match(dateRegex) || [];
}
