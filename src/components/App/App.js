import './App.css';
import React from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'; // импортируем Routes
// РОУТЫ
import Main from '../Main/Main';// о проекте
// import Movies from '../Movies/Movies';// шаблонная страница для фильмов
import MoviesBase from '../MoviesBase/MoviesBase'// страница с фильмами из api
import MoviesSaved from '../MoviesSaved/MoviesSaved';// сохраненные фильмы
// контекст
import CurrentUserContext from "../../context/CurrentUserContext";

// создать базовый для всех компонент ↓ ↓ ↓
// import Auth from '../Auth/Auth';// базовый компонент для следующих 2 ↓ ↓ ↓
import Register from '../Register/Register';// страница регистрации
import Login from '../Login/Login';// страница авторизации

import Profile from '../Profile/Profile';// страница редактирования профиля
// общие для всех компоненты
import Header from '../Header/Header';// меню
import Footer from '../Footer/Footer';// подвал

import NotFound from '../NotFound/NotFound';// страницы не существует

import PopupMenu from "../PopupMenu/PopupMenu";
import TestPage from '../TestPage/TestPage';// ВРЕМЕННАЯ! УБРАТЬ! 

// API
import { apiWithMovies } from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
//import auth from '../../utils/MainApi';
import * as auth from '../../utils/Auth';
import { BASE_MOVIES_URL } from '../../utils/config'// путь к картинкам фильмов


