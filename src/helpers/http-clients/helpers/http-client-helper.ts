import {getCookie} from "../../cookie-helper";

export function sendPostRequest<TRequest, TResponse>(url: string, body: TRequest) {
  return request<TResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export function sendGetRequest<T>(url: string) {
  return request<T>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

export function sendPostRequestWithAuth<TRequest, TResponse>(url: string, body: TRequest) {
  return request<TResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('normaToken') ?? ''
    },
    body: JSON.stringify(body)
  });
}

export function sendGetRequestWithAuth<T>(url: string) {
  return request<T>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('normaToken') ?? ''
    },
  });
}

export function sendPatchRequestWithAuth<TRequest, TResponse>(url: string, body: TRequest) {
  return request<TResponse>(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('normaToken') ?? ''
    },
    body: JSON.stringify(body)
  });
}

function request<TResponse>(url: string, options: RequestInit): Promise<TResponse> {
  return fetch(url, options).then(checkResponse<TResponse>);
}

function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok)
    return response.json();

  return response.json().then((error) => Promise.reject(error));
}
