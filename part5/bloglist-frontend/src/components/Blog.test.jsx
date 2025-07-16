import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'A blog title',
    author: 'chi nguyen',
    url: 'https://example.com',
    likes: 0,
    user: {
      username: 'testuser',
    }
  }

render(<Blog blog={blog} />)
const element = screen.getByText('TITLE: A blog title')
expect(element).toBeInTheDocument()
const element2 = screen.queryByText('URL: https://example.com')
expect(element2).not.toBeVisible()

})

test('click to view post', async () => {
  const blog = {
    title: 'A blog title',
    author: 'chi nguyen',
    url: 'https://example.com',
    likes: 0,
    user: {
      username: 'testuser',
    }
  }

// const mockHandler = vi.fn()

render(<Blog blog={blog} />)

const user = userEvent.setup()
const button = screen.getByText('viewStats')
await user.click(button)


const element2 = screen.getByText('URL: https://example.com');
expect(element2).toBeVisible();

})


test('clicking like button twice calls handler twice', async () => {
  const blog = {
    id: '123',
    title: 'A blog title',
    author: 'chi nguyen',
    url: 'https://example.com',
    likes: 0,
    user: {
      username: 'testuser',
    }
  }

  // Create a mock like handler
  const mockLikeHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockLikeHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByRole('button', { name: /view/i })
  await user.click(viewButton)

  const likeButton = screen.getByRole('button', { name: /like/i })
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLikeHandler).toHaveBeenCalledTimes(2)

})