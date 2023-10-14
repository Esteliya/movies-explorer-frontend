import React from 'react';
import './MoviesBase.css';
import Movies from "../Movies/Movies";
import ButtonElse from "./ButtonElse/ButtonElse";
import { filteredMovies, getSavedMovie } from '../../utils/handlers';
import { useValidationSearchForm } from '../../utils/validation';
import { START_SEARCH, NOT_MOVIES, DESKTOP_DEFAULT_CARD, TABLET_DEFAULT_CARD, MOBILE_DEFAULT_CARD, DESKTOP_ELSE_CARD, TABLET_ELSE_CARD, MOBILE_ELSE_CARD, } from "../../utils/constants";

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
    const [messageText, setMessageText] = React.useState(START_SEARCH);
    // количество карточек по умолчанию → передадим в стейт ↓ ↓ ↓
    const defaultVisibleCard = {
        desktop: DESKTOP_DEFAULT_CARD,
        tablet: TABLET_DEFAULT_CARD,
        mobile: MOBILE_DEFAULT_CARD,
    };
    // стейт отображаемых карточек с фильмами  
    const [visibleCard, setVisibleCard] = React.useState(() => {
        const savedVisibleCard = localStorage.getItem('savedLineCard');
        return savedVisibleCard ? JSON.parse(savedVisibleCard) : defaultVisibleCard;
    });
    // стейт активности кнопки ЕЩЕ 
    const [activeButtonElse, setActiveButtonElse] = React.useState(true);

    const { isValid, setIsValid, showError, setShowError, isTextError, setIsTextError, currentQuery, setCurrentQuery, handleQuery } = useValidationSearchForm();

    // ЭФФЕКТЫ
    React.useEffect(() => {
        setShowError(!isValid)
        handleSearch(query);
    }, [isChecked, query, isValid, showError]);

    React.useEffect(() => {
        if (currentQuery !== query) {
            setIsValid(true);
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

    // установим состояние чекбокса из стейта + следим за состоянием чекбокса
    React.useEffect(() => {
        localStorage.setItem('checkedShort', isChecked);
    }, [isChecked]);

    // отобразим сообщение, если фильмы не найдены
    function handleDisplayContent(arr) {
        if (arr === null || arr === undefined) {
            setMessageText(messageText);
        } else {
            if (arr.length === 0) {
                setBlankPage(true);
                setMessageText(NOT_MOVIES);
            } else {
                setBlankPage(false);// страница не пустая
            };
        };
    };

    // запрос поиска → обновляем
    function updateQuery(newQuery) {
        // console.log("СТЕТ ЧЕКБОКСА ----- ", isChecked)
        // console.log(localStorage.getItem('checkedShort'))
        handleQuery(newQuery, query, localStorage.getItem('checkedShort'), isChecked);
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
            desktop: prevState.desktop + DESKTOP_ELSE_CARD,
            tablet: prevState.tablet + TABLET_ELSE_CARD,
            mobile: prevState.mobile + MOBILE_ELSE_CARD,
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
            console.log("ON");
            localStorage.setItem("checkedShort", 'on');// сохраним в ЛС чек on +
        } else {
            setIsChecked('off');// выключили 
            console.log("OFF");
            localStorage.setItem("checkedShort", 'off');// сохраним в ЛС чек off +
        };
    };
    // фильтруем по текущему состоянию строки
    function handleOnChangeFilter() {
        updateQuery(currentQuery || query);// если нет текущей строки, то прежнее стостояние
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


    return (
        <Movies
            cards={isRenderCard}
            savedAllMovies={savedAllMovies}
            visibleCard={visibleCard}
            window={window}
            deleteMovie={onDelete}
            saveMovie={onSave}
            blankPage={blankPage}
            submitQuery={query}
            onSubmitQuery={updateQuery}
            handleSearch={handleSearch}
            isChecked={isChecked}
            onClickFilter={handleChecked}
            onChangeFilter={handleOnChangeFilter}
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