import './App.css';
import { Routes, Route } from 'react-router-dom'; // импортируем Routes
// РОУТЫ
import Main from '../Main/Main';// о проекте
import Movies from '../Movies/Movies';// страница поиска фильмов
import SavedMovies from '../SavedMovies/SavedMovies';// сохраненные фильмы

// создать базовый для всех компонент ↓ ↓ ↓
import Register from '../Register/Register';// страница регистрации
import Login from '../Login/Login';// страница авторизации

import Profile from '../Profile/Profile';// страница редактирования профиля
// общие для всех компоненты
import Header from '../Header/Header';// шапка
import Navigation from '../Navigation/Navigation';// навигация
import Footer from '../Footer/Footer';// подвал

import NotFound from '../NotFound/NotFound';// страницы не существует


function App() {
  return (
    <div className="App">
      <p>ТЕКСТ ТЕКСТ ТЕКСТ ЕЩЕ ТЕКСТ</p>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />

        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path='*' element={<NotFound />} replace />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
