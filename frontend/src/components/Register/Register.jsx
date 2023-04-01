import React, { useState } from 'react'

import { Route, Link, } from 'react-router-dom'

import styles from './Register.module.css';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>
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
        <button className={styles.button} type="submit">Зарегистрироваться</button>
        <Route path="/sign-up">
          <Link to="/sign-in" className={`${styles.link} animation-button`}>
            Уже зарегистрированы? Войти
          </Link>
        </Route>
      </form>
    </div>
  )
}

export default Register;
