import {BaseAppRequestOptions} from "../options.ts";
import {Age, Category, Collection} from "../../constants.ts";
import {AppItem, AppItemFullDetail} from "../app/appItem.ts";


interface BaseListRequestOptions extends BaseAppRequestOptions {
  collection?: Collection
  category?: Category
  age?: Age
  num?: number
  lang?: string
  country?: string
}

interface FullDetailsListRequestOptions extends BaseListRequestOptions {
  fullDetail: true
}

interface StandardDetailsListRequestOptions extends BaseListRequestOptions {
  fullDetail?: false | undefined
}

type ListRequestOptions = FullDetailsListRequestOptions | StandardDetailsListRequestOptions

type ListRequestOptionsReturnType<T extends ListRequestOptions> = T extends FullDetailsListRequestOptions ? AppItemFullDetail : AppItem


export type {FullDetailsListRequestOptions, StandardDetailsListRequestOptions, ListRequestOptions, BaseListRequestOptions, ListRequestOptionsReturnType}