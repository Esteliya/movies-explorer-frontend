import React from 'react';
import './MoviesBase.css';
import Movies from "../Movies/Movies";
import ButtonElse from "./ButtonElse/ButtonElse";
import { BASE_MOVIES_URL } from '../../utils/config'; // путь к картинкам фильмов
// import { BASE_MOVIES_URL, MOVIES_URL } from '../../utils/config'; // ловим путь к превью
// import cards from "../../utils/cards";

function MoviesBase(props) {
    // формат экрана/ клик по кнопке карточки/ запрос к апи за фильмами
    const { window, onClickCardButton, getMovies } = props;

    // СТЕЙТЫ
    // массив поиска → из get-запроса
    const isLocalStorageMovies = JSON.parse(localStorage.getItem("allMovies"));
    const [allMovies, setAllMovies] = React.useState(isLocalStorageMovies || []);
    // запрос (строка)
    const [query, setQuery] = React.useState(localStorage.getItem("query") || '');
    // массив фильмов после поиска → изменяем при каждом поиске
    const [searchMovies, setSearchMovies] = React.useState(JSON.parse(localStorage.getItem('searchMovies')) || []);
    // стейт состояния страницы: пустая или нет? 
    const [blankPage, setBlankPage] = React.useState(true); // НАСТРОИТЬ!!!!! 
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

    // стейт чекбокса - изначально неактивен
    const [isChecked, setIsChecked] = React.useState(localStorage.getItem('checkedShort') === 'on' ? 'on' : 'off');

    // ЭФФЕКТЫ

    React.useEffect(() => {
        if (isLocalStorageMovies === null) {
            handleSearch(query)
        } else {
            handleDisplayContent(searchMovies)
        }
    }, [query, isChecked])


    React.useEffect(() => {
        compareLengthArr();// проверим, весь ли массив → да → убираем ЕЩЕ
    }, [renderedCard, searchMovies])


    // отобразим сообщение, если фильмы не найдены
    function handleDisplayContent(arr) {
        if (arr.length === 0) {
            setBlankPage(true);
            setMessageText('Фильмы по запросу не найдены');
        } else {
            setBlankPage(false);// страница не пустая
            console.log("ФИЛЬМЫ НАЙДЕНЫ")
            handleSearch(query)// обрабатываем сабмит
        };
    };

    // запрос поиска → обновляем
    function updateQuery(newQuery) {
        setQuery(newQuery);// стейт запроса → новая строка
        localStorage.setItem("query", newQuery);// сохраним в ЛС запрос 
        localStorage.setItem('checkedShort', setIsChecked);// состояние чекбокса
        setRenderedCard(defaultRenderedCard);// выдаем изначальное число карточек
        //compareLengthArr();
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


    const handleSearch = async (query) => {
        let searchMovies = allMovies;
        if (allMovies.length === 0) {
            searchMovies = await getMovies();
            setAllMovies(searchMovies);
        };
        console.log("ФИЛЬТРУЕМ ФИЛЬМЫ")
        console.log(isLocalStorageMovies)
        // фильтруем фильмы из ЛС
        filteredMovies(query, isLocalStorageMovies, isChecked);
    }

    // отфильтруем фильмы из базы по запросу в форме
    function filteredMovies(req, movies, checkbox) {
        if (movies === null) {
            console.log("НЕТ МАССИВА")
        } else {
            if (checkbox === "on") {
                const shorts = movies.filter((item) => item.duration < 40);
                //console.log("shorts ------", shorts)
                const filtered = shorts.filter(item => {
                    let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
                    //console.log("НАФИЛЬТРОВАЛИ -------", result)
                    return result;
                });
                //console.log("КОРОТКОМЕТРАЖКИ ------- ", filtered);
                setSearchMovies(filtered);
                localStorage.setItem("searchMovies", JSON.stringify(filtered));

            } else {
                const filtered = movies.filter(item => {
                    let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
                    return result;
                });
                //console.log(filtered);
                setSearchMovies(filtered);
                localStorage.setItem("searchMovies", JSON.stringify(filtered));
            }

        }
    };

    // обработчик чекбокса 
    function handleChecked(e) {
        //console.log("чекнули?", isChecked==="off")
        if (isChecked === "off") {
            setIsChecked('on')// включили 
            console.log("ON")
            localStorage.setItem("checkedShort", 'on');// сохраним в ЛС чек on +

        } else {
            setIsChecked('off')// выключили 
            console.log("OFF")
            localStorage.setItem("checkedShort", 'off');// сохраним в ЛС чек off +
        }
    }

    // отобразим/ скроем кнопку ЕЩЕ
    function compareLengthArr() {
        const arr = searchMovies;
        if (arr === null || undefined) {
            return
        } else {
            if (window >= 1225 && arr.length <= renderedCard.desktop) {
                console.log("выбрали массив на desktop");
                // console.log(arr.length);
                // console.log(renderedCard.desktop);
                setActiveButtonElse(false);
            } else if (window >= 713 && arr.length <= renderedCard.tablet) {
                console.log("выбрали массив на tablet");
                // console.log(arr.length);
                // console.log(renderedCard.tablet);
                setActiveButtonElse(false);
            } else if (window <= 712 && arr.length <= renderedCard.mobile) {
                console.log("выбрали массив на mobile");
                // console.log(arr.length);
                // console.log(renderedCard.mobile);
                setActiveButtonElse(false);
            } else {
                console.log("еще не весь массив");
                // console.log(arr.length);
                // console.log(renderedCard);
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
            onSubmitQuery={updateQuery}
            handleSearch={handleSearch}
            isChecked={isChecked}
            onClickFilter={handleChecked}
            messageText={messageText}
        >
            {!blankPage && <ButtonElse onClickElse={handleClickElse} activeButtonElse={activeButtonElse} />}
        </Movies>
    )
}
export default MoviesBase;