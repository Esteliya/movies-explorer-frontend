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


function App() {
  const navigate = useNavigate();
  //контекст текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  // const location = useLocation();//будем следить за роутами
  //контекст логина
  // const [loggedIn, setLoggedIn] = React.useState(false);
  //попап бургер-меню
  const [isBurgerMenuPopup, setIsBurgerMenuPopup] = React.useState(false);

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
    // разлогинились* - переход на страницу авторизации
    navigate('/', {
      replace: true
    })
    setCurrentUser({ loggedIn: "false" });
    // setLoggedIn(false);
  }
  // открываем попап меню
  function handleOpenMenu() {
    setIsBurgerMenuPopup(true)
  }
  // закрываем попап 
  function closePopup() {
    setIsBurgerMenuPopup(false)
  }
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header homepage='true' openButton={handleOpenMenu} onClickAccount={handleClickAccount} />
              <Main />
              <Footer />
            </>
          } />
          <Route path="/movies" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} />
              <MoviesBase />
              <Footer />
            </>} />
          <Route path="/saved-movies" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} />
              <MoviesSaved />
              <Footer />
            </>} />

          <Route path="/signup" element={<Register onClick={register} />} />
          <Route path="/signin" element={<Login onClick={getLogin}
          />} />
          <Route path="/profile" element={
            <>
              <PopupMenu isOpen={isBurgerMenuPopup} onClose={closePopup} onClickAccount={handleClickAccount} onClickHome={handleClickHome} onClickMovies={handleClickMovies} onClickSavedMovies={handleClickSavedMovies} />
              <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} />
              <Profile onClickExit={getExit} />
            </>} />

          <Route path='*' element={<NotFound />} replace />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
