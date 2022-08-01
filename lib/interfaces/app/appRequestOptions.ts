import {BaseOptions} from "../options.ts";

interface AppRequestOptions extends BaseOptions{
  appId: string
  lang?: string
  country?: string
}

export type {AppRequestOptions}