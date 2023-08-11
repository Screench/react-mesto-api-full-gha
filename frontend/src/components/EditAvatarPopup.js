import React from 'react';
import { useContext, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup({ isOpen, onClose, onAvatarChange }) {
  const currentUser = useContext(CurrentUserContext);
  const inputAvatar = useRef();

  useEffect(() => {
    inputAvatar.current.value = ''
  }, [currentUser, isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
    onAvatarChange({
      avatar: inputAvatar.current.value,
    })
  }

  return (
    <PopupWithForm
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <label className="popup__form">
        <input
          className="popup__input popup__input_type_link"
          id="input-avatar"
          name="avatar"
          type="url"
          ref={inputAvatar}
          placeholder="Ссылка на ресурс"
          required />
        <span className="popup__error" id="input-avatar-error" />
      </label>
    </PopupWithForm>
  )
}