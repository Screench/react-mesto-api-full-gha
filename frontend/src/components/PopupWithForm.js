import React from 'react';

export default function PopupWithForm({ name, title, onClose, isOpen, children, onSubmit, buttonText }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} >
      <div className="popup__container">
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={`${name}-form`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-btn">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}
