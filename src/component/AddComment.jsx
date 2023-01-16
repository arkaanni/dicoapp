import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { addComment } from '../redux/comment/action';

function AddComment({ threadId }) {
  const dispatch = useDispatch();
  const formikComment = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values) => {
      const body = { threadId, content: values.content };
      dispatch(addComment(body));
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formikComment.handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="form-control">
          <textarea onChange={formikComment.handleChange} className="textarea textarea-primary" name="content" id="comment-text" rows="3" placeholder="tambah komentar" />
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
