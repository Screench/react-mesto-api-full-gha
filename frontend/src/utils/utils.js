export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    'Content-Type': "application/json",
    authorization: '65913fd9-7c89-4468-aff0-c32cf1d9a941'
  }
}