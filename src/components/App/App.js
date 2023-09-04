import './App.css';
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

import React from 'react';

import Profile from '../Profile/Profile';// страница редактирования профиля
// общие для всех компоненты
import Header from '../Header/Header';// меню
// import Navigation from '../Navigation/Navigation';// навигация ????? 
import Footer from '../Footer/Footer';// подвал

import NotFound from '../NotFound/NotFound';// страницы не существует


function App() {
  const navigate = useNavigate();
  //контекст текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  //контекст логина
  const [loggedIn, setLoggedIn] = React.useState(false);

  // const [displayHeader, setdisplayHeader] = React.useState(false);

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
    setCurrentUser({loggedIn:"true"});
    setLoggedIn(true);
  }

  function getExit() {
    // разлогинились* - переход на страницу авторизации
    navigate('/signin', {
      replace: true
    })
    setCurrentUser({loggedIn:"false"});
    setLoggedIn(false);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <Routes>
      <Route path="/" element={
          <>
            <Header homepage='true'/>
            <Main />
            <Footer />
          </>
        } />
        <Route path="/movies" element={
          <>
            <Header />
            <MoviesBase />
            <Footer />
          </>} />
        <Route path="/saved-movies" element={
          <>
            <Header />
            <MoviesSaved />
            <Footer />
          </>} />

        <Route path="/signup" element={<Register onClick={register}/>} />
        <Route path="/signin" element={<Login onClick={getLogin}
        />} />
        <Route path="/profile" element={
          <>
            <Header />
            <Profile onClickExit={getExit}/>
          </>} />

        <Route path='*' element={<NotFound />} replace />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
