'use strict';

import {assert, validator} from "../deps_test.ts"
import {assertValidApp, assertValidUrl} from "./common.ts";
import * as gplay from "../index.ts"
import {Collection} from "../index.ts";

Deno.test('should fetch a valid application list for the top free collection', async () => {
  await gplay.list({
    collection: gplay.Collection.TOP_FREE,
    num: 100
  })
    .then((apps) => apps.map(assertValidApp))
    .then((apps) => apps.map((app) => assert(app.free)));
});

Deno.test('should fetch a valid application list for the top paid collection', async () => {
  await gplay.list({
    collection: gplay.Collection.TOP_PAID,
    num: 100
  })
    .then((apps) => apps.map(assertValidApp))
    .then((apps) => apps.map((app) => assert.isFalse(app.free)));
});

Deno.test('should fetch a valid application on a given collection regardless of the language', async () => {
  await gplay.list({
    collection: gplay.Collection.TOP_FREE,
    country: 'ru',
    lang: 'ru',
    num: 5
  })
    .then((apps) => apps.map(assertValidApp))
    .then((apps) => apps.map((app) => assert(app.free)));
});

Deno.test('should fetch a valid application list for the given category and collection', async () => {
  await gplay.list({
    category: gplay.Category.GAME_ACTION,
    collection: gplay.Collection.TOP_FREE
  })
    .then((apps) => apps.map(assertValidApp))
    .then((apps) => apps.map((app) => assert(app.free)));
});

Deno.test('should fetch a valid application list for the top free collection and GAME category', async () => {
  await gplay.list({
    collection: Collection.TOP_FREE,
    category: gplay.Category.GAME,
    num: 100
  })
    .then((apps) => apps.map(assertValidApp))
    .then((apps) => apps.map((app) => assert(app.free)));
});

Deno.test('should return error for application list for the grossing collection and FAMILY category', () => {
  const collection = gplay.Collection.GROSSING;

  return gplay.list({
    collection,
    category: gplay.Category.FAMILY,
    num: 100
  })
    .catch((error) => assert.equal(error.message, `The collection ${collection} is invalid for the given category, top apps or new apps`));
});

Deno.test('should fetch apps for application list for the new free collection and FAMILY category', async () => {
  await gplay.list({
    collection: gplay.Collection.TOP_FREE,
    category: gplay.Category.FAMILY,
    num: 100
  })
    .then((apps) => apps.map(assertValidApp))
    .then((apps) => apps.map((app) => assert(app.free)));
});

Deno.test('should fetch apps with fullDetail', async () => {
  await gplay.list({
    category: gplay.Category.GAME_ACTION,
    collection: gplay.Collection.TOP_FREE,
    fullDetail: true,
    num: 5
  })
    .then((apps) => apps.map(assertValidApp))
    .then((apps) => apps.map((app) => {
      assert.isNumber(app.minInstalls);
      assert.isNumber(app.reviews);

      assert.isString(app.description);
      assert.isString(app.descriptionHTML);
      assert.isString(app.released);

      assert.equal(app.genre, 'Action');
      assert.equal(app.genreId, 'GAME_ACTION');

      assert.isString(app.version || '');
      assert.isString(app.size || '');
      assert.isString(app.androidVersionText);
      assert.isString(app.androidVersion);
      assert.isString(app.contentRating);

      assert.equal(app.priceText, 'Free');
      assert(app.free);

      assert.isString(app.developer);
      assert.isString(app.developerId);
      if (app.developerWebsite) {
        assertValidUrl(app.developerWebsite);
      }
      assert(validator.isEmail(app.developerEmail), `${app.developerEmail} is not an email`);

      ['1', '2', '3', '4', '5'].map((v) => assert.property(app.histogram, v));
      app.screenshots.map(assertValidUrl);
      app.comments.map(assert.isString);
    }));
});

// fetch last page of new paid apps, which have a bigger chance of including
// results with no downloads (less fields, prone to failures)
Deno.test('It should not fail with apps with no downloads', async () => {
    await gplay.list({
      category: gplay.Category.GAME_ACTION,
      collection: gplay.Collection.TOP_PAID,
      num: 20
    })
      .then((apps) => apps.map(assertValidApp))
  }
);

Deno.test('It should not fail with apps with no downloads and fullDetail', async () => {
    await gplay.list({
      category: gplay.Category.GAME_ACTION,
      collection: gplay.Collection.TOP_FREE,
      num: 10,
      fullDetail: true
    })
      .then((apps) => apps.map(assertValidApp))
  }
);

Deno.test('should be able to retreive a list for each category', async () => {
  const categoryIds = Object.keys(gplay.Category);

  const fetchCategory = (category) => gplay.list({
    category,
    collection: gplay.Collection.TOP_FREE,
    num: 10
  }).catch(() => {
    if (category !== gplay.Category.WATCH_FACE) {
      assert.equal(category, void 0, 'invalid category');
    }
  });

  await Promise.all(categoryIds.map(fetchCategory));
})
