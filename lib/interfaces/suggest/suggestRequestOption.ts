import {BaseOptions} from "../options.ts";

interface SuggestRequestOption extends BaseOptions{
  term: string
  lang?: string
  country?: string
}

export type {SuggestRequestOption}