import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/user/action';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doLogin = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    dispatch(loginUser({ email, password }))
      .then((success) => {
        if (success) {
          navigate('/');
        }
      });
  };

  return (
    <div className="columns-1 w-max p-2 flex flex-col justify-center mx-auto gap-2 h-96">
      <form className="form flex flex-col gap-2" onSubmit={doLogin}>
        <div className="form-control">
          <label htmlFor="email-field" className="flex flex-col">
            <span className="label-text">email</span>
            <input className="input input-primary input-sm" type="email" name="email" id="email-field" />
          </label>
        </div>
        <div>
          <label htmlFor="password-field" className="flex flex-col">
            <span className="label-text">password</span>
            <input className="input input-primary input-sm" type="password" name="password" id="password-field" />
          </label>
        </div>
        <div className="form-control mt-4">
          <input className="btn btn-primary btn-sm lowercase" type="submit" value="login" />
        </div>
      </form>
      <div className="w-full text-center">
        <p className="text-xs">
          belum punya akun?
          <Link to="/register" className="link-primary">register sekarang</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
