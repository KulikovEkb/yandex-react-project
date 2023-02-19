import {getCookie} from "../../helpers/cookie-helper";

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

export function sendGetRequestWithAuth(url) {
  return fetch(url, {
    method: 'GET',
    headers: {Authorization: getCookie('token')},
  }).then(checkResponse);
}

function checkResponse(response) {
  if (response.ok)
    return response.json();

  return response.json().then((error) => Promise.reject(error));
}