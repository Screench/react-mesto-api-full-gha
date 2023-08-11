import {apiConfig} from './utils';

export class Api {
  constructor(config) {
    this._authorization = config.headers['authorization'];
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      },
    });
    return this._checkResponse(response);
  }

  async setUserInfo(data) {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._checkResponse(response);
  }

  async setUserAvatar(data) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._checkResponse(response);
  }

  async getServerCards() {
    const response = await fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      },
    });
    return this._checkResponse(response);
  }

  async handleAddNewCard(data) {
    const response = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._checkResponse(response);
  };

  async deleteCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async setCardLike(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async removeCardLike(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async changeLikeCardState(cardId, isLiked){
    if (isLiked) {
      const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      });
      return this._checkResponse(response);
    } else {
      const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      });
      return this._checkResponse(response);

    }
  }

}
export const api = new Api(apiConfig);