interface BaseOptions {
  throttle?: number
  requestOptions?: RequestOptions
}

interface RequestOptions {
}

enum Method {
  GET = "GET",
  POST = "POST"
}

interface FetchOptions extends RequestOptions {
  url: string
  followRedirect?: boolean
  method?: Method
  body?: string
  headers?: Record<string, string>
}

interface BaseAppRequestOptions extends BaseOptions{
  fullDetail?: boolean
}

export type {BaseOptions, RequestOptions, FetchOptions, BaseAppRequestOptions}
export {Method}