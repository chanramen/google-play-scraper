import {debug as debugInit} from "../../deps.ts"
import throttled from "./throttle.ts";
import type {FetchOptions} from "../interfaces/options.ts";

const debug = debugInit('google-play-scraper');

type ErrorResponse = {
  statusCode: number
}

class NetworkError extends Error{
  constructor(message: string, public response: ErrorResponse) {
    super(message);
  }
}

async function fetchUrl(opts: FetchOptions): Promise<{ body: string }> {
  const res = await fetch(opts.url, {
    redirect: opts.followRedirect === true ? "follow" : undefined,
    method: opts.method === undefined ? "GET" : opts.method,
    body: opts.body,
    headers: opts.headers
  })
  if (res.status >= 400) {
    await res.body?.cancel()
    throw new NetworkError(res.statusText, {statusCode: res.status})
  }
  return {body: await res.text()}
}

function doRequest(opts: FetchOptions, limit?: number): Promise<string> {
  let req: (opts: FetchOptions) => Promise<{body: string}>;
  if (limit) {
    req = throttled(
      fetchUrl, {
        interval: 1000,
        limit: limit
      }
    );
  } else {
    req = fetchUrl;
  }

  return new Promise((resolve, reject) => {
    req(opts)
      .then((response) => resolve(response.body))
      .catch((error) => reject(error));
  });
}

function request (opts: FetchOptions, limit?: number): Promise<string> {
  debug('Making request: %j', opts);
  return doRequest(opts, limit)
    .then(function (response) {
      debug('Request finished');
      return response;
    })
    .catch(function (reason: NetworkError) {
      debug('Request error:', reason.message, reason.response && reason.response.statusCode);

      let message = 'Error requesting Google Play:' + reason.message;
      if (reason.response && reason.response.statusCode === 404) {
        message = 'App not found (404)';
      }
      throw Error(message);
    });
}

export default request;
