import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoToolTip from './InfoToolTip';
import * as authentication from '../utils/auth';

export default function App() {
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [toolTipTitle, setToolTipTitle] = useState('');
  const [toolTipPicture, setToolTipPicture] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getServerCards()])
        .then(([user, card]) => {
          setCurrentUser(user);
          setCards(card);
        })
        .catch((err) => window.alert(err))
    }
  }, [loggedIn]);

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
    setIsInfoToolTipPopupOpen(false);
  }

  function handleLikeCard(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
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

  function onSuccess() {
    setToolTipTitle('Вы успешно зарегистрировались!');
    setToolTipPicture('success');
    setIsInfoToolTipPopupOpen(true);
  }

  function onFail() {
    setToolTipTitle('Что-то пошло не так! Попробуйте еще раз.');
    setToolTipPicture('error');
    setIsInfoToolTipPopupOpen(true);
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      authentication.getData(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
          navigate('/', { replace: true });
        })
        .catch(err => console.log(err));
    }
  }, [navigate]);

  function handleLogin(email, password) {
    authentication.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true);
        navigate('/', { replace: true })
      })
      .catch(err => {
        onFail();
        console.log(err);
      });
  }

  function handleRegistration(email, password) {
    authentication.register(email, password)
      .then(() => {
        navigate('/sign-in', { replace: true });
        onSuccess();
      })
      .catch(err => {
        onFail();
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={email} signOut={signOut} loggedIn={loggedIn} />

        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                {...{
                  loggedIn,
                  onAvatarEdit: handleAvatarClick,
                  onProfileEdit: handleProfileClick,
                  onAdd: handleAddClick,
                  onLike: handleLikeCard,
                  onDeleteCard: handleDeleteCard,
                  onImageClick: handleImageClick,
                  cards,
                }}
                element={Main}
              />
            }
          />

          <Route path='/sign-in' element={<Login setEmail={setEmail} onLogin={handleLogin} />} />
          <Route path='/sign-up' element={<Register handleRegistration={handleRegistration} />} />
          <Route path='*' element={<Navigate to='/' replace />} />

        </Routes>

        {loggedIn && < Footer />}

        <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onAvatarChange={handleAvatarChange} />
        <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups} onUserUpdate={handleUserUpdate} />
        <AddPlacePopup isOpen={isPlacePopupOpen} onClose={closeAllPopups} onAdd={handlePlaceSubmit} />
        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
        <InfoToolTip isOpen={isInfoToolTipPopupOpen} onClose={closeAllPopups} title={toolTipTitle} toolTipPicture={toolTipPicture} />

      </div>
    </CurrentUserContext.Provider>
  );
}
