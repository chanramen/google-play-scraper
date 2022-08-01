import {BASE_URL} from "./constants.ts";
import {cheerio} from "../deps.ts"
import request from "./utils/request.ts";
import {CategoriesRequestOptions} from "./interfaces/categories/categoriesRequestOptions.ts";
import {CheerioAPI} from "https://esm.sh/v89/cheerio@1.0.0-rc.12/lib/load.d.ts";

const PLAYSTORE_URL = `${BASE_URL}/store/apps`;
const CATEGORY_URL_PREFIX = '/store/apps/category/';

function categories (opts?: CategoriesRequestOptions): Promise<string[]> {
  opts = Object.assign({}, opts);

  return new Promise(function (resolve, reject) {
    const options = Object.assign(
      {
        url: PLAYSTORE_URL
      },
      opts?.requestOptions
    );

    request(options, opts?.throttle)
      .then(cheerio.load)
      .then(extractCategories)
      .then(resolve)
      .catch(reject);
  });
}

function extractCategories ($: CheerioAPI): string[] {

  function filterUndefined<T>(value: T | undefined): value is T {
    return value !== undefined
  }

  const categoryIds = $('ul li a')
    .toArray()
    .map((el) => $(el).attr('href'))
    .filter(filterUndefined)
    .filter((url) => url.startsWith(CATEGORY_URL_PREFIX) && !url.includes('?age='))
    .map((url) => url.substr(CATEGORY_URL_PREFIX.length));
  categoryIds.push('APPLICATION');

  return categoryIds;
}

export default categories
