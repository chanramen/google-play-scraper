interface AppItem {
  url: string
  appId: string
  title: string
  summary: string
  developer: string
  developerId: string
  icon: string
  score: number
  scoreText: string
  priceText: string
  free: boolean
}

interface AppItemFullDetail extends AppItem {
  appId: string
  url: string
  title: string
  description: string
  descriptionHTML: string
  summary: string
  installs: string
  minInstalls: number
  maxInstalls: number
  score: number
  scoreText: string
  ratings: number
  reviews: number
  histogram: { '1': number, '2': number, '3': number, '4': number, '5': number }
  price: number
  free: boolean
  currency: string
  priceText: string
  available: boolean,
  offersIAP: boolean,
  IAPRange: string
  size: string
  androidVersion: string
  androidVersionText: string
  developer: string
  developerId: string
  developerInternalID: string
  developerEmail: string
  developerWebsite: string
  developerAddress: string
  genre: string
  genreId: string
  familyGenre: string
  familyGenreId: string
  icon: string
  headerImage: string
  screenshots: string[]
  video: string
  videoImage: string
  contentRating: string
  contentRatingDescription: string
  adSupported: boolean
  released: string
  updated: number
  version: string
  recentChanges: string
  comments: string[]
  privacyPolicy: string
}

export type {AppItem, AppItemFullDetail}