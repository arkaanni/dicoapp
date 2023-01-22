import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddComment from '../AddComment';

/**
 * test scenario
 * 
 * - AddComment component
 *  - should render component correctly
 *  - should call onAddComment function when submit button clicked
 */

const mockThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [11, 22],
      downVotesBy: [],
    },
  ],
};

describe('AddComment component test', () => {
  it('should render component correctly', async () => {
    const onAddComment = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <AddComment onAddComment={onAddComment} threadId={mockThread.id} />,
    );
    const addCommentInput = getByPlaceholderText('tambah komentar');
    expect(addCommentInput).toBeInTheDocument();
    await userEvent.type(addCommentInput, 'test komentar');
    expect(addCommentInput).toHaveValue('test komentar');
    expect(getByRole('button', { name: 'submit' })).toBeInTheDocument();
  });

  it('should call onAddComment function when submit button clicked', async () => {
    const onAddComment = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <AddComment onAddComment={onAddComment} threadId={mockThread.id} />,
    );
    const addCommentInput = getByPlaceholderText('tambah komentar');
    await userEvent.type(addCommentInput, 'test komentar');
    expect(addCommentInput).toHaveValue('test komentar');
    const submitBtn = getByRole('button', { name: 'submit' });
    await userEvent.click(submitBtn);
    expect(onAddComment).toHaveBeenCalledWith({
      threadId: mockThread.id,
      content: addCommentInput.value,
    });
    expect(onAddComment).toHaveBeenCalledTimes(1);
  });
});
