import {BaseAppRequestOptions} from "../options.ts";
import {AppItem, AppItemFullDetail} from "../app/appItem.ts";

interface BaseSimilarRequestOptions extends BaseAppRequestOptions {
  appId: string
  lang?: string
  country?: string
}

interface FullDetailsSimilarRequestOptions extends BaseSimilarRequestOptions {
  fullDetail: true
}

interface StandardDetailSimilarRequestOptions extends BaseSimilarRequestOptions {
  fullDetail?: false | undefined
}

type SimilarRequestOptions = FullDetailsSimilarRequestOptions | StandardDetailSimilarRequestOptions
type SimilarRequestOptionsReturnType<T extends SimilarRequestOptions> = T extends FullDetailsSimilarRequestOptions ? AppItemFullDetail : AppItem

export type {SimilarRequestOptions, FullDetailsSimilarRequestOptions, StandardDetailSimilarRequestOptions, SimilarRequestOptionsReturnType}