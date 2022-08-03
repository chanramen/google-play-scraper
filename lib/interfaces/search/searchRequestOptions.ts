import {BaseAppRequestOptions} from "../options.ts";
import {AppItemFullDetail} from "../app/appItem.ts";

enum Price {
  FREE = 1,
  ALL = 0,
  PAID = 2
}

interface BaseSearchRequestOptions extends BaseAppRequestOptions {
  term: string
  num?: number
  lang?: string
  country?: string
  fullDetail?: boolean
  price?: Price
}

interface FullDetailSearchRequestOptions extends BaseSearchRequestOptions {
  fullDetail: true
}

interface StandardDetailSearchRequestOptions extends BaseSearchRequestOptions {
  fullDetail?: false | undefined
}

type SearchRequestOptions = FullDetailSearchRequestOptions | StandardDetailSearchRequestOptions
type SearchRequestOptionsReturnType<T extends SearchRequestOptions> = T extends FullDetailSearchRequestOptions ? AppItemFullDetail : StandardDetailSearchRequestOptions

export type {
  SearchRequestOptions,
  FullDetailSearchRequestOptions,
  StandardDetailSearchRequestOptions,
  SearchRequestOptionsReturnType
}
export {Price}