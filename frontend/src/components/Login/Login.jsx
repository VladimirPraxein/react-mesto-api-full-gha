import React, { useState } from 'react'

import styles from './Login.module.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(password, email);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вход</h2>
      <form action="#" name='auth' className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <input
            type="text"
            className={styles.input}
            name="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            name="password"
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button className={styles.button} type="submit">Войти</button>
      </form>
    </div>
  )
}
