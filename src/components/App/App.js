import './App.css';
import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'; // импортируем Routes
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
// import Navigation from '../Navigation/Navigation';// навигация ????? 
import Footer from '../Footer/Footer';// подвал

import NotFound from '../NotFound/NotFound';// страницы не существует

import PopupMenu from "../PopupMenu/PopupMenu";
import TestPage from '../TestPage/TestPage';

// API
import { apiWithMovies } from '../../utils/MoviesApi';
//import auth from '../../utils/MainApi';
import * as auth from '../../utils/Auth';


// тестовый компонент для api запросов


function App() {
  const navigate = useNavigate();
  //контекст текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  // const location = useLocation();//будем следить за роутами
  //контекст логина
  const [loggedIn, setLoggedIn] = React.useState(false);
  //попап бургер-меню
  const [isBurgerMenuPopup, setIsBurgerMenuPopup] = React.useState(false);
  // контролируем размер экрана - меняем данные на страницах согласно размера 
  const [withWindow, setwithWindow] = React.useState(window.innerWidth);
  // стейт массива карточек стороннего апи
  const [dataMovies, setDataMovies] = React.useState([]);
  // стпаница с фильмими пустая? 
  const [blankPage, setBlankPage] = React.useState(true);
  // стейт сообщения на странице с фильмами: сообщения об ошибках/не найденных фильмах/просьба о поиске...
  const [messageText, setMessageText] = React.useState('');

  React.useEffect(() => {
    getMovies();
    getDataLocalStorage();
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
      })
      .catch((err) => {
        //console.log('ОШИБКА РЕГИСТРАЦИИ')
        console.error(`Ошибка: ${err}`);
      })
    /* navigate('/signin', {
      replace: true
    }) */
  }

  function hendleLogin(data) {
    const { email, password } = data;
    auth.authorize(email, password)
      .then(() => {
        console.log("авторизировались")
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);

      });

    // залогинились
    /*     navigate('/movies', {
          replace: true
        })
        setCurrentUser({ loggedIn: "true" }); */
    // setLoggedIn(true);
  }

  function getExit() {
    // разлогинились - переход на страницу авторизации
    navigate('/', {
      replace: true
    })
    setCurrentUser({ loggedIn: "false" });
    // setLoggedIn(false);
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
  //запрашиваем данные фильмов с сервера 
  function getMovies() {
    //console.log('запросили данные карточек');
    apiWithMovies.getMovieInfo()
      .then((moviesData) => {
        // console.log('запросили данные карточек');
        //setCards(cardsData);//выводим на страницу карточки
        // console.log(moviesData);
        // setDataMovies(moviesData);// меняем получение стейта на локалсторидж

        // Преобразование массива объектов в JSON
        const jsonData = JSON.stringify(moviesData);
        // Сохранение данных в локальном хранилище
        localStorage.setItem("Movies", jsonData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  // клик по кнопке поиска фильмов
  function handleSearchClick() {
    console.log("клик поиска фильмов");
    // getMovies();
  }


  // получаем данные из локалсторидж
  function getDataLocalStorage() {
    // console.log("работает")
    // Получаем фильмы из локального хранилища
    const savedMovies = localStorage.getItem("Movies");
    // Переводим JSON-строки обратно в массив объектов
    const parsedData = JSON.parse(savedMovies);
    // console.log(parsedData)// нужный массив! 
    setDataMovies(parsedData); // записали в стей массив - разбираем в MoviesList

    // разбираем массив
    /*     for (var i = 0; i < parsedData.length; i++) {
          console.log(parsedData[i]); // + нужное
        } */
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path='/testpage' element={<TestPage onClick={getDataLocalStorage} />} />
          <Route path="/" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header homepage='true' openButton={handleOpenMenu} onClickAccount={handleClickAccount} mobile={withWindow} />
              <Main />
              <Footer />
            </>
          } />
          <Route path="/movies" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} mobile={withWindow} />
              <MoviesBase mobile={withWindow} cards={dataMovies} onClick={handleSearchClick} blankPage={blankPage} messageText={messageText} />
              <Footer />
            </>} />
          <Route path="/saved-movies" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} mobile={withWindow} />
              <MoviesSaved />
              <Footer />
            </>} />

          <Route path="/signup" element={<Register handleDataForm={handleRegister} />} />
          <Route path="/signin" element={<Login handleDataForm={hendleLogin} />} />
          <Route path="/profile" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} mobile={withWindow} />
              <Profile onClickExit={getExit} />
            </>} />

          <Route path='*' element={<NotFound />} replace />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
