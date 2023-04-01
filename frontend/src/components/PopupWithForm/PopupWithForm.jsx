import React from 'react'

export default function PopupWithForm({ title, name, submitButton, isOpen, onClose, children, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}  >
            <div className="popup__container">
                <button
                    className="popup__button-close animation-button"
                    type="button"
                    onClick={onClose}
                ></button>
                <h2 className="popup__title">{title}</h2>
                <form
                    action="#"
                    className="popup__form form-avatar"
                    name={name}
                    onSubmit={onSubmit}
                >
                    {children}
                    <button
                        className="popup__button-save button-create"
                        type="submit"
                        
                    >
                        {submitButton}
                    </button>
                </form>
            </div>
        </div>
    )
}
