export function sendPostRequest(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }).then(checkResponse);
}

export function sendGetRequest(url) {
  return fetch(url, {
    method: 'GET',
  }).then(checkResponse);
}

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка ${response.status}`);
}

export class request {
}