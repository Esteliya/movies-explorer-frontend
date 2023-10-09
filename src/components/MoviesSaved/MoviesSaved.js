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

    // запрос поиска → обновляем - НАДО ЛИ???
    function updateQuery(newQuery) {
        // console.log(newQuery)
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
            window={window} />
    )
};

export default MoviesSaved;