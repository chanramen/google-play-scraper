import * as gplay from "../index.ts"
import {assert} from "../deps_test.ts"
import {assertValidUrl} from "./common.ts";
import * as c from "../lib/constants.ts"

function assertValid(review) {
  if (review.id !== null) {
    assert.isString(review.id);
    assert(review.id);
  }
  assert.isString(review.userName);
  assertValidUrl(review.userImage);
  assert(review.userName);
  assert.isNotNull(new Date(review.date).toJSON());
  assert.isString(review.date);
  assert(review.date);
  assert.isNull(review.title);
  assert.isString(review.text);
  assert.isNumber(review.score);
  assert(review.score > 0);
  assert(review.score <= 5);
  assertValidUrl(review.url);
  assert.hasAnyKeys(review, 'replyDate');
  assert.hasAnyKeys(review, 'replyText');
  assert.hasAnyKeys(review, 'version');
  assert.hasAnyKeys(review, 'thumbsUp');
  assert.hasAnyKeys(review, 'criterias');
}


Deno.test('should retrieve the most recent reviews of an app', () => {
  return gplay.reviews({appId: 'com.dxco.pandavszombies'})
    .then((reviews) => {
      reviews.data.map(assertValid);
    });
});

Deno.test('should retrieve the most helpfull reviews of an app', () => {
  return gplay.reviews({
    appId: 'com.dxco.pandavszombies',
    sort: c.Sort.HELPFULNESS
  })
    .then((reviews) => {
      reviews.data.map(assertValid);
    });
});

Deno.test('should retrieve the most rated reviews of an app', () => {
  return gplay.reviews({
    appId: 'com.dxco.pandavszombies',
    sort: c.Sort.RATING
  })
    .then((reviews) => {
      reviews.data.map(assertValid);
    });
});

Deno.test('should retrieve the reviews of an app in Japanese', () => {
  return gplay.reviews({appId: 'com.dxco.pandavszombies', lang: 'ja'})
    .then((reviews) => {
      reviews.data.map(assertValid);
    });
});

Deno.test('should accept pagination', () => {
  return gplay.reviews({
    appId: 'com.facebook.katana',
    paginate: true
  })
    .then((reviews) => {
      reviews.data.map(assertValid);
      assert.equal(reviews.data.length, 150);
      assert.isNotNull(reviews.nextPaginationToken);
    });
});

Deno.test('should get different reviews for nextPageToken', async () => {
  const firstPageReviews = await gplay.reviews({
    appId: 'com.facebook.katana',
    paginate: true
  });
  const {data, nextPaginationToken} = firstPageReviews;

  assert.equal(data.length, 150);
  assert.isNotNull(nextPaginationToken);

  const secondPageReviews = await gplay.reviews({
    appId: 'com.facebook.katana',
    paginate: true,
    nextPaginationToken
  });
  const {data: dataSecondPage, nextPaginationToken: secondPaginationToken} = secondPageReviews;

  assert.equal(dataSecondPage.length, 150);
  assert.isNotNull(secondPaginationToken);
  assert.notDeepEqual(data, dataSecondPage);
});

