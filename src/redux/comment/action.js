import { threadApi } from '../../api/dicodingforum';
import { displayMessage, MessageType } from '../message/action';
import { fetchThreadDetail, addCommentUpvote, undoCommentUpvote } from '../thread/action';

const addComment = ({ threadId, content }) => async (dispatch) => {
  const { success } = await threadApi.comments.create({ threadId, content });
  if (success) {
    dispatch(fetchThreadDetail({ threadId }));
  }
};

const upvoteComment = ({
  threadId, commentId, userId, unUpvote,
}) => async (dispatch) => {
  if (userId === null) {
    dispatch(displayMessage({
      type: MessageType.ERROR,
      text: 'login untuk memberikan vote',
    }));
    return;
  }
  let voteFunc = threadApi.comments.votes.upVote;
  const message = {
    type: MessageType.INFO,
    text: 'berhasil memberikan vote',
  };
  if (unUpvote) {
    voteFunc = threadApi.comments.votes.neutralize;
    dispatch(undoCommentUpvote(commentId, userId));
    message.text = 'berhasil membatalkan upvote';
  } else {
    dispatch(addCommentUpvote(commentId, userId));
  }
  const { success } = await voteFunc({ threadId, commentId });
  if (!success) {
    message.type = MessageType.ERROR;
    message.text = 'gagal memberikan upvote';
    dispatch(undoCommentUpvote(commentId));
  }
  dispatch(displayMessage(message));
};

export {
  addComment,
  upvoteComment,
};
