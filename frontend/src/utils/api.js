class Api {
  constructor({ siteUrl }) {
    this._siteUrl = siteUrl;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  async getUserInfo() {
    const response = await fetch(`${this._siteUrl}users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    return this._checkResponse(response);
  }

  async setUserInfo(data) {
    const response = await fetch(`${this._siteUrl}users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentails,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._checkResponse(response);
  }

  async setUserAvatar(data) {
    const response = await fetch(`${this._siteUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._checkResponse(response);
  }

  async getServerCards() {
    const response = await fetch(`${this._siteUrl}cards`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    });
    return this._checkResponse(response);
  }

  async handleAddNewCard(data) {
    const response = await fetch(`${this._siteUrl}cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._checkResponse(response);
  };

  async deleteCard(cardId) {
    const response = await fetch(`${this._siteUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    });
    return this._checkResponse(response);
  }

  async setCardLike(cardId) {
    const response = await fetch(`${this._siteUrl}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    });
    return this._checkResponse(response);
  }

  async removeCardLike(cardId) {
    const response = await fetch(`${this._siteUrl}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    });
    return this._checkResponse(response);
  }

  async changeLikeCardState(cardId, isLiked){
    if (isLiked) {
      const response = await fetch(`${this._siteUrl}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: 'include'
      });
      return this._checkResponse(response);
    } else {
      const response = await fetch(`${this._siteUrl}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: 'include'
      });
      return this._checkResponse(response);

    }
  }

}
export const api = new Api({ siteUrl: 'https://api.mestorussia.nomoreparties.co/' });