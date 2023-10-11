import React from 'react';
import './MoviesSaved.css';
import Movies from "../Movies/Movies";
import { filteredMovies } from '../../utils/handlers';

function MoviesSaved(props) {
    const { handleDataForm, deleteMovies, window, arrMovies } = props;

    // СТЕЙТЫ
    // запрос (строка)
    const [query, setQuery] = React.useState(localStorage.getItem("querySavedMovies") || '');
    // стейт карточек для рендера после поиска???? 
    const [isRenderCard, setIsRenderCard] = React.useState(arrMovies)//массив с апи
    // стейт чекбокса - изначально неактивен
    const [isChecked, setIsChecked] = React.useState('off');
    // стейт состояния страницы: пустая или нет? 
    const [blankPage, setBlankPage] = React.useState(false);
    // стейт сообщения на странице с фильмами: фильмы не найдены
    const [messageText, setMessageText] = React.useState('');

     // валидация 
     const [isValid, setIsValid] = React.useState(true);
     // показать ошибку если данные невалидны
     const [showError, setShowError] = React.useState(false);
     // текст ошибки
     const [isTextError, setIsTextError] = React.useState('Результат запрса уже на странице. Задайте новые параметры поиска.');// текст ошибки
     // текущая строка поиска
     const [currentQuery, setCurrentQuery] = React.useState("")

    React.useEffect(() => {
        const arr = filteredMovies(query, arrMovies, isChecked);
        // console.log("ЧТО В МАССИВЕ? ------ ", arr)//+
        setIsRenderCard(arr)
        if (arr.length === 0) {
            // console.log("НЕТ МАССИВА!!!!!")
            setBlankPage(true)
            setMessageText('Фильмы по запросу не найдены');
            // console.log("СООБЩЕНИЕ ----- ", messageText)
            // console.log("ПУСТАЯ СТРАНИЦА??? ----- ", blankPage)
        } else {
            setBlankPage(false)
        }
    }, [isChecked, query, arrMovies, blankPage]);

    // обработчик поиска
    const handleSearchSavedMovies = (query) => {
        const searchMovies = filteredMovies(query, arrMovies, isChecked);
        setIsRenderCard(searchMovies);
        //console.log("ФИЛЬТРУЕМ ФИЛЬМЫ ---- ", isRenderCard)// нужный массив есть
    };

    React.useEffect(() => {
        if (currentQuery !== query) {
            console.log("мы тут -------!!! Валидно!!!")
            setIsValid(true);
            // setShowError(false)
        }
    }, [currentQuery, query])

    React.useEffect(() => {
        setShowError(!isValid)
        handleSearchSavedMovies(query);
    }, [isChecked, query, isValid, showError]);

    // запрос поиска → обновляем 
    function updateQuery(newQuery) {
        // console.log(newQuery)
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
        setQuery(newQuery);
    };

    // обработчик чекбокса 
    function handleChecked(e) {
        if (isChecked === "off") {
            setIsChecked('on')// включили 
            // console.log("ON")

        } else {
            setIsChecked('off')// выключили 
            // console.log("OFF")
        };
    };

    // удаляем фильм
    const handlenClickCardButton = async (card) => {
        // console.log("передадим карточку дальше")
        // console.log("card._id -------- ", card._id)
        await deleteMovies(card);
        //openResultPopup();// попап успешного удаления фильма - ????
    };

    return (
        <Movies
            cards={isRenderCard}
            blankPage={blankPage}
            submitQuery={query}
            onSubmitQuery={updateQuery}
            handleSearch={handleSearchSavedMovies}
            isChecked={isChecked}
            onClickFilter={handleChecked}
            messageText={messageText}
            handleDataForm={handleDataForm}
            onClickCardButton={handlenClickCardButton}
            window={window}
            isValid={isValid}
            showError={showError}
            isTextError={isTextError}
            setCurrentQuery={setCurrentQuery} />
    )
};

export default MoviesSaved;