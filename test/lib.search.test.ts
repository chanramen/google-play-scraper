import * as gplay from "../index.ts"
import {assertValidApp, assertIdsInArray} from "./common.ts";
import {assert} from "../deps_test.ts"


Deno.test('should fetch a valid application list', () => {
  return gplay.search({term: 'Panda vs Zombies'})
    .then((apps) => apps.map(assertValidApp));
});

Deno.test('should validate the results number', function () {
  const count = 5;
  return gplay.search({
    term: 'vr',
    num: count
  })
    .then((apps) => {
      apps.map(assertValidApp);
      assert(apps.length === count, `should return ${count} items but ${apps.length} returned`);
    });
});

// preregister tend to have some fields missing, increasing chances of failure
// by searching "preregister" we have more chances of getting some in the results
Deno.test('should search for pre register', () =>
  gplay.search({term: 'preregister', num: 10})
    .then((apps) => apps.map(assertValidApp)));

Deno.test('should search for pre register with fullDetail', () =>
  gplay.search({term: 'preregister', num: 10, fullDetail: true})
    .then((apps) => apps.map(assertValidApp)))

Deno.test('should fetch multiple pages of distinct results', () =>
  gplay.search({term: 'p', num: 55})
    .then((apps) => {
      assert.equal(apps.length, 55, 'should return as many apps as requested');
    }));

Deno.test('should fetch multiple pages of when not starting from cluster of subsections', () =>
  gplay.search({term: 'p', num: 65})
    .then((apps) => {
      assert.equal(apps.length, 65, 'should return as many apps as requested');
    }));

  Deno.test('should fetch a valid application list for eu country', () => {
    return gplay.search({term: 'Panda vs Zombies', country: 'GH'})
      .then((apps) => apps.map(assertValidApp));
  });

  Deno.test('should fetch a valid application list for non eu country', () => {
    return gplay.search({term: 'Facebook', country: 'GE'})
      .then((apps) => apps.map(assertValidApp));
  });

  Deno.test('should fetch a valid application list for eu country with specific language', () => {
    return gplay.search({term: 'Panda vs Zombies', country: 'BE', lang: 'it'})
      .then((apps) => apps.map(assertValidApp));
  });

Deno.test('schould return few netflix apps', () => {
  return gplay.search({term: 'netflix'})
    .then((apps) => {
      assert.equal(apps[0].appId, 'com.netflix.mediaclient');
      assertIdsInArray(apps, 'com.netflix.ninja', 'com.netflix.NGP.StrangerThings');
    });
});

Deno.test('should return few netflix apps from german store with german language', () => {
  return gplay.search({term: 'netflix', lang: 'de', country: 'DE'})
    .then((apps) => {
      assert.equal(apps[0].appId, 'com.netflix.mediaclient');
      assertIdsInArray(apps, 'com.netflix.ninja', 'com.netflix.NGP.StrangerThings');
    });
});

Deno.test('should reutrn few google mail apps', () => {
  return gplay.search({term: 'gmail'})
    .then((apps) => {
      assert.equal(apps[0].appId, 'com.google.android.gm');
      assertIdsInArray(apps, 'com.google.android.gm.lite', 'com.google.android.apps.docs');
    });
});

Deno.test('should return apps for search with a category as query', () => {
  return gplay.search({term: 'games'})
    .then((apps) => assertIdsInArray(apps, 'com.kiloo.subwaysurf'));
});

Deno.test('should throw if no result returned', () => {
  return gplay.search({term: 'asdasdyxcnmjysalsaflaslf'})
    .catch((error) => {
      assert.isNotEmpty(error.message);
      assert.match(error.message, /asdasdyxcnmjysalsaflaslf/);
    });
});

Deno.test('should throw if no result returned in eu country store', () => {
  return gplay.search({term: 'ASyyDASDyyASDASD', country: 'DE', lang: 'SP'})
    .catch((error) => {
      assert.isNotEmpty(error.message);
      assert.match(error.message, /ASyyDASDyyASDASD/);
    });
});

Deno.test('should throw if no result returned in us store with other language', () => {
  return gplay.search({term: 'ASyyDASDyyASDASD', country: 'US', lang: 'FR'})
    .catch((error) => {
      assert.isNotEmpty(error.message);
      assert.match(error.message, /ASyyDASDyyASDASD/);
    });
});

Deno.test('should return apps from suggested search', () => {
  return gplay.search({term: 'runing app'})
    .then((apps) => {
      apps.map(assertValidApp);
      assertIdsInArray(apps, 'com.runtastic.android', 'running.tracker.gps.map', 'com.google.android.apps.fitness');
    });
});

Deno.test('should return apps from suggested search in european country', () => {
  return gplay.search({term: 'runing tracker', country: 'GR'})
    .then((apps) => {
      apps.map(assertValidApp);
      assertIdsInArray(apps, 'com.runtastic.android', 'running.tracker.gps.map', 'com.google.android.apps.fitness');
    });
});
