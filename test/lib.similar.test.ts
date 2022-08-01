import {assert} from "../deps_test.ts"
import * as gplay from "../index.ts"
import {assertValidApp} from "./common.ts";


Deno.test('should fetch a valid application list', async () => {
  await gplay.similar({appId: 'com.mojang.minecraftpe'})
    .then((apps) => apps.map(assertValidApp));
});

Deno.test('should fetch games from different developers', async () => {
  await gplay.similar({appId: 'com.mojang.minecraftpe'})
    .then((apps) => assert.isTrue(apps.some(app => app.developer !== apps[0].developer)));
});
