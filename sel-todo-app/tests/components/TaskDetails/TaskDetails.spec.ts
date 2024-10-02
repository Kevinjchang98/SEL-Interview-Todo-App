import {test} from "@playwright/test";

test("redirects to index on invalid id", async ({page}) => {
  // Mock backend returning empty data
  await page.route(`${process.env.NEXT_PUBLIC_DB_HOST}/`, async (route) => {
    const json: Array<string> = [];
    await route.fulfill({ json });
  });

  await page.goto("/details/42");

  await page.waitForURL("/")
})