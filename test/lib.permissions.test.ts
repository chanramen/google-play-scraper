import * as gplay from "../index.ts"
import {assert} from "../deps_test.ts"


Deno.test('should return an array of permissions and descriptions', () =>
  gplay.permissions({appId: 'com.sgn.pandapop.gp'})
    .then((results) => {
      assert(results.length);
      results.map((perm) => {
        assert.isString(perm.permission);
        assert.isString(perm.type);
      });
    }));

Deno.test('should return an array of permissions and descriptions for different response format', () =>
  gplay.permissions({appId: 'air.tv.ingames.cubematch.free'})
    .then((results) => {
      assert(results.length);
      results.map((perm) => {
        assert.isString(perm.permission);
        assert.isString(perm.type);
      });
    }));

Deno.test('should return skip descriptions if short option is passed', () =>
  gplay.permissions({appId: 'com.sgn.pandapop.gp', short: true})
    .then((results) => {
      assert(results.length);
      results.map(assert.isString);
    }));

Deno.test('should return skip descriptions if short option is passed for different response format', () =>
  gplay.permissions({appId: 'air.tv.ingames.cubematch.free', short: true})
    .then((results) => {
      assert(results.length);
      results.map(assert.isString);
    }));

Deno.test('should return even if app have no common permissions', () =>
  gplay.permissions({appId: 'com.skybornegames.battlepop'})
    .then((results) => {
      assert(results.length);
      results.map((perm) => {
        assert.isString(perm.permission);
        assert.isString(perm.type);
      });
    }));

Deno.test('should return empty if app have no common permissions and short option is passed', () =>
  gplay.permissions({appId: 'com.skybornegames.battlepop', short: true})
    .then((results) => {
      assert.equal(0, results.length);
    }));
