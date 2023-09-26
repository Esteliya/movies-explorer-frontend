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
    const { cards, window, onClickCardButton, getMovies } = props;

    // СТЕЙТЫ
    // массив поиска
    const allArrMovies = JSON.parse(localStorage.getItem("allMovies"))
    // запрос
    const [query, setQuery] = React.useState(localStorage.getItem("queryMovies") || '');
    // массив фильмов после поиска - изменяемый при каждом поиске- зачистить ЛС при разлогине!!!
    const [searchMovies, setSearchMovies] = React.useState(JSON.parse(localStorage.getItem("searchMovies")) || []);
    // стейт состояния страницы
    const [blankPage, setBlankPage] = React.useState(true);
    // стейт сообщения на странице с фильмами: сообщения об ошибках/не найденных фильмах/просьба о поиске...
    const [messageText, setMessageText] = React.useState('Запустите поиск интересующих Вас фильмов');

    // идет загрузка → отображаем преоладер
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        console.log(query)
        console.log(searchMovies)
        if (allArrMovies === null) {
            setMessageText('Запустите поиск интересующих Вас фильмов')
        } else {
            handleMassege();
        }

    }, [cards, searchMovies, query])

    // отобразим фильмы или сообщение 
    function handleMassege() {
        if (searchMovies.length === 0) {
            setBlankPage(true);
            setMessageText('Фильмы по запросу не найдены')
        } else {
            setBlankPage(false);

        }
    }

    // запрос поиска - обновляем
    function updateQuery(newQuery) {
        setQuery(newQuery);
    };

    function handleClickElse() {
        console.log("клик по кнопке Еще")// +
    }

    function getInitialVisibleCards() {
        if (window >= 1279) {
          return 16;
        } else if (window >= 1040) {
          return 12;
        } else if (window >= 641) {
          return 8;
        } else {
          return 5;
        }
      }

    const filtered = [];//отфильтрованные фильмы по запросу

    const handleSearch = async (query) => {
        //console.log(cards)
        let searchMovies = cards;
        if (cards.length === 0) {
            searchMovies = await getMovies();
            const newArr = transformArrMovies(searchMovies)// преобразовали фильмы +
            console.log(newArr)// преобразованный массив +
            pushLocalStorage(newArr)
            console.warn(JSON.parse(localStorage.getItem("allMovies")))

        }
        //console.log(searchMovies);// массив с апи +

        // const newArr = transformArrMovies(searchMovies)// преобразовали фильмы +
        //console.log(newArr)// преобразованный массив +
        //setSearchMovies(newArr)

        //pushLocalStorage(newArr)
        //console.warn(localStorage.getItem("allMovies"))


        // console.warn(searchMovies)
        // фильтруем фильмы из ЛС
        filteredMovies(query, JSON.parse(localStorage.getItem("allMovies")))
        console.log(filtered)// преобразованный массив +

        setSearchMovies(filtered);
        localStorage.setItem("searchMovies", JSON.stringify(filtered));
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
    function pushLocalStorage(arr) {
        localStorage.setItem("allMovies", JSON.stringify(arr));
    }

    // отфильтруем фильмы из базы по запросу в форме
    function filteredMovies(req, movies) {
        for (let i = 0; i < movies.length; i++) {
            const item = movies[i]
            // поиск в названии RU и EN без учета регистра
            let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
            if (result) {
                filtered.push(item);
            }

        }
    }


    return (
        <Movies
            cards={searchMovies}
            window={window}
            onClickCardButton={onClickCardButton}
            blankPage={blankPage}
            query={query}
            setQuery={updateQuery}
            handleSearch={handleSearch}
            messageText={messageText}
        >
            {!blankPage && <ButtonElse onClickElse={handleClickElse} />}
        </Movies>
    )
}
export default MoviesBase;