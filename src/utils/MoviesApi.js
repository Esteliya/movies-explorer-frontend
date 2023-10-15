import { MOVIES_URL, BASE_MOVIES_URL } from '../utils/config';

class ApiWithMovies {
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
        return fetch(`${this._url}`, options)
            .then(this._checkResponse)
    }

    //запрашиваем фильмы
    getMovieInfo() {
        return this._request(this._url, {
            headers: this._headers,
            /* credentials: 'include', */
        })
    }

    //запрашиваем изображение 
    getInfo() {
        return this._request('/users/me', {
            headers: this._headers,
            /* credentials: 'include', */
        })
    }
}

export const apiWithMovies = new ApiWithMovies(MOVIES_URL);
//export const baseApi = new ApiWithMovies(BASE_MOVIES_URL);