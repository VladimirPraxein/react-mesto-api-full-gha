import React, { useState, useContext, useEffect } from 'react'

import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    useEffect(() => {
        if(isOpen) {
            setName('')
            setLink('')
        }
    }, [isOpen])

    return (
        <PopupWithForm title="Новое место" name="place" submitButton='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <fieldset className="popup__form-info">
                <div className="popup__form-container">
                    <input
                        type="text"
                        className="popup__form-input popup__form-title"
                        name="place"
                        placeholder="Название"
                        required
                        minLength="2"
                        maxLength="30"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span className="popup__form-error place-error"></span>
                </div>
                <div className="popup__form-container">
                    <input
                        type="url"
                        className="popup__form-input popup__form-link"
                        name="url"
                        placeholder="Ссылка на картинку"
                        required
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <span className="popup__form-error url-error"></span>
                </div>
            </fieldset>
        </PopupWithForm>
    )
}
