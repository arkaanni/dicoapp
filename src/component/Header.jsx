import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../redux/user/action';

function Header({ user }) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between bg-primary-content text-slate-100 p-4 lowercase shadow-md">
      <Link to="/">dicoding forum</Link>
      <div className="flex gap-4">
        <Link to="/leaderboard">leaderboard</Link>
        {user == null ? (
          <Link to="/login" className="link-primary">login</Link>
        ) : (
          <button type="button" className="link-primary cursor-pointer" onClick={() => dispatch(logoutUser())}>logout</button>
        )}
      </div>
    </div>
  );
}

Header.defaultProps = {
  user: {},
};

Header.propTypes = {
  user: PropTypes.objectOf(Object),
};

export default Header;
