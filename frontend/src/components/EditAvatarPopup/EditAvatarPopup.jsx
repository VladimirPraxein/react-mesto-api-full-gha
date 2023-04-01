import React, { useRef, useEffect } from 'react'

import PopupWithForm from '../PopupWithForm/PopupWithForm'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = useRef('')

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }

    useEffect(() => {
        if (isOpen) {
            inputRef.current.value = ''
        }
    }, [isOpen])

    return (
        <PopupWithForm title="Обновить аватар" name="avatar" submitButton='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <fieldset className="popup__form-info">
                <div className="popup__form-container">
                    <input
                        type="url"
                        className="popup__form-input"
                        name="url"
                        placeholder="Ссылка на картинку"
                        required
                        ref={inputRef}
                    />
                    <span className="popup__form-error url-error"></span>
                </div>
            </fieldset>
        </PopupWithForm>
    )
}
