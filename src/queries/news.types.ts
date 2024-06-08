export type TNews = {
    // unique ID of the article
    newsId: string

    // title of the article
    title: string

    // short description of the article
    description: string

    // URL to original article
    sourceUrl: string

    // URL of article thumbnail (optional)
    imageUrl?: string

    // ISO 8601 formatted date of publication time
    publishedAt: string

    // the source of the article
    source: {
        // unique ID of news source
        id: string

        // human readable name of news source
        name: string
    }

    // array of ticker symbols mentioned in the article
    symbols: string[]

    // industries of the tickers mentioned in the article
    industries: string[]

    // sectors of the tickers mentioned in the article
    sectors: string[]

    // crawled content
    content: string

    url?: string
}
