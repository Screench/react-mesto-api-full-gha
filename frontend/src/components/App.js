import '../pages/index.css';
import {useEffect, useState} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';



export default function App() {
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getServerCards()])
    .then(([user, card]) => {
      setCurrentUser(user);
      setCards(card);
    })
    .catch((err) => window.alert(err))
  }, []);

  function handleAddClick() {
    setIsPlacePopupOpen(true);
  }

  function handleProfileClick() {
    setIsProfilePopupOpen(true);
  }

  function handleAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleImageClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

function handleLikeCard(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardState(card._id, isLiked)
  .then((newCard) => {
    setCards((state) =>
    state.map((c) => c._id === card._id ? newCard : c));
  })
  .catch((err) => window.alert(err));
}

function handleDeleteCard(card) {
  api.deleteCard(card._id)
  .then(() => {
    setCards(state => state.filter((s) => s._id !== card._id));
  })
  .catch((err) => window.alert(err));
}

function handleUserUpdate(value) {
  api.setUserInfo(value)
  .then((res) => {
    setCurrentUser(res);
    closeAllPopups();
  })
  .catch((err) => window.alert(err));
}

function handleAvatarChange(value) {
  api.setUserAvatar(value)
  .then((res) => {
    setCurrentUser(res);
    closeAllPopups();
  })
  .catch((err) => window.alert(err));
}

function handlePlaceSubmit(card) {
  api.handleAddNewCard(card)
  .then((newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups();
  })
  .catch((err) => window.alert(err))
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main
        onAvatarEdit={handleAvatarClick}
        onAdd={handleAddClick}
        onProfileEdit={handleProfileClick}
        onDeleteCard={handleDeleteCard}
        onImageClick={handleImageClick}
        onLike={handleLikeCard}
        cards={cards}
      />
      <Footer />

      <EditAvatarPopup
        isOpen={isAvatarPopupOpen}
        onClose={closeAllPopups}
        onAvatarChange={handleAvatarChange}

      />

      <EditProfilePopup
        isOpen={isProfilePopupOpen}
        onClose={closeAllPopups}
        onUserUpdate={handleUserUpdate}
      />

      <AddPlacePopup
        isOpen={isPlacePopupOpen}
        onClose={closeAllPopups}
        onAdd={handlePlaceSubmit}

      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

    </div>
    </CurrentUserContext.Provider>
  );
}
