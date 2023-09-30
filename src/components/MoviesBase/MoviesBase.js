import React from 'react';
import './MoviesBase.css';
import Movies from "../Movies/Movies";
import ButtonElse from "./ButtonElse/ButtonElse";
import { BASE_MOVIES_URL } from '../../utils/config'; // путь к картинкам фильмов
// import { BASE_MOVIES_URL, MOVIES_URL } from '../../utils/config'; // ловим путь к превью
// import cards from "../../utils/cards";

function MoviesBase(props) {
    // пустая страница?/ массив фильмов/ формат экрана/ клик по кнопке карточки/ запрос к апи за фильмами
    const { cards, window, onClickCardButton, getMovies } = props;

    // СТЕЙТЫ
    // массив поиска → из get-запроса
    const allArrMovies = JSON.parse(localStorage.getItem("allMovies"));
    // запрос (строка)
    const [query, setQuery] = React.useState(localStorage.getItem("queryMovies") || '');
    // массив фильмов после поиска → изменяем при каждом поиске
    const [searchMovies, setSearchMovies] = React.useState(JSON.parse(localStorage.getItem("searchMovies")) || []);
    // стейт состояния страницы: пустая или нет? 
    const [blankPage, setBlankPage] = React.useState(true);
    // стейт сообщения на странице с фильмами: сообщения об ошибках/не найденных фильмах/просьба о поиске...
    const [messageText, setMessageText] = React.useState('Запустите поиск интересующих Вас фильмов');
    // количество карточек по умолчанию → передадим в стейт ↓ ↓ ↓
    const defaultRenderedCard = {
        desktop: 12,
        tablet: 8,
        mobile: 5,
    };
    // стейт отображаемых карточек с фильмами  
    const [renderedCard, setRenderedCard] = React.useState(() => {
        const savedRenderedCard = localStorage.getItem('savedLineCard');
        return savedRenderedCard ? JSON.parse(savedRenderedCard) : defaultRenderedCard;
    });
    // стейт активности кнопки ЕЩЕ 
    const [activeButtonElse, setActiveButtonElse] = React.useState(true);
    // идет загрузка → отображаем преоладер
    const [isLoading, setIsLoading] = React.useState(true);

    // ЭФФЕКТЫ 
    React.useEffect(() => {
        if (localStorage.getItem('allMovies') && localStorage.getItem('searchMovies')) {
            // console.log('---- КОД ЗДЕСЬ ----')
            localStorage.setItem('savedLineCard', JSON.stringify(renderedCard));
            setRenderedCard(renderedCard);// сколько штук? ↑
            //compareLengthArr();//следим за длиной массива
        }
    }, [renderedCard]);

    React.useEffect(() => {
        if (allArrMovies === null) {
            setMessageText('Запустите поиск интересующих Вас фильмов');
        } else {
            handleMassege();
        }
        //debugger
        //setRenderedCard(renderedCard);
    }, [allArrMovies]);

    // мониторим экран → отображаем кнопку
    React.useEffect(() => {
        if (localStorage.getItem('allMovies') && localStorage.getItem('searchMovies')) {
            compareLengthArr();//следим за длиной массива
        }
    }, [window, activeButtonElse]);

    React.useEffect(() => {
        compareLengthArr();// проверим, весь ли массив → да → убираем ЕЩЕ
    }, [renderedCard])

    // отобразим сообщение, если фильмы не найдены
    function handleMassege() {
        if (searchMovies.length === 0) {
            setBlankPage(true);
            setMessageText('Фильмы по запросу не найдены');
        } else {
            setBlankPage(false);
        };
    };

    // запрос поиска → обновляем
    function updateQuery(newQuery) {
        setQuery(newQuery);
        setRenderedCard(defaultRenderedCard);// выдаем изначальное число карточек
        compareLengthArr();
    };

    // отрисовываем нужное число карточек
    function handleClickElse() {
        setRenderedCard((prevState) => ({
            ...prevState, // копирование предыдущего состояния
            desktop: prevState.desktop + 3,
            tablet: prevState.tablet + 2,
            mobile: prevState.mobile + 2,
        }));
        compareLengthArr();
    };

    const filtered = [];//отфильтрованные фильмы по запросу

    const handleSearch = async (query) => {
        //console.log(cards)
        let searchMovies = cards;
        if (cards.length === 0) {
            searchMovies = await getMovies();
            console.log(searchMovies)
            const newArr = transformArrMovies(searchMovies);// преобразовали фильмы +
            console.log(newArr);// преобразованный массив +
            pushLocalStorage(newArr);
            console.warn(JSON.parse(localStorage.getItem("allMovies")));
        };

        // фильтруем фильмы из ЛС
        filteredMovies(query, JSON.parse(localStorage.getItem("allMovies")));
        //console.log("---- ЧТО НАФИЛЬТРОВАЛИ? ----")
        //console.log(filtered); // преобразованный массив +
        setSearchMovies(filtered);
        localStorage.setItem("searchMovies", JSON.stringify(filtered));
        compareLengthArr();// проверим, весь ли массив → да → убираем ЕЩЕ
    }

    // трансформируем массив с апи в нужный формат
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

    // сохраняем фильмы с апи в ЛС
    function pushLocalStorage(arr) {
        localStorage.setItem("allMovies", JSON.stringify(arr));
    }

    // отфильтруем фильмы из базы по запросу в форме
    function filteredMovies(req, movies, isShort) {
        for (let i = 0; i < movies.length; i++) {
            const item = movies[i];
            let result;
             if (isShort) {
 
             }
            // поиск в названии RU и EN без учета регистра
            result = item.nameRU.toLowerCase().includes(req.toLowerCase()) ||
                item.nameEN.toLowerCase().includes(req.toLowerCase());
            if (result) {
                filtered.push(item);
            }
        };
    };

    // стейт чекбокса - изначально неактивен  ПЕРЕНЕСТИ ↑↑↑
    const [isCheckedShort, setIsCheckedShort] = React.useState(false);

    // обработчик чекбокса 
    function handleChecked(e) {
        //console.log("чекнули")
        if (!isCheckedShort) {
            setIsCheckedShort(true)// включили 
            console.log("ON")
            //setIsShortMovies(e.target.value);
            //localStorage.setItem('shortFilms', e.target.value);
            //console.log(localStorage.getItem('shortFilms'))
        } else {
            setIsCheckedShort(false)// выключили 
            console.log("OFF")
            //localStorage.removeItem("shortFilms");// удалить??
        }
    }
    // стейт массива короткометражек 
    const [isShortMovies, setIsShortMovies] = React.useState(localStorage.getItem("isShortMovies"))

    // отобразим/ скроем кнопку ЕЩЕ --- НЕ ОБНОВЛЯЕСТСЯ ПОСЛЕ ОКОНЧАНИЯ МАССИВА - после обновления страницы ОК ---
    function compareLengthArr() {
        const arr = JSON.parse(localStorage.getItem("searchMovies"));
        //console.log(arr.length);
        //console.log(renderedCard.desktop);
        //if (arr.length === 0) {
        if (arr === null || undefined) {
            return
        } else {
            if (window >= 1225 && arr.length <= renderedCard.desktop) {
                console.log("выбрали массив на desktop");
                console.log(arr.length);
                console.log(renderedCard.desktop);
                setActiveButtonElse(false);
            } else if (window >= 713 && arr.length <= renderedCard.tablet) {
                console.log("выбрали массив на tablet");
                console.log(arr.length);
                console.log(renderedCard.tablet);
                setActiveButtonElse(false);
            } else if (window <= 712 && arr.length <= renderedCard.mobile) {
                console.log("выбрали массив на mobile");
                console.log(arr.length);
                console.log(renderedCard.mobile);
                setActiveButtonElse(false);
            } else {
                console.log("еще не весь массив");
                console.log(arr.length);
                console.log(renderedCard);
                setActiveButtonElse(true);
            };
        }
    };


    return (
        <Movies
            cards={searchMovies}
            renderedCard={renderedCard}
            window={window}
            onClickCardButton={onClickCardButton}
            blankPage={blankPage}
            submitQuery={query}
            setSubmitQuery={updateQuery}
            handleSearch={handleSearch}
            beChecked={isCheckedShort}
            onClickFilter={handleChecked}
            messageText={messageText}
        >
            {!blankPage && <ButtonElse onClickElse={handleClickElse} activeButtonElse={activeButtonElse} />}
        </Movies>
    )
}
export default MoviesBase;