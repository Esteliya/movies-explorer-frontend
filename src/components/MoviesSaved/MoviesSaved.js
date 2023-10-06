import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesSaved.css'

import Movies from "../Movies/Movies"

function MoviesSaved(props) {
    const { handleDataForm, getMovies, deleteMovies, window } = props;
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
    const [isSavedMovies, setIsSavedMovies] = React.useState([]);

    // массив фильмов после поиска → изменяем при каждом поиске
    const [searchSavedMovies, setSearchSavedMovies] = React.useState([]);
    // запрос (строка)
    const [query, setQuery] = React.useState(localStorage.getItem("querySavedMovies") || '');
    // стейт карточек для рендера
    const [isRenderCard, setIsRenderCard] = React.useState([])
    // стейт чекбокса - изначально неактивен
    const [isChecked, setIsChecked] = React.useState('off');
    // JSON.parse(localStorage.getItem('searchSavedMovies')) ?? JSON.parse(localStorage.getItem('savedAllMovies')) // МАССИВЫ
    // стейт состояния страницы: пустая или нет? 
    const [blankPage, setBlankPage] = React.useState(false);
    // стейт сообщения на странице с фильмами: фильмы не найдены
    const [messageText, setMessageText] = React.useState('');


    // запрашиваем фильмы
    React.useEffect(() => {
        
        getSavedMovies();
       
    }, [location]);// принудительно запустим первое монтирование при перелючении на роут


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

    // запросим карточки с апи
    const getSavedMovies = async () => {
        //console.log(cards)
        let searchMovies = isRenderCard;
        searchMovies = await getMovies();
        setIsRenderCard(searchMovies)
       
    }

    // обработчик поиска 
    const handleSearchSavedMovies = async (query) => {
        if (isRenderCard.length === 0) {
            getSavedMovies()
        };
        filteredMovies(query, isRenderCard, isChecked);
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
                setIsRenderCard(filtered);

            } else {
                const filtered = movies.filter(item => {
                    let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
                    return result;
                });
                //console.log(filtered);
                setIsRenderCard(filtered);
            }

        }
    };

    // обработчик чекбокса 
    function handleChecked(e) {
        //console.log("чекнули?", isChecked==="off")
        if (isChecked === "off") {
            setIsChecked('on')// включили 
            console.log(isChecked)
            //localStorage.setItem("checkedShort", 'on');// сохраним в ЛС чек on +

        } else {
            setIsChecked('off')// выключили 
            console.log(isChecked)
            //localStorage.setItem("checkedShort", 'off');// сохраним в ЛС чек off +
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