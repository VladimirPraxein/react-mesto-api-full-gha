import React, { useContext, useState } from 'react'

import PopupWithForm from '../PopupWithForm/PopupWithForm'

import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')

    const currentUser = useContext(CurrentUserContext)

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="profile" submitButton='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <fieldset className="popup__form-info">
                <div className="popup__form-container">
                    <input
                        type="text"
                        className="popup__form-input popup__form-name"
                        name="name"
                        placeholder="Имя пользователя"
                        required
                        minLength="2"
                        maxLength="40"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span className="popup__form-error name-error"></span>
                </div>
                <div className="popup__form-container">
                    <input
                        type="text"
                        className="popup__form-input popup__form-work"
                        name="work"
                        placeholder="О себе"
                        required
                        minLength="2"
                        maxLength="200"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <span className="popup__form-error work-error"></span>
                </div>
            </fieldset>
        </PopupWithForm>
    )
}
