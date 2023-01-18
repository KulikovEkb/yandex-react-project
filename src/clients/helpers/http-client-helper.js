export function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка ${response.status}`);
}