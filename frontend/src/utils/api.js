class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  //Обработка ответа
  processRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //Загрузка ифнормации о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      }
    })
      .then(this.processRequest)
  }

  //Загрузка карточек с сервера
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      }
    })
      .then(this.processRequest)
  }
  //Сохранение данных профиля
  setUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this.processRequest)
  }
  //Добавление карточки
  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(this.processRequest)
  }
  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      }
    })
      .then(this.processRequest)
  }

  //Поставить лайк
  changeLikeCardStatus(cardId, likes, numberLikes, isLiked) {
    if (!isLiked) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      })
        .then(this.processRequest)
    } else {

      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: likes
        })
      })
        .then(this.processRequest)
    }

  }

  //Обновление аватара
  setUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this.processRequest)
  }
}

export const api = new Api({
  baseUrl: 'https://api.mesto.project.student.nomoredomains.work',
});


