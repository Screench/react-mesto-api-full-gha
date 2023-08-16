export const siteUrl = "https://api.mestorussia.nomoreparties.co/";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error: ${response.status}`);
}

export const register = async (email, password) => {
  const res = await fetch(`${siteUrl}signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  return checkResponse(res);
};

export const authorize = async (email, password) => {
  const res = await fetch(`${siteUrl}signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  return checkResponse(res);
}

export const getData = (token) => {
  return fetch(`${siteUrl}users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: 'include',
  })
    .then((res) => checkResponse(res))
    .then(data => data)
}
