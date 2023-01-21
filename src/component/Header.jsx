import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ user, onLogout }) {
  return (
    <div className="flex justify-between bg-primary-content text-slate-100 p-4 lowercase shadow-md">
      <Link to="/">dicoding forum</Link>
      <div className="flex gap-4">
        <Link to="/leaderboard">leaderboard</Link>
        {user == null ? (
          <Link to="/login" className="link-primary">login</Link>
        ) : (
          <button type="button" className="link-primary cursor-pointer" onClick={onLogout}>logout</button>
        )}
      </div>
    </div>
  );
}

Header.defaultProps = {
  user: null,
  onLogout: null,
};

Header.propTypes = {
  user: PropTypes.objectOf(Object),
  onLogout: PropTypes.func,
};

export default Header;
