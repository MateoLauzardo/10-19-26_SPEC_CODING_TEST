import { expect, test } from '@playwright/test'

test('page loads and shows a word', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Drawing game' }),
  ).toBeVisible()
  await expect(page.getByTestId('word')).toHaveText(/^[a-z]+$/)
})
