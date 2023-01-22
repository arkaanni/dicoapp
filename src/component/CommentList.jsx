import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function CommentList({ comments, onUpvoteComment }) {
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
          onUpvote={() => onUpvoteComment(
            it.id,
            it.upVotesBy.find((u) => u !== undefined) !== undefined,
          )}
        />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(Object).isRequired,
  onUpvoteComment: PropTypes.func.isRequired,
};

export default CommentList;
