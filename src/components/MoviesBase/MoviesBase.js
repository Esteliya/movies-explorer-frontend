import React from 'react';
import './MoviesBase.css'
import Movies from "../Movies/Movies"
import ButtonElse from "./ButtonElse/ButtonElse"
// fgb
import { BASE_MOVIES_URL } from '../../utils/config'// путь к картинкам фильмов
// import { BASE_MOVIES_URL, MOVIES_URL } from '../../utils/config'; // ловим путь к превью
// import cards from "../../utils/cards";


function MoviesBase(props) {
    // пустая страница?/ массив фильмов/ формат экрана/ клик по кнопке карточки/ запрос к апи за фильмами
    const { blankPage, cards, mobile, onClickCardButton, getMovies } = props;

    // СТЕЙТЫ
    // массив поиска
    const [query, setQuery] = React.useState(localStorage.getItem("queryMovies") || []);
    // массив фильмов после поиска - зачистить ЛС при разлогине!!!
    const [searchMovies, setSearchMovies] = React.useState(localStorage.getItem("searchMovies") || []);
    // запрос поиска
    const updateQuery = (newQuery) => {
        setQuery(newQuery);
    };

    function handleClickElse() {
        console.log("клик по кнопке Еще")// +
    }

    const filtered = [];//отфильтрованные фильмы по запросу

    const handleSearch = async (query) => {
        console.log(cards)
        let searchMovies = cards;
        if (cards.length === 0) {
            searchMovies = await getMovies();
        }
        console.log(searchMovies);// массив с апи +

        const newArr = transformArrMovies(searchMovies)// преобразовали фильмы +
        console.log(newArr)// преобразованный массив +
        //setSearchMovies(newArr)

        pushLocalStorage(newArr)
        console.warn(localStorage.getItem("allMovies"))


        console.warn(searchMovies)

        filteredMovies(query, newArr)
        console.log(filtered)// преобразованный массив

        setSearchMovies(filtered);
        localStorage.setItem("queryMovies", JSON.stringify(filtered));
    }

    // трансформируем массив с апи в нужный формат
    function transformArrMovies(arr) {
        return arr.map((movie) => {
            const { country, director, duration, year, description, trailerLink, nameRU, nameEN } = movie
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
            }
        })
    }

    // сохраняем фильмы с апи в ЛС
    async function pushLocalStorage (arr) {
       await localStorage.setItem("allMovies", JSON.stringify(arr));
    }

    // отфильтруем фильмы из базы по запросу в форме
    function filteredMovies(req, movies) {
        for (let i = 0; i < movies.length; i++) {
            const item = movies[i]
            // поиск в названии RU и EN без учета регистра
            let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) ||
                item.nameEN.toLowerCase().includes(req.toLowerCase());
            if (result) {
                filtered.push(item);
            }

        }
    }



    return (
        <Movies
            cards={searchMovies}
            mobile={mobile}
            onClickCardButton={onClickCardButton}
            blankPage={blankPage}
            query={query}
            setQuery={updateQuery}
            handleSearch={handleSearch}
        >
            {!blankPage && <ButtonElse onClickElse={handleClickElse} />}
        </Movies>
    )
}
export default MoviesBase;