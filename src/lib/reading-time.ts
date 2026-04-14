/** Presentation-only helpers for article reading UX (word count / duration estimates). */

export function stripHtmlForReading(value: string) {
  return value
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function estimateReadingMinutesFromText(text: string, wordsPerMinute = 200) {
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export function estimateReadingMinutesFromHtml(html: string, wordsPerMinute = 200) {
  return estimateReadingMinutesFromText(stripHtmlForReading(html), wordsPerMinute)
}
