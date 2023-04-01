import React from 'react'

import styles from './InfoTooltip.module.css'

export default function InfoTooltip({isOpen, onClose, icon, title}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}  >
      <div className={styles.container}>
        <button
          className="popup__button-close animation-button"
          type="button"
          onClick={onClose}
        ></button>
        <img src={icon} />
        <h2 className={styles.title}>{title}</h2>
      </div>
    </div>
  )
}
