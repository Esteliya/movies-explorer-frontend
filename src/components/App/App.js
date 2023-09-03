import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'; // импортируем Routes
// РОУТЫ
import Main from '../Main/Main';// о проекте
// import Movies from '../Movies/Movies';// шаблонная страница для фильмов
import MoviesBase from '../MoviesBase/MoviesBase'// страница с фильмами из api
import MoviesSaved from '../MoviesSaved/MoviesSaved';// сохраненные фильмы

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
  //контекст логина
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [displayHeader, setdisplayHeader] = React.useState(false);

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
    setLoggedIn(true);
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Header homepage='true' loggedIn={loggedIn}/>
            <Main />
            <Footer />
          </>
        } />
        <Route path="/movies" element={
          <>
            <Header loggedIn={loggedIn}/>
            <MoviesBase />
            <Footer />
          </>} />
        <Route path="/saved-movies" element={
          <>
            <Header loggedIn={loggedIn}/>
            <MoviesSaved />
            <Footer />
          </>} />

        <Route path="/signup" element={<Register onClick={register}/>} />
        <Route path="/signin" element={<Login onClick={getLogin}
        />} />
        <Route path="/profile" element={
          <>
            <Header loggedIn={loggedIn}/>
            <Profile />
          </>} />

        <Route path='*' element={<NotFound />} replace />
      </Routes>
    </div>
  );
}

export default App;
