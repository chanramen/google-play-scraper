import {BaseOptions} from "../options.ts";

interface SimilarRequestOptions extends BaseOptions{
  appId: string
  lang?: string
  country?: string
  fullDetail?: boolean
}

export type {SimilarRequestOptions}