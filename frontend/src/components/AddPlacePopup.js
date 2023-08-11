import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onAdd}) {
  const [placeName, setPlaceName] = useState('');
  const [placeUrl, setPlaceUrl] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onAdd({
      name: placeName,
      link: placeUrl,
    });
  }

  useEffect(() => {
    setPlaceName('');
    setPlaceUrl('');
  }, [isOpen])

return (
    <PopupWithForm
        name="place"
        title="Новое место"
        onSubmit={handleSubmit}
        onClose={onClose}
        isOpen={isOpen}
        buttonText="Создать"
        >
        <input
          className="popup__input popup__input_field_title"
          id="input-title"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={placeName || ''}
          onChange={(evt) => setPlaceName(evt.target.value)}
          />
        <span id="input-title-error" className="popup__error"></span>
        <input
          className="popup__input popup__input_field_link"
          id="input-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required 
          value={placeUrl || ''}
          onChange={(evt) => setPlaceUrl(evt.target.value)}
          />
        <span className="popup__error" id="input-link-error" ></span>
      </PopupWithForm>
)



}