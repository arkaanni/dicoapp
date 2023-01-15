import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../redux/user/action';

function Register() {
  const dispatch = useDispatch();

  const doRegister = (e) => {
    e.preventDefault();
    const body = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    dispatch(registerUser(body));
  };

  return (
    <div className="columns-1 w-max p-2 flex flex-col justify-center mx-auto gap-2 h-96">
      <form className="form flex flex-col gap-2" onSubmit={doRegister}>
        <div className="form-control">
          <label className="flex flex-col gap-2" htmlFor="nama-field">
            <span className="label-text">nama</span>
            <input className="input input-primary input-sm" type="text" name="nama" id="nama-field" maxLength="20" />
          </label>
        </div>
        <div className="form-control">
          <label className="flex flex-col" htmlFor="email-field">
            <span className="label-text">email</span>
            <input className="input input-primary input-sm" type="email" name="email" id="email-field" />
          </label>
        </div>
        <div className="form-control">
          <label className="flex flex-col" htmlFor="password-field">
            <span className="label-text">password</span>
            <input className="input input-primary input-sm" type="password" name="password" id="password-field" minLength="6" />
          </label>
        </div>
        <div className="form-control mt-4">
          <input className="btn btn-primary btn-sm lowercase" type="submit" value="register" />
        </div>
      </form>
      <div className="w-full text-center">
        <p className="text-xs">
          sudah punya akun?
          <Link to="/login" className="link-primary">login sekarang</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
