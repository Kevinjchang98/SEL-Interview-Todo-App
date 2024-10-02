import {expect, test} from "@playwright/test";

test('handles empty api response gracefully', async ({page}) => {
  // Mock backend returning empty list
  await page.route(`${process.env.NEXT_PUBLIC_DB_HOST}/`, async route => {
    const json: Array<string> = [];
    await route.fulfill({json});
  })

  await page.goto('/')

  await expect(page.getByText('No tasks yet. Try creating some!')).toBeVisible();
})

