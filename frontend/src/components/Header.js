import React from 'react';
import { useLocation, Link } from 'react-router-dom'
import logo from '../images/logo-white.svg'

function Header({ email, signOut, loggedIn }) {
  const location = useLocation();
  const path = (location.pathname === '/sign-in') ? '/sign-up' : '/sign-in';
  const linkName = (location.pathname === '/sign-in') ? 'Регистрация' : 'Войти';

  return (
    <header className='header'>
      <img src={logo} className='header__logo' alt='Логотип Место' />
      {
        loggedIn ? (
          <div className='header__group'>
            <p className='header__e-mail'>{email}</p>
            <Link className='header__link' onClick={signOut} to='/sign-in' >Выйти</Link>
          </div>
        ) : (
          <Link className='header__link' to={path}>{linkName}</Link>
        )
      }
    </header>
  )
}

export default Header;
