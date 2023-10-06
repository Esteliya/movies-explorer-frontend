import React from 'react';
import './MoviesBase.css';
import Movies from "../Movies/Movies";
import ButtonElse from "./ButtonElse/ButtonElse";
import { BASE_MOVIES_URL } from '../../utils/config'; // путь к картинкам фильмов
// import { BASE_MOVIES_URL, MOVIES_URL } from '../../utils/config'; // ловим путь к превью
// import cards from "../../utils/cards";


import { filteredMovies } from '../../utils/hooks';

function MoviesBase(props) {
    // формат экрана/ клик по кнопке карточки/ запрос к апи за фильмами
    const { window, onClickCardButton, getMovies } = props;

    // СТЕЙТЫ
    // массив поиска → из get-запроса
    const isLocalStorageMovies = JSON.parse(localStorage.getItem("allMovies"));
    //const [allMovies, setAllMovies] = React.useState([]);
    // стейт карточек для рендера → меняется в зависимости от запроса и чекбокса
    const [isRenderCard, setIsRenderCard] = React.useState([])
    // запрос (строка)
    const [query, setQuery] = React.useState(localStorage.getItem("query") || '');
    // стейт чекбокса - изначально неактивен
    const [isChecked, setIsChecked] = React.useState(localStorage.getItem('checkedShort') === 'on' ? 'on' : 'off');
    // массив фильмов после поиска → изменяем при каждом поиске
    ///const [searchMovies, setSearchMovies] = React.useState(JSON.parse(localStorage.getItem('searchMovies')) || []);
    // стейт состояния страницы: пустая или нет? 
    const [blankPage, setBlankPage] = React.useState(true); // НАСТРОИТЬ!!!!! 
    // стейт сообщения на странице с фильмами: сообщения об ошибках/не найденных фильмах/просьба о поиске...
    const [messageText, setMessageText] = React.useState('Запустите поиск интересующих Вас фильмов');
    // количество карточек по умолчанию → передадим в стейт ↓ ↓ ↓
    const defaultVisibleCard = {
        desktop: 12,
        tablet: 8,
        mobile: 5,
    };
    // стейт отображаемых карточек с фильмами  
    const [visibleCard, setVisibleCard] = React.useState(() => {
        const savedVisibleCard = localStorage.getItem('savedLineCard');
        return savedVisibleCard ? JSON.parse(savedVisibleCard) : defaultVisibleCard;
    });
    // стейт активности кнопки ЕЩЕ 
    const [activeButtonElse, setActiveButtonElse] = React.useState(true);


    // ЭФФЕКТЫ
    React.useEffect(() => {
        handleSearch(query)
    }, [isChecked, query])

    React.useEffect(() => {
        compareLengthArr();// проверим, весь ли массив → да → убираем ЕЩЕ
    }, [visibleCard, isRenderCard, window])

    React.useEffect(() => {
        if (!localStorage.getItem('checkedShort') || localStorage.getItem('query')) {
            setBlankPage(true);// страница пустая
            setMessageText(messageText);
            return
        } else {
            handleDisplayContent(isRenderCard)
        }
    }, [visibleCard, isRenderCard, window])

    // выдача карточек по клику ЕЩЕ
    React.useEffect(() => {
        localStorage.setItem("savedLineCard", JSON.stringify(visibleCard));
    }, [visibleCard])


    // отобразим сообщение, если фильмы не найдены
    function handleDisplayContent(arr) {

        if (arr === null || arr === undefined) {
            setMessageText(messageText)
        } else {
            if (arr.length === 0) {
                setBlankPage(true);
                setMessageText('Фильмы по запросу не найдены');
            } else {
                setBlankPage(false);// страница не пустая
                console.log("ФИЛЬМЫ НАЙДЕНЫ")
            };
        }
    };

    // запрос поиска → обновляем
    function updateQuery(newQuery) {
        setQuery(newQuery);// стейт запроса → новая строка
        localStorage.setItem("query", newQuery);// сохраним в ЛС запрос 
        localStorage.setItem('checkedShort', isChecked);// состояние чекбокса
        localStorage.removeItem("savedLineCard");// удаляем сохраненное количество карточек на выдаче
    };

    // отрисовываем нужное число карточек
    function handleClickElse() {
        setVisibleCard((prevState) => ({
            ...prevState, // копирование предыдущего состояния
            desktop: prevState.desktop + 3,
            tablet: prevState.tablet + 2,
            mobile: prevState.mobile + 2,
        }));
        compareLengthArr();
    };

    const handleSearch = async (query) => {
        console.log('>>> step 2');

        if (isLocalStorageMovies === null) {
            const arr = await getMovies();// ждем массив с апи
            //setAllMovies(searchMovies);// записали массив в стейт
            localStorage.setItem("allMovies", JSON.stringify(arr));
            /* Promise.all([ getMovies() ]).then( () => {
                console.log(isLocalStorageMovies);

                const searchMovies = filteredMovies(query, isLocalStorageMovies, isChecked);
                setIsRenderCard(searchMovies);
            }
            ) */
            

        }
        console.log(isLocalStorageMovies);

            const searchMovies = filteredMovies(query, isLocalStorageMovies, isChecked);
            setIsRenderCard(searchMovies);

        // console.log("ФИЛЬТРУЕМ ФИЛЬМЫ ИЗ ЛС ---- ", isLocalStorageMovies)

        // фильтруем фильмы из ЛС


    }

    // отфильтруем фильмы из базы по запросу в форме
    /* function filteredMovies(req, movies, checkbox) {
        if (movies === null || undefined) {
            //setBlankPage(true);// страница пустая
           //setMessageText(messageText);
            return
        }
        //console.log("ЕСТЬ МАССИВ")
        //setBlankPage(false);//страница НЕ пустая
        if (checkbox === "on") {
            const shorts = movies.filter((item) => item.duration < 40);
            const filtered = shorts.filter(item => {
                let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
                //console.log("НАФИЛЬТРОВАЛИ -------", result)
                return result;
            });
            //console.log("КОРОТКОМЕТРАЖКИ ------- ", filtered);
            setIsRenderCard(filtered);
        } else {
            const filtered = movies.filter(item => {
                let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
                return result;
            });
            //.log("ОТФИЛЬТРОВАЛИ ------- ", filtered);
            setIsRenderCard(filtered);
        }
    }; */

    // обработчик чекбокса 
    function handleChecked(e) {
        console.log('step 3');

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
        console.log(isRenderCard)
        const arr = isRenderCard;
        if (arr === null || arr === undefined) {
            return
        } else {
            if (window >= 1225 && arr.length <= visibleCard.desktop) {
                console.log("выбрали массив на desktop");
                // console.log(arr.length);
                // console.log(renderedCard.desktop);
                setActiveButtonElse(false);
            } else if (window >= 713 && arr.length <= visibleCard.tablet) {
                console.log("выбрали массив на tablet");
                // console.log(arr.length);
                // console.log(renderedCard.tablet);
                setActiveButtonElse(false);
            } else if (window <= 712 && arr.length <= visibleCard.mobile) {
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
            cards={isRenderCard}
            visibleCard={visibleCard}
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