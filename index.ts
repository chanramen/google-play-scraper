'use strict';

import {R} from "./deps.ts"
import * as constants from "./lib/constants.ts"

import appMethod from "./lib/app.ts";
import list from "./lib/list.ts";
import search from "./lib/search.ts";
import suggest from "./lib/suggest.ts";
import developer from "./lib/developer.ts";
import reviews from "./lib/reviews.ts";
import similar from "./lib/similar.ts";
import permissions from "./lib/permissions.ts";
import categories from "./lib/categories.ts";

const searchMethod = R.partial(search, [appMethod]);

// There was a memoized version which was deleted because of 2 reasons:
// 1. Memoizee library is broken in CDNs and is not so easy to port (or rewrite from scratch)
// 2. Caching results from GP api is in fact should not be implemented by scraper library,
// since it creates mixing of domains (scraping tools suddenly becomes in-memory cache storage).
// Given these two reasons, I decided to delete memoized versions from scraper. If you want to cache received data,
// please, implement caching mechanism yourself (you might want to use memcached or redis)


export * from "./lib/constants.ts"
export {appMethod as app, list, suggest, developer, reviews, similar, permissions, categories, searchMethod as search}
