import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { upvoteThread, fetchThreadDetail } from '../redux/thread/action';
import AddComment from '../component/AddComment';
import ThreadItem from '../component/ThreadItem';
import CommentList from '../component/CommentList';
import { addComment, upvoteComment } from '../redux/comment/action';

function ThreadDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { threadDetail, user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchThreadDetail({ threadId: id }));
  }, [dispatch, id]);

  const onUpvote = () => {
    const isUpvoted = threadDetail.upVotesBy.find((it) => it === user?.id);
    dispatch(upvoteThread({
      threadId: id, userId: user?.id || null, unUpvote: isUpvoted !== undefined,
    }));
  };

  const onAddComment = (body) => {
    dispatch(addComment(body));
  };

  const onUpvoteComment = (commentId, isUpvoted) => {
    dispatch(upvoteComment({
      threadId: id, commentId, userId: user?.id, unUpvote: isUpvoted,
    }));
  };

  if (threadDetail == null) {
    return (
      <div className="text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:w-7/12 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <ThreadItem
          title={threadDetail.title}
          body={threadDetail.body}
          owner={threadDetail.owner}
          upvotes={threadDetail.upVotesBy}
          downvotes={threadDetail.downVotesBy}
          onUpvote={onUpvote}
        />
        <p>
          kategori:
          &nbsp;
          <span className="badge badge-secondary">{threadDetail.category}</span>
        </p>
        {user != null ? (
          <AddComment threadId={threadDetail.id} onAddComment={onAddComment} />
        ) : (
          <div>
            <p>
              <Link to="/login" className="btn-link">login</Link>
              {' '}
              untuk komentar
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <p>
          komentar (
          {threadDetail.comments.length}
          )
        </p>
        <CommentList comments={threadDetail.comments} onUpvoteComment={onUpvoteComment} />
      </div>
    </div>
  );
}

export default ThreadDetail;
