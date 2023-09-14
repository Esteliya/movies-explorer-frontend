import './App.css';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // импортируем Routes
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

// тестовый компонент для api запросов


function App() {
  const navigate = useNavigate();
  //контекст текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  // const location = useLocation();//будем следить за роутами
  //контекст логина
  // const [loggedIn, setLoggedIn] = React.useState(false);
  //попап бургер-меню
  const [isBurgerMenuPopup, setIsBurgerMenuPopup] = React.useState(false);

  // контролируем размер экрана - меняем данные на страницах согласно размера 
  const [withWindow, setwithWindow] = React.useState(window.innerWidth);

// стейт массива карточек стороннего апи
const [dataMovies, setDataMovies] = React.useState([]);

  React.useEffect(() => {
    getMovies();
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
  function register() {
    navigate('/signin', {
      replace: true
    })
  }

  function getLogin() {
    // залогинились
    navigate('/movies', {
      replace: true
    })
    setCurrentUser({ loggedIn: "true" });
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
  //запрашиваем данные карточек с сервера 
  function getMovies() {
    //console.log('запросили данные карточек');
    apiWithMovies.getMovieInfo()
      .then((moviesData) => {
        console.log('запросили данные карточек');
        //setCards(cardsData);//выводим на страницу карточки
        console.log(moviesData);
        setDataMovies(moviesData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleSearchClick () {
    // getMovies()
    console.log("клик поиска фильмов");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path='/testpage' element={<TestPage />} />
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
              <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} mobile={withWindow}/>
              <MoviesBase mobile={withWindow} cards={dataMovies} onClick={handleSearchClick}/>
              <Footer />
            </>} />
          <Route path="/saved-movies" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} mobile={withWindow}/>
              <MoviesSaved />
              <Footer />
            </>} />

          <Route path="/signup" element={<Register onClick={register} />} />
          <Route path="/signin" element={<Login onClick={getLogin} />} />
          <Route path="/profile" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} mobile={withWindow}/>
              <Profile onClickExit={getExit} />
            </>} />

          <Route path='*' element={<NotFound />} replace />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
