import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/comment/action';

function AddComment({ threadId }) {
  const dispatch = useDispatch();

  const submitComment = (e) => {
    e.preventDefault();
    const body = { threadId, content: e.target[0].value };
    dispatch(addComment(body));
  };

  return (
    <form onSubmit={submitComment}>
      <div className="flex flex-col gap-2">
        <div className="form-control">
          <textarea className="textarea textarea-primary" name="body" id="comment-text" rows="3" placeholder="tambah komentar" />
        </div>
        <div className="form-control">
          <button type="submit" className="btn btn-primary lowercase btn-sm w-fit self-end">submit</button>
        </div>
      </div>
    </form>
  );
}

AddComment.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default AddComment;
