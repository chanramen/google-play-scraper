import {BaseOptions} from "../options.ts";

interface PermissionsRequestOptions extends BaseOptions {
  appId: string
  lang?: string
  short?: boolean
}

export type {PermissionsRequestOptions}