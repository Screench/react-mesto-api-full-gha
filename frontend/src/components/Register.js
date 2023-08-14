import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegistration }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(email, password);
  };

  return (
    <div className='authentication'>
      <h2 className='authentication__title'>Регистрация</h2>
      <form name='register' className='authentication__form' onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          className='authentication__input'
          placeholder='E-mail'
          onChange={handleEmailChange}
          value={email}
          required
        />
        <input
          type='password'
          name='password'
          className='authentication__input'
          placeholder='Пароль'
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <button className='authentication__submit' type='submit'>Зарегистрироваться</button>
        <Link className='authentication__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  );
}

export default Register;