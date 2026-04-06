import { NextResponse } from 'next/server'

export const revalidate = 3600 // cache for 1 hour

export async function GET() {
  try {
    // Fetch Trustpilot page and extract review data
    const res = await fetch('https://www.trustpilot.com/review/koushikranjit.in', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
    })

    const html = await res.text()

    // Extract rating
    const ratingMatch = html.match(/data-rating="([^"]+)"/)
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null

    // Extract total review count
    const countMatch = html.match(/(\d+)\s*reviews?/i)
    const reviewCount = countMatch ? parseInt(countMatch[1]) : null

    // Extract individual reviews
    const reviews: { name: string; stars: number; text: string; date: string }[] = []

    // Match review cards - try multiple patterns
    const reviewBlocks = html.match(/data-service-review-card-paper[^>]*>[\s\S]*?<\/article>/g) ||
                         html.match(/class="[^"]*review-card[^"]*"[\s\S]*?<\/article>/g) || []

    for (const block of reviewBlocks) {
      const nameMatch = block.match(/data-consumer-name="([^"]+)"/) || block.match(/<span[^>]*>([^<]+)<\/span>/)
      const starsMatch = block.match(/data-service-review-rating="(\d)"/) || block.match(/rating-(\d)/)
      const textMatch = block.match(/data-service-review-text-typography="([^"]+)"/) || block.match(/<p[^>]*review-content[^>]*>([^<]+)</)
      const dateMatch = block.match(/datetime="([^"]+)"/)

      if (nameMatch) {
        reviews.push({
          name: nameMatch[1],
          stars: starsMatch ? parseInt(starsMatch[1]) : 5,
          text: textMatch ? textMatch[1] : '',
          date: dateMatch ? dateMatch[1] : '',
        })
      }
    }

    // If we got rating from page
    if (rating !== null || reviewCount !== null) {
      return NextResponse.json(
        {
          rating: rating || 4.9,
          count: reviewCount || 7,
          reviews: reviews.length > 0 ? reviews : null,
        },
        { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' } }
      )
    }

    // Fallback — return last known values
    return NextResponse.json({ rating: 4.9, count: 7, reviews: null })
  } catch {
    return NextResponse.json({ rating: 4.9, count: 7, reviews: null })
  }
}
