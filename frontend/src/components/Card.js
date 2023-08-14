import React from 'react';
import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({card, onLike, onImageClick, onDeleteCard}) {
  const handleImageClick = () => onImageClick(card);
  const handleLikeClick = () => onLike(card);
  const handleTrashClick = () => onDeleteCard(card);
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const likeButtonClass = (`element__heart-btn ${isLiked && 'element__heart-btn_active'}`);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <article className="element">
      {isOwn && (<button type="button" className="element__trash-btn" onClick={handleTrashClick} />)}
      <img className="element__image" alt={card.name} src={card.link} onClick={handleImageClick} />
      <div className="element__caption">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button type="button" className={likeButtonClass} onClick={handleLikeClick} />
          <span className="element__counter">{card.likes.length}</span>
        </div>
        
      </div>
    </article>
    </CurrentUserContext.Provider>
    )
}