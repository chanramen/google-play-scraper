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

export type {BaseOptions, RequestOptions, FetchOptions}
export {Method}