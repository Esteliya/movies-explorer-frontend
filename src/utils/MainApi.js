import { API_URL } from '../utils/config';

class MainApi {
    constructor(data) {
        this._url = data.url;//основная строка url из customize
        this._headers = data.headers;//заголовок fetch из customize
    }
    //проверяем ответ сервера
    _checkResponse(res) {
        if (res.ok) {//если все ок
            return res.json();//вернули данные (объект)
        } else {
            Promise.reject(res.status);//завершаем действия с ошибкой
        }
    }

    //запрос проверки ответа
    _request(urlEndpoint, options) {
        //debugger;
        return fetch(`${this._url}${urlEndpoint}`, options)
            .then(this._checkResponse)
    }

    // ПОЛЬЗОВАТЕЛЬ
    //запрашиваем данные о пользователе
    getUserInfo() {
        return this._request('/users/me', {
            headers: this._headers,
            credentials: 'include',
        })
    }


    //отправляем данные пользователя
    patchUserInfo(data) {
        return this._request('/users/me', {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
    }
    // ФИЛЬМЫ
    // запрашиваем массив фильмов с сервера
    getArrMovies() {
        return this._request('/movies', {
            headers: this._headers,
            credentials: 'include',
        })
    }

    // сохраняем фильм -> отправляем данные на серввер
    postUserMovies(data) {// ждем объект
        // debugger;
        return this._request('/movies', {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify(
                data,
            )
        })
    }

    // удаляем фильм по id 
    deleteCard(movieId) {
        return this._request(`/movies/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        })
    }

}

const mainApi = new MainApi(API_URL);

export default mainApi;