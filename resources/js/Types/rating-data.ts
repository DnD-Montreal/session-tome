export type RatingData = {
    entry_id: number
    user_id: number
    author_id: number
    rating_data: RatingCategoryType
}

export type RatingCategoryType = {
    creative: boolean
    flexible: boolean
    friendly: boolean
    helpful: boolean
    prepared: boolean
}
