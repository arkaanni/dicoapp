import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createThread } from '../redux/thread/action';

function CreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitThread = (e) => {
    e.preventDefault();
    const body = {
      title: e.target[0].value,
      category: e.target[1].value,
      body: e.target[2].value,
    };
    dispatch(createThread(body))
      .then((success) => {
        if (success) {
          navigate('/');
        }
      });
  };

  return (
    <form className="form" onSubmit={submitThread}>
      <div className="flex flex-col gap-8 mx-auto w-2/4">
        <div className="form-control border-b">
          <input className="input input-sm" type="text" name="title" id="title-field" placeholder="judul..." />
        </div>
        <div className="form-control border-b">
          <input className="input input-sm" type="text" name="category" id="category-field" placeholder="kategori" />
        </div>
        <div className="form-control border-b">
          <textarea className="textarea" name="content" id="textarea-field" placeholder="konten" />
        </div>
        <div className="form-control">
          <input className="btn btn-primary lowercase btn-sm" type="submit" value="buat" />
        </div>
      </div>
    </form>
  );
}

export default CreateThread;
