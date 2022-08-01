import {BaseOptions} from "../options.ts";

interface DeveloperRequestOptions extends BaseOptions {
  devId: string
  lang?: string
  country?: string
  num?: number
  fullDetail?: boolean
}

export type {DeveloperRequestOptions}