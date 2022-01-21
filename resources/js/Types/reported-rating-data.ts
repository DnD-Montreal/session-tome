export type ReportedRating = {
    CREATIVE: number
    FLEXIBLE: number
    FRIENDLY: number
    HELPFUL: number
    PREPARED: number
}

export type ReportedRatingData = {
    id: number
    name: string
    total_ratings: ReportedRating
}
