interface ReviewItem {
  id: string | null
  userName: string
  userImage: string
  date: string
  score: number
  scoreText: string
  url: string
  title: string
  text: string
  replyDate: string
  replyText: string
  version: string
  thumbsUp: number
  criterias: Array<{
    criteria: string
    rating: number
  }>
}

interface ReviewsPaginationData {
  data: ReviewItem[],
  nextPaginationToken: string
}

export type {ReviewItem, ReviewsPaginationData}