import React from 'react'

export default function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image ${card.visible ? 'popup_opened' : ''}`}>
            <div className="popup__container popup_type_image__container">
                <button
                    className="popup__button-close animation-button"
                    type="button"
                    onClick={onClose}
                ></button>
                <img className="popup_type_image__image" src={card.url} alt={card.name}/>
                <p className="popup_type_image__text">{card.name}</p>
            </div>
        </div>
    )
}
