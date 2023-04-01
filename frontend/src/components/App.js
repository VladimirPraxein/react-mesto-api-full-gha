import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import "../styles/index.css";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Login from "./Login/Login";
import Register from './Register/Register';
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import InfoTooltip from './InfoTooltip/InfoTooltip';

import * as auth from '../utils/auth';

import errorIcon from '../images/error.svg';
import successIcon from '../images/success.svg';

import { api } from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [response, setResponse] = useState({ icon: '', title: '' })

  const history = useHistory();

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltip(false)
    setSelectedCard({})
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleAuthClick(icon, title) {
    setIsInfoTooltip(true)
    setResponse({ icon: icon, title: title })
  }

  function handleCardClick(url, name) {
    setSelectedCard({ visible: true, url: url, name: name })
  }

  function handleUpdateUser(user) {
    api.setUserInfo(user.name, user.about)
      .then((dataUser) => setCurrentUser(dataUser))
      .catch((e) => console.log(e))
      .finally(closeAllPopups())
  }

  function handleUpdateAvatar(dataUser) {
    api.setUserAvatar(dataUser.avatar)
      .then(() => setCurrentUser({ ...currentUser, avatar: dataUser.avatar }))
      .catch((e) => console.log(e))
      .finally(closeAllPopups())
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, card.likes, card.likes.length, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((e) => console.log(e))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((e) => console.log(e))
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((e) => console.log(e))
      .finally(closeAllPopups())
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        if (res) {
          handleAuthClick(successIcon, 'Вы успешно зарегистрировались!')
        }
      })
      .then(() => {
        history.push('/sign-in');
      })
      .catch(() => handleAuthClick(errorIcon, 'Что-то пошло не так! Попробуйте ещё раз.'))
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        localStorage.setItem('token', data.token);
      })
      .then(() => {
        setLoggedIn(true);
      })
      .then(() => {
        history.push('/');
      })
      .catch(() => handleAuthClick(errorIcon, 'Что-то пошло не так! Попробуйте ещё раз.'));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.email)
            setLoggedIn(true)
          }
        })
        .catch((e) => console.log(e))
        .finally(() => history.push('/'));
    }
  }, [loggedIn, history, userEmail])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch(err => {
          console.log(err)
        });
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} setLoggedIn={setLoggedIn}></Header>
        <Switch>
          <ProtectedRoute
            path='/'
            exact
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}>
          </ProtectedRoute>
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
        </Switch>
        {loggedIn && <Footer />}
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} icon={response.icon} title={response.title} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
