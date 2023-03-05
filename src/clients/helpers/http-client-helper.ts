import {getCookie} from "../../helpers/cookie-helper";

export function sendPostRequest<TRequest, TResponse>(url: string, body: TRequest) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkResponse<TResponse>);
}

export function sendGetRequest<T>(url: string) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(checkResponse<T>);
}

export function sendGetRequestWithAuth<T>(url: string) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token') ?? ''
    },
  }).then(checkResponse<T>);
}

export function sendPatchRequestWithAuth<TRequest, TResponse>(url: string, body: TRequest) {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token') ?? ''
    },
    body: JSON.stringify(body)
  }).then(checkResponse<TResponse>);
}

function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok)
    return response.json();

  return response.json().then((error) => Promise.reject(error));
}
