import { BASE_API_URL } from '../utils/config';

// проверяем ответ сервера
const response = async (res) => {
    // debugger
    if (res.ok) {
        return res.json();
    } else {
        //const json = const body = await res.text()
        const body = await res.text()
        return Promise.reject(JSON.parse(body));
    }

}

// регистрация пользователя 
export const register = (name, email, password) => {
    return fetch(`${BASE_API_URL}/signup`, {
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
    return fetch(`${BASE_API_URL}/signin`, {
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
    return fetch(`${BASE_API_URL}/signout`, {
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
    return fetch(`${BASE_API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response)

}