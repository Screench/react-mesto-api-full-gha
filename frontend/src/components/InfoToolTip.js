import React from 'react';
import successPicture from '../images/success.svg';
import errorPicture from '../images/error.svg';

export default function InfoToolTip({ toolTipPicture, isOpen, onClose, title}) {

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className='popup__tooltip-container' >
        {toolTipPicture === 'success' && (<img src={successPicture} alt='Успешно' />)}
        {toolTipPicture === 'error' && (<img src={errorPicture} alt='Ошибка' />)}
        <h2 className='popup__tooltip-title'>{title}</h2>
        <button type='button' className='popup__close-btn' onClick={onClose} />
      </div>
    </div>
  )
}