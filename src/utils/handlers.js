import { BASE_MOVIES_URL } from '../utils/config';
import { LENGTH_SHORT_MOVIE } from "../utils/constants";

// функция фильтрации фильмов по запросу и состоянию чекбокса (запрос/массив/чекбокс)
function filteredMovies(req, movies, checkbox) {
    if (movies === null || movies === undefined) {
        // console.log("МЫ ТУТ?????")
        return
    }
    if (checkbox === "on") {
        // console.log("ON -----")
        const shorts = movies.filter((item) => item.duration < LENGTH_SHORT_MOVIE);
        const filtered = shorts.filter(item => {
            let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
            return result;
        });
        // console.log("НАФИЛЬТРОВАЛИ ------", filtered)
        return filtered;
    } else {
        // console.log("OFF -----")
        const filtered = movies.filter(item => {
            let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
            return result;
        });
        // console.log("НАФИЛЬТРОВАЛИ ------", filtered)
        return filtered;
    }
}

// функция трансформации массива фильмов
function transformArrMovies(arr) {
    return arr.map((movie) => {
        const { country, director, duration, year, description, trailerLink, nameRU, nameEN } = movie;
        return {
            country,
            director,
            duration,
            year,
            description,
            image: `${BASE_MOVIES_URL}${movie.image.url}`,
            trailerLink,
            thumbnail: `${BASE_MOVIES_URL}${movie.image.formats.thumbnail.url}`,
            id: movie.id,
            nameRU,
            nameEN,
        };
    });
};

// функция конвертирования времени
const convertsTime = (num) => {
    let hours = Math.floor(num / 60);
    let mins = num % 60;
    if (mins < 10) {
        mins = "0" + mins;
    }
    return `${hours}ч ${mins}м`;
};

// функция получения сохраненного фильма
function getSavedMovie(arr, id) {
    return arr.find((movie) => {
        // console.log(movie.movieId === id)
        return movie.movieId === id;
    });
};

export {
    filteredMovies,
    transformArrMovies,
    convertsTime,
    getSavedMovie,
};