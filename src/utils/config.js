// URL-адреса
// БАЗА ФИЛЬМОВ
// данные фильмов
const MOVIES_URL = {
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  // точечные данные с api: изображения
  const BASE_MOVIES_URL = 'https://api.nomoreparties.co';

  // МОЙ АПИ 
  // const BASE_API_URL = 'http://localhost:3001';
  const BASE_API_URL = 'https://api.mymovies.nomoreparties.co';
  const API_URL = {
    url: 'https://api.mymovies.nomoreparties.co',
    // url: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json'
    },
  };

export {
    MOVIES_URL,
    BASE_MOVIES_URL,
    BASE_API_URL,
    API_URL,
};