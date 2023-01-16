import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../redux/user/action';

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(20).required(),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
        .then((res) => {
          if (res.success) {
            navigate('/');
          }
        });
    },
    enableReinitialize: true,
  });

  return (
    <div className="columns-1 w-max p-2 flex flex-col justify-center mx-auto gap-2 h-96">
      <form className="form flex flex-col gap-2" onSubmit={loginFormik.handleSubmit}>
        <div className="form-control gap-1">
          <label htmlFor="email-field" className="flex flex-col">
            <span className="label-text">email</span>
            <input onChange={loginFormik.handleChange} className="input input-primary input-sm" name="email" id="email-field" />
          </label>
          {loginFormik.touched.email && Boolean(loginFormik.errors.email) && (
            <small className="text-xs text-error">{loginFormik.errors.email}</small>
          )}
        </div>
        <div className="form-control gap-1">
          <label htmlFor="password-field" className="flex flex-col">
            <span className="label-text">password</span>
            <input onChange={loginFormik.handleChange} className="input input-primary input-sm" type="password" name="password" id="password-field" />
          </label>
          {loginFormik.touched.password && Boolean(loginFormik.errors.password) && (
            <small className="text-xs text-error">{loginFormik.errors.password}</small>
          )}
        </div>
        <div className="form-control mt-4">
          <input className="btn btn-primary btn-sm lowercase" type="submit" value="login" />
        </div>
      </form>
      <div className="w-full text-center">
        <p className="text-xs">
          belum punya akun?
          <Link to="/register" className="link-primary"> register sekarang</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
