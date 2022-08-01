import {BaseOptions} from "../options.ts";

enum Price {
  FREE = 1,
  ALL = 0,
  PAID = 2
}

interface SearchRequestOptions extends BaseOptions {
  term: string
  num?: number
  lang?: string
  country?: string
  fullDetail?: boolean
  price?: Price
}

export type {SearchRequestOptions}
export {Price}