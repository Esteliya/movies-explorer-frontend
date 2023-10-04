import React from 'react';
import './MoviesBase.css';
import Movies from "../Movies/Movies";
import ButtonElse from "./ButtonElse/ButtonElse";
import { BASE_MOVIES_URL } from '../../utils/config'; // путь к картинкам фильмов
// import { BASE_MOVIES_URL, MOVIES_URL } from '../../utils/config'; // ловим путь к превью
// import cards from "../../utils/cards";

function MoviesBase(props) {
    // пустая страница?/ массив фильмов/ формат экрана/ клик по кнопке карточки/ запрос к апи за фильмами
    const { window, onClickCardButton, getMovies } = props;

    // СТЕЙТЫ
    // массив поиска → из get-запроса
    const isLocalStorageMovies = JSON.parse(localStorage.getItem("allMovies"));
    const [allMovies, setAllMovies] = React.useState(isLocalStorageMovies || []);
    // запрос (строка)
    const [query, setQuery] = React.useState(localStorage.getItem("query") || '');
    // массив фильмов после поиска → изменяем при каждом поиске
    const [searchMovies, setSearchMovies] = React.useState(JSON.parse(localStorage.getItem('searchMovies')) || []);
    // стейт состояния страницы: пустая или нет? 
    const [blankPage, setBlankPage] = React.useState(false); // НАСТРОИТЬ!!!!! 
    // стейт сообщения на странице с фильмами: сообщения об ошибках/не найденных фильмах/просьба о поиске...
    const [messageText, setMessageText] = React.useState('Запустите поиск интересующих Вас фильмов');
    // количество карточек по умолчанию → передадим в стейт ↓ ↓ ↓
    const defaultRenderedCard = {
        desktop: 12,
        tablet: 8,
        mobile: 5,
    };
    // стейт отображаемых карточек с фильмами  
    const [renderedCard, setRenderedCard] = React.useState(() => {
        const savedRenderedCard = localStorage.getItem('savedLineCard');
        return savedRenderedCard ? JSON.parse(savedRenderedCard) : defaultRenderedCard;
    });
    // стейт активности кнопки ЕЩЕ 
    const [activeButtonElse, setActiveButtonElse] = React.useState(true);

    //const forCheckbox = localStorage.getItem('checkedShort') === 'on' ? 'on' : 'off';
    // стейт чекбокса - изначально неактивен
    const [isChecked, setIsChecked] = React.useState(localStorage.getItem('checkedShort') === 'on' ? 'on' : 'off');
    // идет загрузка → отображаем преоладер
    const [isLoading, setIsLoading] = React.useState(true);

    // ЭФФЕКТЫ 
    React.useEffect(() => {
        if (localStorage.getItem('allMovies') && localStorage.getItem('searchMovies')) {
            // console.log('---- КОД ЗДЕСЬ ----')
            handleSearch(query)// обрабатываем сабмит
            //localStorage.setItem('savedLineCard', JSON.stringify(renderedCard));
            //setRenderedCard(renderedCard);// сколько штук? ↑
            //compareLengthArr();//следим за длиной массива
        }
    }, [allMovies]);

    React.useEffect(() => {
        if (isLocalStorageMovies === null) {
            setBlankPage(true)
            setMessageText('Запустите поиск интересующих Вас фильмов');
        } else {
            console.log("ПОКАЖЕМ ФИЛЬМЫ")
            handleDisplayContent(searchMovies);
            if (query) {// есть строка поиска
                console.log(query)
                filteredMovies(query, isLocalStorageMovies, isChecked); // фильтруем
                setRenderedCard(renderedCard);
            }
        }
        //debugger
        
    }, [query, allMovies]);

    // мониторим экран → отображаем кнопку
    /*     React.useEffect(() => {
            console.log(!isLocalStorageMovies===null)
            if (localStorage.getItem('allMovies') && localStorage.getItem('query')) {
                compareLengthArr();//следим за длиной массива
            }
        }, [window, activeButtonElse, renderedCard]); */

        React.useEffect(() => {
            compareLengthArr();// проверим, весь ли массив → да → убираем ЕЩЕ
        }, [renderedCard, searchMovies])

    // отобразим сообщение, если фильмы не найдены
    function handleDisplayContent(arr) {
        if (arr.length === 0) {
            setBlankPage(true);
            setMessageText('Фильмы по запросу не найдены');
        } else {
            setBlankPage(false);// страница не пустая
            console.log("ФИЛЬМЫ НАЙДЕНЫ")
        };
    };

    // запрос поиска → обновляем
    function updateQuery(newQuery) {
        setQuery(newQuery);// стейт запроса → новая строка
        localStorage.setItem("query", newQuery);// сохраним в ЛС запрос 
        localStorage.setItem('checkedShort', setIsChecked);// состояние чекбокса
        setRenderedCard(defaultRenderedCard);// выдаем изначальное число карточек
        //compareLengthArr();
    };

    // отрисовываем нужное число карточек
    function handleClickElse() {
        setRenderedCard((prevState) => ({
            ...prevState, // копирование предыдущего состояния
            desktop: prevState.desktop + 3,
            tablet: prevState.tablet + 2,
            mobile: prevState.mobile + 2,
        }));
        compareLengthArr();
    };

    //const filtered = [];//отфильтрованные фильмы по запросу

    React.useEffect(() => {
        //console.log(allMovies)
        if (query && !allMovies.length === 0 ) {
            console.log("ФИЛЬТРУЕМ ФИЛЬМЫ???   ", allMovies.length)
            // фильтруем массив: строка запроса/ все фильмы/ чекбокс
            filteredMovies(query, isLocalStorageMovies, isChecked);
        }
        //handleSearch(query)// обработка заплоса ?????

    }, [query, isChecked, allMovies])//по стейту поскового запроса, чекбоксу, всех фильмов

    const handleSearch = async (query) => {
        //console.log(cards)
        let searchMovies = allMovies;
        if (allMovies.length === 0) {
            searchMovies = await getMovies();
            setAllMovies(searchMovies);
            //console.log(allMovies);
            // const newArr = transformArrMovies(searchMovies);// преобразовали фильмы +
            // console.log(newArr);// преобразованный массив +
            // pushLocalStorage(newArr);
            // console.warn(allArrMovies);
        };
        console.log("ФИЛЬТРУЕМ ФИЛЬМЫ")
        console.log(isLocalStorageMovies)
        // фильтруем фильмы из ЛС
        filteredMovies(query, isLocalStorageMovies, isChecked);

        //console.log("---- ЧТО НАФИЛЬТРОВАЛИ? ----")
        //console.log(filtered); // преобразованный массив +
        // setSearchMovies(filtered);
        // localStorage.setItem("searchMovies", JSON.stringify(filtered));

        //compareLengthArr();// проверим, весь ли массив → да → убираем ЕЩЕ
    }


    /* const handleSearch = async (query) => {
        let searchMovies = cards;

        const processMovies = new Promise(async (resolve, reject) => {
            if (cards.length === 0) {
                try {
                    searchMovies = await getMovies();
                    const newArr = transformArrMovies(searchMovies); // преобразовали фильмы
                    pushLocalStorage(newArr);
                    resolve();   // разрешим по завершении
                } catch (error) {
                    reject(`Ошибка: ${error}`); // выведем ошибку
                }
            } else {
                resolve();   // разрешим, если массив есть
            }
        });
        processMovies.then(() => {
            // фильтруем после ↑ ↑ ↑
            filteredMovies(query, allArrMovies);
        }).catch((error) => {
            console.log(error); // ошибка?? 
        });
    } */



    // трансформируем массив с апи в нужный формат
    /*     function transformArrMovies(arr) {
            return arr.map((movie) => {
                const { country, director, duration, year, description, trailerLink, nameRU, nameEN } = movie;
                return {
                    country,
                    director,
                    duration,
                    year,
                    description,
                    image: `${BASE_MOVIES_URL}${movie.image.url}`,
                    trailerLink,
                    thumbnail: `${BASE_MOVIES_URL}${movie.image.formats.thumbnail.url}`,
                    id: movie.id,
                    nameRU,
                    nameEN,
                };
            });
        }; */

    // сохраняем фильмы с апи в ЛС
    /*     function pushLocalStorage(arr) {
            localStorage.setItem("allMovies", JSON.stringify(arr));
        } */

    // отфильтруем фильмы из базы по запросу в форме
    function filteredMovies(req, movies, checkbox) {
        //console.log(req)
        // console.log(movies)
        if (movies === null) {
            console.log("НЕТ МАССИВА")
        } else {
            //console.log("ЧЕКБОКС --------", checkbox === "on")
            if (checkbox === "on") {
                const shorts = movies.filter((item) => item.duration < 40);
                    console.log("shorts ------", shorts)
                const filtered = shorts.filter(item => {
                    let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
                    console.log("НАФИЛЬТРОВАЛИ -------", result)
                    return result;
                });
                console.log("КОРОТКОМЕТРАЖКИ ------- ", filtered);
                setSearchMovies(filtered);
                localStorage.setItem("searchMovies", JSON.stringify(filtered));

            } else {
                const filtered = movies.filter(item => {
                    let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
                    return result;
                });
                console.log(filtered);
                setSearchMovies(filtered);
                localStorage.setItem("searchMovies", JSON.stringify(filtered));
            }

        }


        /* console.log(filtered);
        setSearchMovies(filtered); */

        // запишем с тейт 

        /*  for (let i = 0; i < movies.length; i++) {
             const item = movies[i];
             // поиск в названии RU и EN без учета регистра
             let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
             if (result) {
                 filtered.push(item);
             }
         }; */
    };


    // обработчик чекбокса 
    function handleChecked(e) {
        //console.log("чекнули?", isChecked==="off")
        if (isChecked==="off") {
            setIsChecked('on')// включили 
            console.log("ON")
            localStorage.setItem("checkedShort", 'on');// сохраним в ЛС чек on +

        } else {
            setIsChecked('off')// выключили 
            console.log("OFF")
            localStorage.setItem("checkedShort", 'off');// сохраним в ЛС чек off +
        }
    }
    // стейт массива короткометражек 
    //const [isShortMovies, setIsShortMovies] = React.useState(localStorage.getItem("isShortMovies"))

    // отобразим/ скроем кнопку ЕЩЕ
    function compareLengthArr() {
        //const arr = JSON.parse(localStorage.getItem("searchMovies"));
        const arr = searchMovies;
        //console.log(arr.length);
        //console.log(renderedCard.desktop);
        //if (arr.length === 0) {
        if (arr === null || undefined) {
            return
        } else {
            if (window >= 1225 && arr.length <= renderedCard.desktop) {
                console.log("выбрали массив на desktop");
                // console.log(arr.length);
                // console.log(renderedCard.desktop);
                setActiveButtonElse(false);
            } else if (window >= 713 && arr.length <= renderedCard.tablet) {
                console.log("выбрали массив на tablet");
                // console.log(arr.length);
                // console.log(renderedCard.tablet);
                setActiveButtonElse(false);
            } else if (window <= 712 && arr.length <= renderedCard.mobile) {
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
            cards={searchMovies}
            renderedCard={renderedCard}
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