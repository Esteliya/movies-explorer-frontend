import React from 'react';
import './MoviesSaved.css'

import Movies from "../Movies/Movies"

// import cards from "../../utils/saveCards";

// СДЕЛАТЬ!! 


function MoviesSaved(props) {
    const { mobile, cards, blankPage, messageText, handleDataForm, getMovies, deleteMovies } = props;
    //  setQuery, query, handleSearch

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
    const [isRenderCard, setRenderCard] = React.useState(JSON.parse(localStorage.getItem('savedAllMovies')))
    // JSON.parse(localStorage.getItem('searchSavedMovies')) ?? JSON.parse(localStorage.getItem('savedAllMovies')) // МАССИВЫ


    // запрашиваем фильмы
    React.useEffect(() => {
        if (!localStorage.getItem('savedAllMovies')) {
            getMovies();// приходит массив с апи
        } else {
            console.log(JSON.parse(localStorage.getItem('searchSavedMovies')))// есть в ЛС сохраненные фильмы
        }
        getSavedMovies();
    }, []);

    // запрос поиска → обновляем
    function updateQuery(newQuery) {
        setQuery(newQuery);
    };

    // отрисовываем карточки
    const getSavedMovies = async () => {
        //console.log(cards)
        let searchMovies = cards;
        if (cards.length === 0) {
            searchMovies = await getMovies();
            console.log(searchMovies)
            pushLocalStorage(searchMovies);
            console.warn(JSON.parse(localStorage.getItem("savedAllMovies")));
        };
    }

    const filteredSavedMovies = [];//отфильтрованные фильмы по запросу

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
    }

    // удаляем фильм
    function handlenClickCardButton (card) {
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
            query={query}
            setQuery={updateQuery}
            handleSearch={handleSavedMoviesSearch}
            messageText={messageText}
            handleDataForm={handleDataForm}
            onClickCardButton={handlenClickCardButton} />
    )
}

export default MoviesSaved;