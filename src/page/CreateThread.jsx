import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createThread } from '../redux/thread/action';

const createThreadSchema = Yup.object({
  title: Yup.string().required('judul is a required field'),
  category: Yup.string().optional(),
  body: Yup.string().required('konten is a required field'),
});

function CreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikCreateThread = useFormik({
    initialValues: {
      title: '',
      category: '',
      body: '',
    },
    validationSchema: createThreadSchema,
    onSubmit: (values) => {
      dispatch(createThread(values))
        .then((success) => {
          if (success) {
            navigate('/');
          }
        });
    },
    enableReinitialize: true,
  });

  return (
    <form className="form" onSubmit={formikCreateThread.handleSubmit}>
      <div className="flex flex-col gap-8 mx-auto w-2/4">
        <div className="gap-2">
          <div className="form-control border-b">
            <input onChange={formikCreateThread.handleChange} className="input input-sm" type="text" name="title" id="title-field" placeholder="judul..." />
          </div>
          {formikCreateThread.touched.title && Boolean(formikCreateThread.errors.title) && (
            <small className="text-xs text-error">{formikCreateThread.errors.title}</small>
          )}
        </div>
        <div className="form-control border-b">
          <input onChange={formikCreateThread.handleChange} className="input input-sm" type="text" name="category" id="category-field" placeholder="kategori" />
        </div>
        <div className="gap-2">
          <div className="form-control border-b">
            <textarea onChange={formikCreateThread.handleChange} className="textarea border-b" name="body" id="textarea-field" placeholder="konten" />
          </div>
          {formikCreateThread.touched.body && Boolean(formikCreateThread.errors.body) && (
            <small className="text-xs text-error">{formikCreateThread.errors.body}</small>
          )}
        </div>
        <div className="form-control">
          <input className="btn btn-primary lowercase btn-sm" type="submit" value="buat" />
        </div>
      </div>
    </form>
  );
}

export default CreateThread;
