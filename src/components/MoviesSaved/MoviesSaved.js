import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesSaved.css'

import Movies from "../Movies/Movies"

// import cards from "../../utils/saveCards";

// СДЕЛАТЬ!! 


function MoviesSaved(props) {
    const { mobile, cards, handleDataForm, getMovies, deleteMovies } = props;
    //  setQuery, query, handleSearch
    const location = useLocation();

    // СТЕЙТЫ
    // массив → из get-запроса
    const savedAllArrMovies = JSON.parse(localStorage.getItem("savedAllMovies"));
    // количество карточек по умолчанию → передадим в стейт ↓ ↓ ↓
    const defaultRenderedCard = {
        desktop: 12,
        tablet: 8,
        mobile: 5,
    };
    // массив фильмов после поиска → изменяем при каждом поиске
    const [searchSavedMovies, setSearchSavedMovies] = React.useState(JSON.parse(localStorage.getItem("searchSavedMovies")) || []);
    // запрос (строка)
    const [query, setQuery] = React.useState(localStorage.getItem("querySavedMovies") || '');
    // стейт карточек для рендера
    const [isRenderCard, setRenderCard] = React.useState(JSON.parse(localStorage.getItem('savedAllMovies')) || [])
    // JSON.parse(localStorage.getItem('searchSavedMovies')) ?? JSON.parse(localStorage.getItem('savedAllMovies')) // МАССИВЫ
    // стейт состояния страницы: пустая или нет? 
    const [blankPage, setBlankPage] = React.useState(false);
    // стейт сообщения на странице с фильмами: фильмы не найдены
    const [messageText, setMessageText] = React.useState('');


    // запрашиваем фильмы
    React.useEffect(() => {
        // console.log("принудительно обновили страницу")
        if (!localStorage.getItem('savedAllMovies')) {
            getMovies();// приходит массив с апи
            // console.log("GET запрос прошел")
        }
        getSavedMovies();
        // console.log("запросили сохраненные фильмы - ГиДЕ???")
    }, [location]);// принудительно запустим первое монтирование при перелючении на роут

    React.useEffect(() => {
        setRenderCard(isRenderCard)
    }, []);


    // отобразим сообщение, если фильмы не найдены
    function handleMassege() {
        if (searchSavedMovies.length === 0) {
            setBlankPage(true);
            setMessageText('Фильмы по запросу не найдены');
        } else {
            setBlankPage(false);
        };
    };


    // запрос поиска → обновляем
    function updateQuery(newQuery) {
        setQuery(newQuery);
        handleMassege();// если фильмы не найдены → сообщение
    };

    // отрисовываем карточки
    const getSavedMovies = async () => {
        //console.log(cards)
        let searchMovies = cards;
        if (cards.length === 0) {
            searchMovies = await getMovies();
            console.log(searchMovies)
            pushLocalStorage(searchMovies);
            //console.warn(JSON.parse(localStorage.getItem("savedAllMovies")));
        };
    }

    const filteredSavedMovies = [];//отфильтрованные фильмы по запросу

    // обработчик полученных сохраненных фильмов
    function handleSavedMoviesSearch(query) {
        // фильтруем фильмы из ЛС
        filteredMovies(query, JSON.parse(localStorage.getItem("savedAllMovies")));
        console.log("---- ЧТО НАФИЛЬТРОВАЛИ? ----")
        console.log(filteredSavedMovies);

        setSearchSavedMovies(filteredSavedMovies);
        localStorage.setItem('searchSavedMovies', JSON.stringify(filteredSavedMovies));
        setRenderCard(JSON.parse(localStorage.getItem('searchSavedMovies')))
    }

    // отфильтруем фильмы из базы по запросу в форме
    function filteredMovies(req, movies) {
        for (let i = 0; i < movies.length; i++) {
            const item = movies[i];
            // поиск в названии RU и EN без учета регистра
            let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
            if (result) {
                filteredSavedMovies.push(item);
            }
        };
    };

    // сохраняем фильмы с апи в ЛС
    function pushLocalStorage(arr) {
        localStorage.setItem("savedAllMovies", JSON.stringify(arr));
        setRenderCard(arr);
    }

    // удаляем фильм
    function handlenClickCardButton(card) {
        console.log("передадим карточку дальше")
        console.log(card)
        // удалить с бэка
        deleteMovies(card)
        // ждем удаления 

        //удалить из ЛС в двух местах "savedAllMovies" и "searchSavedMovies"
    }


    return (
        <Movies
            cards={isRenderCard}
            mobile={mobile}
            blankPage={blankPage}
            submitQuery={query}
            setSubmitQuery={updateQuery}
            handleSearch={handleSavedMoviesSearch}
            messageText={messageText}
            handleDataForm={handleDataForm}
            onClickCardButton={handlenClickCardButton} />
    )
}

export default MoviesSaved;