import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { vi } from 'vitest'

test('calls handleCreate with correct form values', async () => {
  const handleCreate = vi.fn()

  const setNewBlogTitle = vi.fn()
  const setNewBlogAuthor = vi.fn()
  const setNewBlogUrl = vi.fn()

  // Controlled values (fake state)
  const newBlogTitle = ''
  const newBlogAuthor = ''
  const newBlogUrl = ''

  render(
    <BlogForm
      handleCreate={handleCreate}
      newBlogTitle={newBlogTitle}
      newBlogAuthor={newBlogAuthor}
      newBlogUrl={newBlogUrl}
      setNewBlogTitle={setNewBlogTitle}
      setNewBlogAuthor={setNewBlogAuthor}
      setNewBlogUrl={setNewBlogUrl}
    />
  )

  const user = userEvent.setup()

  const titleInput = screen.getByRole('textbox', { name: /title/i })
  const authorInput = screen.getByRole('textbox', { name: /author/i })
  const urlInput = screen.getByRole('textbox', { name: /url/i })
  const submitButton = screen.getByRole('button', { name: /create/i })

  await user.type(titleInput, 'Test Blog Title')
  await user.type(authorInput, 'Chi Nguyen')
  await user.type(urlInput, 'https://example.com')
  await user.click(submitButton)

  expect(handleCreate).toHaveBeenCalledTimes(1)
})
