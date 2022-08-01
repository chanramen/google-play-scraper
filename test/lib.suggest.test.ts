import {assert} from "../deps_test.ts"
import * as gplay from "../index.ts"


Deno.test('should return five suggestion for a common term', () => gplay.suggest({term: 'p'})
  .then((results) => {
    assert.equal(results.length, 5, `expected ${results} to have 5 elements`);
    results.map((r) => assert.include(r.toLowerCase(), 'p'));
  }));

Deno.test('should return different results for different languages', () => Promise.all([
  gplay.suggest({term: 'p'}),
  gplay.suggest({term: 'p', country: 'fr', lang: 'fr'})
])
  .then(([resultsEn, resultsFr]) => {
    assert.notSameOrderedMembers(resultsEn, resultsFr, `expected ${resultsEn} and ${resultsFr} not to be the same`);
  }));
