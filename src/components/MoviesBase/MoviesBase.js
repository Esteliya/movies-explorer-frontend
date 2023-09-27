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
    // количество карточек по умолчанию → передадим в стейт ↓ ↓ ↓
    const defaultRenderedCard = {
        desktop: 12,
        tablet: 8,
        mobile: 5,
    }
    // стейт отображаемых карточек фильмов 
    const [renderedCard, setRenderedCard] = React.useState(() => {
        const savedRenderedCard = localStorage.getItem('savedLineCard');
        return savedRenderedCard ? JSON.parse(savedRenderedCard) : defaultRenderedCard;
    });
    // идет загрузка → отображаем преоладер
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        localStorage.setItem('savedLineCard', JSON.stringify(renderedCard));
        compareLengthArr()
    }, [renderedCard]);

    React.useEffect(() => {

        if (allArrMovies === null) {
            setMessageText('Запустите поиск интересующих Вас фильмов')
        } else {
            handleMassege();
        }
        setRenderedCard(renderedCard)

    }, [allArrMovies])

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
        setRenderedCard(defaultRenderedCard);// выдаем изначальное число карточек
    };

    // отрисовываем нужное число карточек
    function handleClickElse() {
        setRenderedCard((prevState) => ({
            ...prevState, // копирование предыдущего состояния
            desktop: prevState.desktop + 3,
            tablet: prevState.tablet + 2,
            mobile: prevState.mobile + 2,
        }))
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
    // мониторим экран → отображаем кнопку
    React.useEffect(() => {
        compareLengthArr()
    }, [window])

    // стейт активности кнопки ЕЩЕ 
    const [activeButtonElse, setActiveButtonElse] = React.useState(true)

    // отобразим/ скроем кнопку ЕЩЕ 
    function compareLengthArr() {
        const arr = JSON.parse(localStorage.getItem("searchMovies"))
        console.log(arr.length)
        console.log(renderedCard.desktop)
        /* switch (window) {
          case "/":
            navigate('/');
            break
          case "/sign-in":
            navigate('/');
            break
          case "/sign-up":
            navigate('/');
            break
        } */
        if (window >= 1225 && arr.length <= renderedCard.desktop) {
            // дизейбл кнопки!! 
            console.log("выбрали массив на desktop")
            setActiveButtonElse(false)
        } else if (window >= 713 && arr.length <= renderedCard.tablet) {
            console.log("выбрали массив на tablet")
            setActiveButtonElse(false)
        } else if (window <= 712 && arr.length <= renderedCard.mobile) {
            console.log("выбрали массив на mobile")
            setActiveButtonElse(false)
        } else {
            console.log("еще не весь массив")
            setActiveButtonElse(true)
        }
    }

    return (
        <Movies
            cards={searchMovies}
            renderedCard={renderedCard}
            window={window}
            onClickCardButton={onClickCardButton}
            blankPage={blankPage}
            query={query}
            setQuery={updateQuery}
            handleSearch={handleSearch}
            messageText={messageText}
        >
            {!blankPage && <ButtonElse onClickElse={handleClickElse} activeButtonElse={activeButtonElse} />}
        </Movies>
    )
}
export default MoviesBase;