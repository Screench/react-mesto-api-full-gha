import React from 'react'
import { useContext } from 'react';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  onAvatarEdit,
  onProfileEdit,
  onAdd,
  onImageClick,
  onDeleteCard,
  onLike,
  cards
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile'>
        <div onClick={onAvatarEdit} className='profile__avatar'>
          <img src={currentUser.avatar} className='profile__image' alt={currentUser.name} />
        </div>
        <div className='profile__info'>
          <div className='profile__wrapper'>
            <h1 className='profile__title'>{currentUser.name}</h1>
            <button onClick={onProfileEdit} type='button' className='profile__edit-btn' />
          </div>
          <h2 className='profile__occupation'>{currentUser.about}</h2>
        </div>
        <button onClick={onAdd} type='button' className='profile__add-btn' />
      </section>
      <section className='elements'>
        {
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onImageClick={onImageClick}
              onDeleteCard={onDeleteCard}
              onLike={onLike} />
          ))
        }
      </section>
    </main>
  )
}
