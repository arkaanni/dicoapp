import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

function AddComment({ threadId, onAddComment }) {
  const formikComment = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values) => {
      const body = { threadId, content: values.content };
      onAddComment(body);
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
  onAddComment: PropTypes.func.isRequired,
};

export default AddComment;
