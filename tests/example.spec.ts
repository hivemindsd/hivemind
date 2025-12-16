import { test, expect } from '@playwright/test'

let email = 'nazarit1@iastate.edu'
let password = 'FakePassword!'

test('has title', async ({ page }) => {
	await page.goto('/auth/login')

	// Expect a title "to contain" a substring
	await expect(page).toHaveTitle(/Hivemind/)
})

/* 
  Test when a user has an account
*/

// test('login test success', async ({ page }) => {
// 	await page.goto('/auth/login')

// 	// enter email and password
// 	await page.getByLabel('Email').fill(email)
// 	await page.getByLabel('Password').fill(password)

// 	// Click the get started link.
// 	await page.getByRole('button', { name: 'Login' }).click()

// 	// Expects page to have a heading with the name of Installation.
// 	await expect(page.getByText('Your organizations')).toBeVisible()
// })

// /*
//   Test when a user does not have an account
// */
// test('login test failure', async ({ page }) => {
// 	await page.goto('/auth/login')

// 	// enter email and password
// 	await page.getByLabel('Email').fill('noaccount@gmail.com')
// 	await page.getByLabel('Password').fill('whoami')

// 	// Click the get started link.
// 	await page.getByRole('button', { name: 'Login' }).click()

// 	// Expects page to have a heading with the name of Installation.
// 	await expect(page.getByText('Invalid login credentials')).toBeVisible()
// })