function App() {
  const navigate = useNavigate();
  //контекст текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  const location = useLocation();//будем следить за роутами
  //контекст логина
  const [loggedIn, setLoggedIn] = React.useState(false);
  //попап бургер-меню
  const [isBurgerMenuPopup, setIsBurgerMenuPopup] = React.useState(false);
  // контролируем размер экрана - меняем данные на страницах согласно размера 
  const [withWindow, setwithWindow] = React.useState(window.innerWidth);
  // МАССИВЫ ФИЛЬМОВ
  // стейт массива карточек стороннего апи 
  const [dataMovies, setDataMovies] = React.useState([]);
  // стейт найденных фильмов в общей базе
  const [dataSavedMovies, setDataSavedMovies] = React.useState([]);
    // стейт массива избранных фильмов
  const [dataSearchMovies, setDataSearchMovies] = React.useState([]);
  // страница с фильмими пустая ? (выдаем сообщения) ↓ ↓ ↓
  const [blankPage, setBlankPage] = React.useState(true);
  // стейт сообщения на странице с фильмами: сообщения об ошибках/не найденных фильмах/просьба о поиске...
  const [messageText, setMessageText] = React.useState('');

  React.useEffect(() => {
    tockenCheck();
    getMovies();
    getSavedMovies();
    getDataLocalStorage("Movies", setDataMovies);
    setMessageText('Запустите поиск интересующих Вас фильмов');
    const handleResize = () => {
      setwithWindow(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // АУТЕНТИФИКАЦИЯ 
  // регистрируемся
  function handleRegister(data) {
    const { name, email, password } = data;
    auth.register(name, email, password)
      .then((data) => {
        console.log(data)
        alert('Регистрация прошла успешно')//работает 
        // перебрасываем пользователя на авторизацию
        navigate('/signin', {
          replace: true
        })
      })
      .catch((err) => {
        //console.log('ОШИБКА РЕГИСТРАЦИИ')
        console.error(`Ошибка: ${err}`);
      })
  }
  // авторизируемся
  function hendleLogin(data) {
    const { email, password } = data;
    auth.authorize(email, password)
      .then((dataUser) => {
        console.log("авторизировались");
        setLoggedIn(true);
        setCurrentUser(dataUser)
        getMovies();
        navigate('/movies', {
          replace: true
        });
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);

      });
  }

  //проверяем наличие токена в localStorage
  function tockenCheck() {
    auth.checkToken()
      .then((dataUser) => {
        console.log('сравнили токен - есть');
        setLoggedIn(true)
        setCurrentUser(dataUser)
        // запросим данные пользователя
        //запросим фильмы с сервера
        //console.log(location);
        const path = location.pathname;
        //console.log(path);
        switch (path) {//навигируем авторизацию и регистрацию на фильмы, если пользователь туда заходит напрямую
          case "/signin":
            navigate('/movies');
            break;
          case "/signup":
            navigate('/movies');
            break;
          default:
        }
      })
      .catch((err) => {
        cleanLocalSsorage()
        console.error(`Ошибка: ${err}`);
      });
  }

  // обновляем данные пользователя
  function handleUpdataUser(data) {
    //mainApi.patchUserInfo 
    console.log(data)
    // const { name, email } = data;
    debugger
    mainApi.patchUserInfo(data)
      .then((data) => {
        console.log("запрос patch успешен?")
        console.log(data)// +
        alert('Изменение данных прошло успешно')//работает СДЕЛАТЬ ПОПАП
        setCurrentUser(data)// ????? как-то обновить 
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  }


  // удаляем токен
  function handleExitProfile() {
    // debugger
    console.log("выходим из акка?")
    auth.logout()
      .then(() => {
        console.log("разлогинились")
        cleanLocalSsorage()
        // разлогинились - переход на страницу авторизации
        navigate('/', {
          replace: true
        })
        // setCurrentUser({ loggedIn: "false" });
        setLoggedIn(false);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }
  // очищаем локальное хранилище
  function cleanLocalSsorage() {
    localStorage.removeItem("Movies");
    localStorage.removeItem("SearchMovies");
  }

  // БУРГЕР-МЕНЮ
  // открываем попап меню
  function handleOpenMenu() {
    setIsBurgerMenuPopup(true)
  }
  // закрываем попап 
  function closePopup() {
    setIsBurgerMenuPopup(false)
  }

  // РОУТИНГ
  // пререход на страницу данных пользователя
  function handleClickAccount() {
    navigate('/profile', {
      replace: true
    })
    setIsBurgerMenuPopup(false);// закрываем меню
  }

  // переход на страницу с фильмами
  function handleClickMovies() {
    navigate('/movies', {
      replace: true
    })
    setIsBurgerMenuPopup(false);// закрываем меню
  }
  // переход на страницу с сохраненными фильмами
  function handleClickSavedMovies() {
    navigate('/saved-movies', {
      replace: true
    })
    setIsBurgerMenuPopup(false);// закрываем меню
  }
  // переход на главную страницу
  function handleClickHome() {
    navigate('/', {
      replace: true
    })
    setIsBurgerMenuPopup(false);// закрываем меню
  }

  //КАРТОЧКИ ФИЛЬМОВ
  //запрашиваем все фильмы с сервера и записываем в локальное хранилище
  function getMovies() {
    //console.log('запросили данные карточек');
    apiWithMovies.getMovieInfo()
      .then((moviesData) => {
        // console.log(moviesData);
        setDataMovies(moviesData);// меняем получение стейта на локалсторидж
        // Преобразование массива объектов в JSON
        const jsonData = JSON.stringify(moviesData);
        // Сохранение данных в локальном хранилище
        localStorage.setItem("Movies", jsonData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  // получаем данные из локалсторидж ОБЩАЯ 
  function getDataLocalStorage(name, set) {
    // console.log("работает")
    // Получаем фильмы из локального хранилища
    const savedMovies = localStorage.getItem(name);
    // Переводим JSON-строки обратно в массив объектов
    const parsedData = JSON.parse(savedMovies);
    // console.log(parsedData)// нужный массив! 
    set(parsedData); // записали в стей массив - разбираем в MoviesList

    // разбираем массив
    /*     for (var i = 0; i < parsedData.length; i++) {
          console.log(parsedData[i]); // + нужное
        } */
  }

  // избранные фильмы пользователя
  // запрашиваем и записываем в localStorage
  function getSavedMovies() {
    mainApi.getArrMovies()
    .then((movies) => {
      console.log(movies)
        // console.log(moviesData);
        setDataSavedMovies(movies);// меняем получение стейта на локалсторидж
        // Преобразование массива объектов в JSON
        const jsonData = JSON.stringify(movies);
        // Сохранение данных в локальном хранилище
        localStorage.setItem("SavedMovies", jsonData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function getSavedDataLocalStorage() {
    getDataLocalStorage("SavedMovies", setDataSavedMovies)
  }

  // ПОИСК ФИЛЬМОВ
  // поиск по общей базе 
  function handleSearchInAllMovies(string) {
    handleSearch(string, "Movies")
  }

  // поиск по базе избранных

  // общий поиск фильмов 
  function handleSearch(string, base) {
    console.log("ищем фильмы")
    const arrMovies = localStorage.getItem(base)
    const movies = JSON.parse(arrMovies); // преобразуем строку в массив
    console.log(movies)// массив!
    /*  if (Array.isArray(movies)) {
       console.log('Это массив!');// точно массив
     } else {
       console.log('Это не массив!');
     } */

    let newArr = []// соберем новый массив
    // let string = "ло";
    for (let i = 0; i < movies.length; i++) {
      const item = movies[i]
      // поиск в названии RU и EN без учета регистра
      let result = item.nameRU.toLowerCase().includes(string.toLowerCase()) || item.nameEN.toLowerCase().includes(string.toLowerCase());
      // console.log(result)// правда/ложь
      if (result) {// если правда 
        // console.log(item)// нужнный объект
        setBlankPage(false)
        newArr.push(item);
      }
    }
    // console.log(newArr) // нужный массив 
    // console.log(newArr.length)// длина массива
    if (newArr.length === 0) {// длина массива 0?
      setBlankPage(true)
      setMessageText("Фильмы по запросу не найдены")
    } else {
      // запишем в локальное хранилище 
      // Преобразование массива объектов в JSON
      const jsonData = JSON.stringify(newArr);
      // Сохранение данных в локальном хранилище
      localStorage.setItem("SearchMovies", jsonData);
      console.log("получим найденныей фильмы из LS")
      const searchMovies = localStorage.getItem("SearchMovies")
      const arrSearchMovies = JSON.parse(searchMovies); // преобразуем строку в массив
      console.log(arrSearchMovies)// ++ нужный массив
      setDataSearchMovies(arrSearchMovies)
    }
  }

  // Обработчики кнопок
  // сохраняем фильм
  function handleSaveMovie(movie) {
    debugger
    console.log("здесь тоже работает")// +
    console.log(movie)
    const { country, director, duration, year, description, trailerLink, owner, nameRU, nameEN } = movie
    mainApi.postUserMovies({
      country,
      director,
      duration,
      year,
      description,
      image: `${BASE_MOVIES_URL}${movie.image.url}`,
      trailerLink,
      thumbnail: `${BASE_MOVIES_URL}${movie.image.formats.thumbnail.url}`,
      owner,
      movieId: movie.id,
      nameRU,
      nameEN,
    })
      .then((movie) => {
        alert("фильм сохранен")

      })

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} mobile={withWindow} loggedIn={loggedIn} />
        <Routes>
          <Route path='/testpage' element={<TestPage onClick={handleSearch} />} />
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<MoviesBase mobile={withWindow} cards={dataSearchMovies} blankPage={blankPage} messageText={messageText} handleDataForm={handleSearchInAllMovies} onClickCardButton={handleSaveMovie} />} />
          <Route path="/saved-movies" element={<MoviesSaved cards={dataSavedMovies} blankPage={false} messageText={messageText} handleDataForm={handleSearchInAllMovies} getMovies={getSavedDataLocalStorage}/>} />
          <Route path="/signup" element={<Register handleDataForm={handleRegister} />} />
          <Route path="/signin" element={<Login handleDataForm={hendleLogin} />} />
          <Route path="/profile" element={<Profile onClickExit={handleExitProfile} handleDataForm={handleUpdataUser} />} />
          <Route path='*' element={<NotFound />} replace />
        </Routes>
        <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
