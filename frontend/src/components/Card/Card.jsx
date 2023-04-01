import React, { useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `grid-cards__delete-button animation-button ${isOwn ? 'grid-cards__delete-button_active' : ''}`
    );

    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `grid-cards__like-button ${isLiked ? 'grid-cards__like-button_active' : ''}`
    );

    function handleLikeClick(card) {
        onCardLike(card)
    }

    function handleDeleteClick(card) {
        onCardDelete(card)
    }

    return (
        <li className="grid-cards__item">
            <button
                type="button"
                className={cardDeleteButtonClassName}
                onClick={() => handleDeleteClick(card)}
            ></button>
            <img className="grid-cards__image" src={card.link} onClick={() => onCardClick(card.link, card.name)} />
            <div className="grid-cards__row">
                <h2 className="grid-cards__title">{card.name}</h2>
                <div className="grid-cards__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={() => handleLikeClick(card)}></button>
                    <span className="grid-cards__like-number">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}
