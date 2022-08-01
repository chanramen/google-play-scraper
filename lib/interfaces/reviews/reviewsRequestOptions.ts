import {BaseOptions} from "../options.ts";

// FIXME change sort to enum

interface ReviewsRequestOptions extends BaseOptions {
  appId: string
  lang?: string
  country?: string
  sort?: number
  num?: number,
  paginate?: boolean
  nextPaginationToken?: string
}

export type {ReviewsRequestOptions}