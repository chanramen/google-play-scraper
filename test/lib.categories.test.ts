import {assert} from "../deps_test.ts"
import * as gplay from "../index.ts"
import {R} from "../deps.ts"

Deno.test('should fetch valid list of categories', () => {
  return gplay.categories().then(categories => {
    assert.isArray(categories);
    assert.isTrue(categories.length > 0);
  });
});

Deno.test('should have all categories from constant list of categories', () => {
  return gplay.categories().then(categories => {
    const categoriesConst = Object.keys(gplay.Category);
    assert.deepEqual(
      R.difference(categories, categoriesConst),
      [],
      'Google Play has categories that are not in "category" constant'
    );
  });
});
