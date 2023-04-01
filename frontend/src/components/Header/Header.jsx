import React from 'react'
import { Route, Switch, Link, useHistory } from 'react-router-dom'

import styles from './Header.module.css'

import headerLogo from '../../images/header-logo.svg'
import { useState } from 'react'

export default function Header({ email, setLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);

    const history = useHistory();

    function signOut() {
        setLoggedIn(false);
        setIsOpen(false)
        localStorage.removeItem('token');
        history.push('/sign-in');
    }

    return (
        <header className={`header ${isOpen ? 'header_active' : ''}`}>
            <a href="#" className="header__link">
                <img
                    className="header__logo"
                    src={headerLogo}
                    alt="Логотип Mesto Russia"
                />
            </a>
            <Switch>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__link animation-button">
                        Войти
                    </Link>
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__link animation-button">
                        Регистрация
                    </Link>
                </Route>
                <Route path="/">
                    <div className={`header__user-info user-info ${isOpen ? 'user-info_active' : ''}`}>
                        <p className="user-info__email">{email}</p>
                        <Link to="/sign-in" className="user-info__link" onClick={signOut}>
                            Выйти
                        </Link>
                    </div>
                    <div className={styles.container} onClick={() => setIsOpen(!isOpen)}>
                        <div className={`${styles.burger} ${isOpen ? styles.burgerActive : ''}`}></div>
                    </div>
                </Route>
            </Switch>
        </header>
    )
}
