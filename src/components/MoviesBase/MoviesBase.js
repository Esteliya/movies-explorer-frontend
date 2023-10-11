import React from 'react';
import './MoviesBase.css';
import Movies from "../Movies/Movies";
import ButtonElse from "./ButtonElse/ButtonElse";
import { filteredMovies } from '../../utils/handlers';

function MoviesBase(props) {
    // формат экрана/ клик по кнопке карточки: сохранить-удалить/ запрос к апи за фильмами/...за сохраненными
    const { window, onSave, onDelete, getMovies, savedAllMovies } = props;

    // СТЕЙТЫ
    // массив поиска → из get-запроса
    const isLocalStorageMovies = JSON.parse(localStorage.getItem("allMovies"));
    // стейт карточек для рендера → меняется в зависимости от запроса и чекбокса
    const [isRenderCard, setIsRenderCard] = React.useState([]);
    // запрос (строка)
    const [query, setQuery] = React.useState(localStorage.getItem("query") || '');
    // стейт чекбокса - изначально неактивен
    const [isChecked, setIsChecked] = React.useState(localStorage.getItem('checkedShort') === 'on' ? 'on' : 'off');
    // стейт состояния страницы: пустая или нет? 
    const [blankPage, setBlankPage] = React.useState(true);
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
    // валидация 
    const [isValid, setIsValid] = React.useState(true);
    // показать ошибку если данные невалидны
    const [showError, setShowError] = React.useState(false);
    // текст ошибки
    const [isTextError, setIsTextError] = React.useState('Результат запрса уже на странице. Задайте новые параметры поиска.');// текст ошибки
    // текущая строка поиска
    const [currentQuery, setCurrentQuery] = React.useState("")


    // ЭФФЕКТЫ
    React.useEffect(() => {
        setShowError(!isValid)
        handleSearch(query);
    }, [isChecked, query, isValid, showError]);

    React.useEffect(() => {
        if (currentQuery !== query) {
            console.log("мы тут -------!!! Валидно!!!")
            setIsValid(true);
            // setShowError(false)
        }
    }, [currentQuery, query])

    React.useEffect(() => {
        compareLengthArr();// проверим, весь ли массив → да → убираем ЕЩЕ
    }, [visibleCard, isRenderCard, window]);

    React.useEffect(() => {
        if (!localStorage.getItem('checkedShort') || !localStorage.getItem('query')) {
            setBlankPage(true);// страница пустая
            setMessageText(messageText);
            return;
        } else {
            handleDisplayContent(isRenderCard);
        }
    }, [visibleCard, isRenderCard, window]);

    // выдача карточек по клику ЕЩЕ
    React.useEffect(() => {
        localStorage.setItem("savedLineCard", JSON.stringify(visibleCard));
    }, [visibleCard]);

    // отобразим сообщение, если фильмы не найдены
    function handleDisplayContent(arr) {
        if (arr === null || arr === undefined) {
            setMessageText(messageText);
        } else {
            if (arr.length === 0) {
                setBlankPage(true);
                setMessageText('Фильмы по запросу не найдены');
            } else {
                setBlankPage(false);// страница не пустая
                // console.log("ФИЛЬМЫ НАЙДЕНЫ");
            };
        };
    };

    // запрос поиска → обновляем
    function updateQuery(newQuery) {
        // console.log("валидный запрос ранее?", isValid)
        // console.log("query", query)
        // console.log("newQuery", newQuery)
        // строка пустая? 
        if (newQuery === "") {
            console.log("Пустая строка")
            setIsValid(false)
            // setShowError(true)
            setIsTextError("Введите текст запроса")
            return
        }
        // посвторный запрос 
        if (newQuery === query) {
            console.log("Повторный запрос")
            setIsValid(false)
            // setShowError(true)
            setIsTextError("Результат запроса уже на странице")
            return
        }
        setQuery(newQuery);// стейт запроса → новая строка
        localStorage.setItem("query", newQuery);// сохраним в ЛС запрос 
        localStorage.setItem('checkedShort', isChecked);// состояние чекбокса
        localStorage.removeItem("savedLineCard");// удаляем сохраненное количество карточек на выдаче
        setVisibleCard(defaultVisibleCard);
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

    // обработка запроса
    const handleSearch = async (query) => {
        if (isLocalStorageMovies === null) {
            const arr = await getMovies();// ждем массив с апи
            localStorage.setItem("allMovies", JSON.stringify(arr));
        }
        // console.log(isLocalStorageMovies);
        const searchMovies = filteredMovies(query, isLocalStorageMovies, isChecked);
        setIsRenderCard(searchMovies);
    }

    // обработчик чекбокса 
    function handleChecked(e) {
        if (isChecked === "off") {
            setIsChecked('on');// включили 
            // console.log("ON");
            localStorage.setItem("checkedShort", 'on');// сохраним в ЛС чек on +
        } else {
            setIsChecked('off');// выключили 
            // console.log("OFF");
            localStorage.setItem("checkedShort", 'off');// сохраним в ЛС чек off +
        };
    };

    // отобразим/ скроем кнопку ЕЩЕ
    function compareLengthArr() {
        // console.log(isRenderCard);
        const arr = isRenderCard;
        if (arr === null || arr === undefined) {
            return;
        } else {
            if (window >= 1225 && arr.length <= visibleCard.desktop) {
                // console.log("выбрали массив на desktop");
                // console.log(arr.length);
                // console.log(renderedCard.desktop);
                setActiveButtonElse(false);
            } else if (window >= 713 && arr.length <= visibleCard.tablet) {
                // console.log("выбрали массив на tablet");
                // console.log(arr.length);
                // console.log(renderedCard.tablet);
                setActiveButtonElse(false);
            } else if (window <= 712 && arr.length <= visibleCard.mobile) {
                // console.log("выбрали массив на mobile");
                // console.log(arr.length);
                // console.log(renderedCard.mobile);
                setActiveButtonElse(false);
            } else {
                // console.log("еще не весь массив");
                // console.log(arr.length);
                // console.log(renderedCard);
                setActiveButtonElse(true);
            };
        };
    };

    // обработчик клика по кнопке лайка
    const handlenClickCLike = (card) => {
        // console.log("card -------- ", card)
        if (card.isLiked) {
            // console.log("ЛАЙК УДАЛЯЕМ")
            onDelete(card);
        } else {
            // console.log("ЛАЙК СТАВИМ")
            onSave(card);
        };
    };

    return (
        <Movies
            cards={isRenderCard}
            savedAllMovies={savedAllMovies}
            visibleCard={visibleCard}
            window={window}
            onClickCardButton={handlenClickCLike}
            blankPage={blankPage}
            submitQuery={query}
            onSubmitQuery={updateQuery}
            handleSearch={handleSearch}
            isChecked={isChecked}
            onClickFilter={handleChecked}
            isValid={isValid}
            showError={showError}
            isTextError={isTextError}
            messageText={messageText}
            setCurrentQuery={setCurrentQuery}
        >
            {!blankPage && <ButtonElse onClickElse={handleClickElse} activeButtonElse={activeButtonElse} />}
        </Movies>
    )
};

export default MoviesBase;