/* собираем переменные в файл */
// URL-адреса
// данные фильмов
const MOVIES_URL = {
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  // данные: изображения
  const BASE_MOVIES_URL = 'https://api.nomoreparties.co';


export {
    MOVIES_URL,
    BASE_MOVIES_URL,
};