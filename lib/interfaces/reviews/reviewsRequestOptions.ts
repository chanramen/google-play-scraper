import {BaseOptions} from "../options.ts";
import {Sort} from "../../constants.ts";


interface ReviewsRequestOptions extends BaseOptions {
  appId: string
  lang?: string
  country?: string
  sort?: Sort
  num?: number,
  paginate?: boolean
  nextPaginationToken?: string
}

export type {ReviewsRequestOptions}