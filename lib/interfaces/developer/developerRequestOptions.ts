import {BaseAppRequestOptions} from "../options.ts";
import {AppItem, AppItemFullDetail} from "../app/appItem.ts";

interface BaseDeveloperRequestOptions extends BaseAppRequestOptions {
  devId: string
  lang?: string
  country?: string
  num?: number
}

interface FullDetailDeveloperRequestOptions extends BaseDeveloperRequestOptions {
  fullDetail: true
}

interface StandardDetailDeveloperRequestOptions extends BaseDeveloperRequestOptions {
  fullDetail?: false | undefined
}

type DeveloperRequestOptions = FullDetailDeveloperRequestOptions | StandardDetailDeveloperRequestOptions
type DeveloperRequestOptionsReturnType<T extends DeveloperRequestOptions> = T extends FullDetailDeveloperRequestOptions ? AppItemFullDetail : AppItem

export type {DeveloperRequestOptions, FullDetailDeveloperRequestOptions, StandardDetailDeveloperRequestOptions, DeveloperRequestOptionsReturnType}