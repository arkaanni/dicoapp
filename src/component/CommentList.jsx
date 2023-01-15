import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';
import { upvoteComment } from '../redux/comment/action';

function CommentList({ comments, threadId, userId = null }) {
  const dispath = useDispatch();

  const onUpvote = (commentId, isUpvoted) => {
    dispath(upvoteComment({
      threadId, commentId, userId, unUpvote: isUpvoted,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {comments.map((it) => (
        <ThreadItem
          key={it.id}
          isComment
          body={it.content}
          owner={it.owner}
          upvotes={it.upVotesBy}
          downvotes={it.downVotesBy}
          onUpvote={() => onUpvote(it.id, it.upVotesBy.find((u) => u !== undefined) !== undefined)}
        />
      ))}
    </div>
  );
}

CommentList.defaultProps = {
  userId: null,
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(Object).isRequired,
  threadId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

export default CommentList;
