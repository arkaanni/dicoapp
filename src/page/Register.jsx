import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../redux/user/action';

const registerSchema = Yup.object({
  name: Yup.string().max(20).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

function Register() {
  const dispatch = useDispatch();
  const formikRegister = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
    enableReinitialize: true,
  });

  return (
    <div className="columns-1 w-max p-2 flex flex-col justify-center mx-auto gap-2 h-96">
      <form className="form flex flex-col gap-2" onSubmit={formikRegister.handleSubmit}>
        <div className="form-control gap-1">
          <label className="flex flex-col" htmlFor="name-field">
            <span className="label-text">nama</span>
            <input onChange={formikRegister.handleChange} className="input input-primary input-sm" type="text" name="name" id="name-field" />
          </label>
          {formikRegister.touched.name && Boolean(formikRegister.errors.name) && (
            <small className="text-xs text-error">{formikRegister.errors.name}</small>
          )}
        </div>
        <div className="form-control gap-1">
          <label className="flex flex-col" htmlFor="email-field">
            <span className="label-text">email</span>
            <input onChange={formikRegister.handleChange} className="input input-primary input-sm" name="email" id="email-field" />
          </label>
          {formikRegister.touched.email && Boolean(formikRegister.errors.email) && (
            <small className="text-xs text-error">{formikRegister.errors.email}</small>
          )}
        </div>
        <div className="form-control gap-1">
          <label className="flex flex-col" htmlFor="password-field">
            <span className="label-text">password</span>
            <input onChange={formikRegister.handleChange} className="input input-primary input-sm" type="password" name="password" id="password-field" />
          </label>
          {formikRegister.touched.password && Boolean(formikRegister.errors.password) && (
            <small className="text-xs text-error">{formikRegister.errors.password}</small>
          )}
        </div>
        <div className="form-control mt-4">
          <input className="btn btn-primary btn-sm lowercase" type="submit" value="register" />
        </div>
      </form>
      <div className="w-full text-center">
        <p className="text-xs">
          sudah punya akun?
          <Link to="/login" className="link-primary"> login sekarang</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
