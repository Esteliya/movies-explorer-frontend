import React from 'react';
import './MoviesSaved.css';
import Movies from "../Movies/Movies";
import { filteredMovies } from '../../utils/handlers';
import { useValidationSearchForm } from '../../utils/validation';
import { NOT_MOVIES } from "../../utils/constants";

function MoviesSaved(props) {
    const { handleDataForm, deleteMovies, window, arrMovies } = props;

    // СТЕЙТЫ
    // запрос (строка)
    const [query, setQuery] = React.useState(localStorage.getItem("querySavedMovies") || '');
    // стейт карточек для рендера после поиска???? 
    const [isRenderCard, setIsRenderCard] = React.useState(arrMovies);//массив с апи
    // стейт чекбокса - изначально неактивен
    const [isChecked, setIsChecked] = React.useState('off');
    // стейт состояния страницы: пустая или нет? 
    const [blankPage, setBlankPage] = React.useState(false);
    // стейт сообщения на странице с фильмами: фильмы не найдены
    const [messageText, setMessageText] = React.useState('');
    // валидация
    const { isValid, setIsValid, showError, setShowError, isTextError, setIsTextError, currentQuery, setCurrentQuery, handleQuery } = useValidationSearchForm();

    React.useEffect(() => {
        const arr = filteredMovies(query, arrMovies, isChecked);
        setIsRenderCard(arr);
        if (arr.length === 0) {
            setBlankPage(true);
            setMessageText(NOT_MOVIES);
        } else {
            setBlankPage(false);
        }
    }, [isChecked, query, arrMovies, blankPage]);

    // обработчик поиска
    const handleSearchSavedMovies = (query) => {
        const searchMovies = filteredMovies(query, arrMovies, isChecked);
        setIsRenderCard(searchMovies);
    };

    React.useEffect(() => {
        if (currentQuery !== query) {
            setIsValid(true);
            // setShowError(false)
        };
    }, [currentQuery, query]);

    React.useEffect(() => {
        setShowError(!isValid);
        handleSearchSavedMovies(query);
    }, [isChecked, query, isValid, showError]);

    // запрос поиска → обновляем 
    function updateQuery(newQuery) {
        // console.log(newQuery)
        handleQuery(newQuery, query);
        setQuery(newQuery);
        localStorage.setItem("querySavedMovies", newQuery);// сохраним в ЛС запрос 
    };

    // обработчик чекбокса 
    function handleChecked(e) {
        if (isChecked === "off") {
            setIsChecked('on');// включили 
            // console.log("ON")

        } else {
            setIsChecked('off');// выключили 
            // console.log("OFF")
        };
    };

    // удаляем фильм
    const handlenClickCardButton = async (card) => {
        // console.log("ID >>>>> ", card._id);
        await deleteMovies(card._id);

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