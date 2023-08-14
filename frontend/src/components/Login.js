import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [formInputs, setFormInputs] = useState({
    password: '',
    email: '',
  })

  function handleSubmit(evt) {
    evt.preventDefault();
    const {email, password} = formInputs;
    onLogin(email, password);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormInputs((prevFormInputs)=> ({...prevFormInputs, [name]: value}));
  }

  return (
    <div className='authentication'>
      <div className='authentication__title'>Вход</div>
      <form name='login' className='authentication__form' onSubmit={handleSubmit}>
        <input
          className='authentication__input'
          name='email'
          type='email'
          placeholder='E-mail'
          onChange={handleChange}
          value={formInputs.email || ''}
          required />

        <input
          className='authentication__input'
          name='password'  
          type='password'
          placeholder='Пароль'
          onChange={handleChange}
          value={formInputs.password || ''}
          required />

        <button className='authentication__submit' type='submit'>Войти</button>
      </form>
    </div>
  )
}