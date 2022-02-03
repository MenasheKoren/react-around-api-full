import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header({ handleLogout, isRegistered, localEmail }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="link link__hover">
        <img src={logo} alt="Around the U.S. logo" className="header__logo" />
      </Link>

      <div className="header__user-area">
        <p className="header__email">{localEmail}</p>
        {localEmail && location.pathname === '/' && (
          <Link
            onClick={handleLogout}
            to="/signin"
            replace
            className="link link__hover"
          >
            Log out
          </Link>
        )}
        {location.pathname === '/signin' && !isRegistered && (
          <Link className="link link__hover" to="signup">
            Sign up
          </Link>
        )}
        {location.pathname === '/signup' && !isRegistered && (
          <Link className="link link__hover" to="signin">
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
