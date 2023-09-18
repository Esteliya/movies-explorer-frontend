import { API_URL } from '../utils/config';

// проверяем ответ сервера
const response = (res) => {
    // debugger
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }

}

// регистрация пользователя 
export const register = (name, email, password) => {
    return fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(response)
}

//авторизация пользователя
export const authorize = (email, password) => {
    // debugger
    return fetch(`${API_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response)
}

//выход из аккуанта
export const logout = () => {
    // debugger
    return fetch(`${API_URL}/signout`, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response)
}

//проверка пользователя
export const checkToken = () => {
    // debugger;
    return fetch(`${API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response)

}