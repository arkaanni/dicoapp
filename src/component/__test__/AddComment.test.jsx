import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addComment } from '../../redux/comment/action';
import AddComment from '../AddComment';

jest.mock('../../redux/comment/action');

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
    const dispatch = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <AddComment dispatch={dispatch} threadId={mockThread.id} />
    );
    const addCommentInput = getByPlaceholderText('tambah komentar');
    expect(addCommentInput).toBeInTheDocument();
    await userEvent.type(addCommentInput, 'test komentar');
    expect(addCommentInput).toHaveValue('test komentar');
    expect(getByRole('button', {name: 'submit' })).toBeInTheDocument();
  });

  it('should dispatch addComment thunk function when submit button clicked', async () => {
    const dispatch = jest.fn();
    addComment.mockImplementation(() => {});
    const { getByPlaceholderText, getByRole } = render(
      <AddComment dispatch={dispatch} threadId={mockThread.id} />
    );
    const addCommentInput = getByPlaceholderText('tambah komentar');
    await userEvent.type(addCommentInput, 'test komentar');
    expect(addCommentInput).toHaveValue('test komentar');
    const submitBtn = getByRole('button', {name: 'submit' });
    await userEvent.click(submitBtn);
    expect(dispatch).toHaveBeenCalledWith(addComment())
    expect(addComment).toHaveBeenCalledWith({
      threadId: mockThread.id,
      content: addCommentInput.value,
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});