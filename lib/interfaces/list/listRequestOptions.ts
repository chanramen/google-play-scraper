import {BaseOptions} from "../options.ts";

// FIXME change collection, category and age to enums

interface ListRequestOptions extends BaseOptions{
  collection?: string
  category?: string
  age?: string
  num?: number
  lang?: string
  country?: string
  fullDetail?: boolean
}

export type {ListRequestOptions}