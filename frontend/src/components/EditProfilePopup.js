import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({ isOpen, onClose, onUserUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUserUpdate({name, about: description});
  }

  return (
    <PopupWithForm
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="popup__form">
        <input
          className="popup__input popup__input_field_name"
          id="input-name"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          onChange={(evt) => setName(evt.target.value)}
          value={name || ''}
        />
        <span id="input-name-error" className="popup__error" />
        <input
          className="popup__input popup__input_field_job"
          id="input-job"
          type="text"
          name="about"
          placeholder="Род занятий"
          minLength="2"
          maxLength="200"
          required
          onChange={(evt) => setDescription(evt.target.value)}
          value={description || ''}
        />
        <span id="input-job-error" className="popup__error" />
      </label>
    </PopupWithForm>
  );
}
