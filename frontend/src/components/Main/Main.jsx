import React, { useContext } from 'react'

import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext)
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img
                        src={currentUser.avatar}
                        alt="Фото Жака-Ива Кусто"
                        className="profile__avatar"
                    />
                    <span className="profile__avatar-edit" onClick={onEditAvatar}></span>
                </div>
                <div className="profile__info">
                    <div className="profile__info-row">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button animation-button"
                            type="button"
                            onClick={onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__work">{currentUser.about}</p>
                </div>
                <button
                    onClick={onAddPlace}
                    className="profile__add-button animation-button"
                    type="button"
                ></button>
            </section>
            <section className="grid-cards">
                <ul className="grid-cards__list">
                    {cards.map((item) => (
                        <Card card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={item._id}></Card>
                    ))}
                </ul>
            </section>
        </main>
    )
}
