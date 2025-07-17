// @ts-check

const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, createBlog } from './helper'


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
  // Reset database
  try {
  const resetResponse = await request.post('http://localhost:3003/api/testing/reset')
  if (!resetResponse.ok()) {
    const body = await resetResponse.text()
      console.error('Reset failed:', resetResponse.status(), body)
      throw new Error(`Reset failed: ${resetResponse.status()} ${body}`)
  }
  
  // Create user with response validation
  const userResponse = await request.post('http://localhost:3003/api/users', {
    data: {
      name: 'new user',
      username: 'newuser',
      password: '123456'
    }
  })
  
  if (!userResponse.ok()) {
    const body = await userResponse.text()
    throw new Error(`User creation failed: ${userResponse.status()} ${body}`)
  }


  // create another user

  const userResponse2 = await request.post('http://localhost:3003/api/users', {
    data: {
      name: 'new user2',
      username: 'newuser2',
      password: '123456'
    }
  })
  
  if (!userResponse2.ok()) {
    const body = await userResponse2.text()
    throw new Error(`User creation failed: ${userResponse2.status()} ${body}`)
  }

  await page.goto('http://localhost:5173')
  } catch (error) {
    console.error('BeforeEach error:', error)
    throw error
  }
})

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {

    test('Verify login API', async ({ request }) => {
  const response = await request.post('http://localhost:3003/api/login', {
    data: {
      username: 'newuser',
      password: '123456'
    }
  })
  
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body.token).toBeDefined()
  expect(body.username).toBe('newuser')
})


    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('newuser')
      await page.getByTestId('password').fill('123456')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('new user logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

test('a new blog can be created', async ({ page }) => {
    await page.getByTestId('username').fill('newuser')
    await page.getByTestId('password').fill('123456')
    await page.getByRole('button', { name: 'login' }).click()
    
    await expect(page.getByText('new user logged in')).toBeVisible()
    
    await page.getByRole('button', { name: 'create blog' }).click()

    await page.getByTestId('title').fill('Test Blog')
    await page.getByTestId('author').fill('Test Author')
    await page.getByTestId('url').fill('http://testblog.com')
    await page.getByRole('button', { name: 'create' }).click()

    await expect(page.getByText('TITLE: Test Blog')).toBeVisible()
  })

  test('a blog can be liked', async ({ page }) => {
    
    await loginWith(page, 'newuser', '123456')
    await expect(page.getByText('new user logged in')).toBeVisible()
    await page.getByRole('button', { name: 'create blog' }).click()

    await createBlog(page, 'Test Blog', 'Test Author', 'http://testblog.com')
    await expect(page.getByText('TITLE: Test Blog')).toBeVisible()

    await page.getByRole('button', { name: 'viewStats' }).click()
    await expect(page.getByText('LIKES: 0')).toBeVisible()

    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('LIKES: 1')).toBeVisible()


  })



  test('a blog can be deleted', async ({ page }) => {
    
    await loginWith(page, 'newuser', '123456')
    await expect(page.getByText('new user logged in')).toBeVisible()
    await page.getByRole('button', { name: 'create blog' }).click()

    await createBlog(page, 'Test Blog', 'Test Author', 'http://testblog.com')
    await expect(page.getByText('TITLE: Test Blog')).toBeVisible()

    await page.getByRole('button', { name: 'viewStats' }).click()
    await expect(page.getByText('LIKES: 0')).toBeVisible()


    await page.on('dialog', dialog => console.log(dialog.message()));

    await page.on('dialog', dialog => dialog.accept())

    await page.getByRole('button', { name: 'delete' }).click()

    await expect(page.getByText('new user logged in')).toBeVisible()

    await expect(page.getByText('TITLE: Test Blog')).not.toBeVisible()


  })

test('a blog can only be deleted by its user', async ({ page }) => {
    await loginWith(page, 'newuser', '123456')
    await expect(page.getByText('new user logged in')).toBeVisible()
    await page.getByRole('button', { name: 'create blog' }).click()

    await createBlog(page, 'Test Blog', 'Test Author', 'http://testblog.com')
    await expect(page.getByText('TITLE: Test Blog')).toBeVisible()
    await page.getByRole('button', { name: 'logout' }).click()
    await loginWith(page, 'newuser2', '123456')
    await expect(page.getByText('new user2 logged in')).toBeVisible()
    await page.getByRole('button', { name: 'viewStats' }).click()
    await expect(page.getByRole('button',{ name: 'delete' } )).not.toBeVisible()
  })

test('blogs are ordered by likes', async ({ page }) => {
  await loginWith(page, 'newuser', '123456');
  await expect(page.getByText('new user logged in')).toBeVisible();
      await page.getByRole('button', { name: 'create blog' }).click()

  // Create blogs with different titles
  await createBlog(page, 'Low Likes Blog', 'Test Author', 'http://lowlikes.com');
    await page.waitForTimeout(500);

  await createBlog(page, 'Medium Likes Blog', 'Test Author', 'http://mediumlikes.com');
  await page.waitForTimeout(500);

  await createBlog(page, 'High Likes Blog', 'Test Author', 'http://highlikes.com');
  await page.waitForTimeout(500);

  // Add likes to each blog by title (avoids stale references)
  await addLikesToBlog(page, 'TITLE: Low Likes Blog', 1);
  await page.waitForTimeout(500);

  await addLikesToBlog(page, 'TITLE: Medium Likes Blog', 2);
  await page.waitForTimeout(500);

  await addLikesToBlog(page, 'TITLE: High Likes Blog', 3);
  await page.waitForTimeout(500);

  // Wait for UI to stabilize
  await page.waitForTimeout(500);

  // Get all blog titles in current order
  const blogTitles = await page.locator('.blogTitle').allTextContents();
  
  // Verify order: Most likes should be first
  expect(blogTitles[0]).toContain('TITLE: High Likes Blog');
  expect(blogTitles[1]).toContain('TITLE: Medium Likes Blog');
  expect(blogTitles[2]).toContain('TITLE: Low Likes Blog');
});

// Helper function to add likes to a specific blog
async function addLikesToBlog(page, title, count) {
  const blog = page.locator('.blog', { hasText: title });
  await blog.getByRole('button', { name: 'viewStats' }).click();
  
  for (let i = 0; i < count; i++) {
    await blog.getByRole('button', { name: 'like' }).click();
    await expect(blog.getByText(`LIKES: ${i + 1}`)).toBeVisible();
  }
}


  })
})
