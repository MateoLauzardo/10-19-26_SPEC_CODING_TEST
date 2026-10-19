import { expect, test } from '@playwright/test'

test('page loads', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Drawing game' }),
  ).toBeVisible()
})
