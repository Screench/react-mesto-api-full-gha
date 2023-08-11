import React from 'react';

export default function ImagePopup({ onClose, isOpen, card }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  )
}
