import throttled from "../lib/utils/throttle.ts"

Deno.test('Should make three requests with 5000ms interval. (Throttle function)', async function () {
  const req: typeof fetch = throttled(fetch, {
    limit: 1,
    interval: 5000
  });

  async function makeRequest(): Promise<number> {
    const result = await req("https://httpbin.org/uuid")
    await result.body?.cancel()
    return new Date(result.headers.get("date")!!).getTime()
  }

  const firstReqTime = await makeRequest();
  const secondReqTime = await makeRequest();
  const thirdReqTime = await makeRequest();
  const firstAndSecondReq = secondReqTime - firstReqTime;
  const secondAndThirdReq = thirdReqTime - secondReqTime;
  if (
    !((firstAndSecondReq >= 5000 && firstAndSecondReq <= 6500) &&
      (secondAndThirdReq >= 5000 && secondAndThirdReq <= 6500))
  ) {
    throw new Error('Wrong interval beetween requests.');
  }
});
