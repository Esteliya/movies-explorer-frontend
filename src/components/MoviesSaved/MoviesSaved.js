import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesSaved.css'

import Movies from "../Movies/Movies"


import { filteredMovies } from '../../utils/hooks';

function MoviesSaved(props) {
    const { handleDataForm, deleteMovies, window, arrMovies } = props;
    //  setQuery, query, handleSearch
    const location = useLocation();

    // СТЕЙТЫ
    // массив → из get-запроса
    //const isLocalStorageSavedAllArrMovies = JSON.parse(localStorage.getItem("savedAllMovies"));// все сохраненные пользователем фильмы
    //const isLocalStorageSearchSavedMovies = JSON.parse(localStorage.getItem('searchSavedMovies'));// результат поиска
    // количество карточек по умолчанию → передадим в стейт ↓ ↓ ↓
    /*     const defaultRenderedCard = {
            desktop: 12,
            tablet: 8,
            mobile: 5,
        }; */
    //const [isSavedMovies, setIsSavedMovies] = React.useState(arrMovies);

    // массив фильмов после поиска → изменяем при каждом поиске
    //const [searchSavedMovies, setSearchSavedMovies] = React.useState([]);
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


    // запрашиваем фильмы
    React.useEffect(() => {
        //getSavedMovies();
    }, [location]);// принудительно запустим первое монтирование при перелючении на роут

    React.useEffect(() => {
        const arr = filteredMovies(query, arrMovies, isChecked);
        console.log("ЧТО В МАССИВЕ? ------ ", arr)//+
        setIsRenderCard(arr)
        if (arr.length === 0) {
            console.log("НЕТ МАССИВА!!!!!")
            setBlankPage(true)
            setMessageText('Фильмы по запросу не найдены');
            // console.log("СООБЩЕНИЕ ----- ", messageText)
            // console.log("ПУСТАЯ СТРАНИЦА??? ----- ", blankPage)
        } else {
            setBlankPage(false)
        }
    }, [isChecked, query, arrMovies, blankPage])

    

    // обработчик поиска
    const handleSearchSavedMovies = (query) => {
        const searchMovies = filteredMovies(query, arrMovies, isChecked);
        setIsRenderCard(searchMovies);
        //console.log("ФИЛЬТРУЕМ ФИЛЬМЫ ---- ", isRenderCard)// нужный массив есть
    }

    // запрос поиска → обновляем - НАДО ЛИ???
    function updateQuery(newQuery) {
        setQuery(newQuery);
    };

    // запросим карточки с апи
    /* const getSavedMovies = async () => {
        //console.log(cards)
        let searchMovies = isRenderCard;
        searchMovies = await getMovies();
        setIsRenderCard(searchMovies)
    } */


    // обработчик чекбокса 
    function handleChecked(e) {
        if (isChecked === "off") {
            setIsChecked('on')// включили 
            console.log("ON")
            //localStorage.setItem("checkedShortSavedMovies", 'on');// сохраним в ЛС чек on +

        } else {
            setIsChecked('off')// выключили 
            console.log("OFF")
            //localStorage.setItem("checkedShortSavedMovies", 'off');// сохраним в ЛС чек off +
        }
    }

    // удаляем фильм
    const handlenClickCardButton = async (card) => {
        console.log("передадим карточку дальше")
        console.log("card._id -------- ", card._id)
        // удалить с бэка
        /* await deleteMovies(card)
        const updatedArr = deleteMoviesFromLocalStorage(isLocalStorageSavedAllArrMovies, card._id)
        console.log("новый массив -------- ", updatedArr)
        setIsRenderCard(filteredSavedMovies)// обновим стейт
        localStorage.setItem('savedAllMovies', JSON.stringify(filteredSavedMovies));// обновим ЛС всех сохраненных фильмов
        localStorage.setItem('searchSavedMovies', JSON.stringify(filteredSavedMovies));// обновим стейт поиска
 */
        //setIsRenderCard(updatedArr)

        // убрать фильм из локалсторидж   КАК????

        // ждем удаления 

        //удалить из ЛС в двух местах "savedAllMovies" и "searchSavedMovies"
    }

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
}

export default MoviesSaved;