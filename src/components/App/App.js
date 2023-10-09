import './App.css';
import React from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'; // импортируем Routes
// РОУТЫ
import Main from '../Main/Main';// о проекте
// import Movies from '../Movies/Movies';// шаблонная страница для фильмов
import MoviesBase from '../MoviesBase/MoviesBase';// страница с фильмами из api
import MoviesSaved from '../MoviesSaved/MoviesSaved';// сохраненные фильмы
// контекст
import CurrentUserContext from "../../context/CurrentUserContext";
// защита 
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import Preloader from "../Preloader/Preloader";

// API
import { apiWithMovies } from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/Auth';
import { BASE_MOVIES_URL } from '../../utils/config'// путь к картинкам фильмов


function App() {
  const navigate = useNavigate();
  //контекст текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  // будем следить за роутами
  const location = useLocation();
  //контекст логина
  const [loggedIn, setLoggedIn] = React.useState(false);
  // стейт прелоадера - загрузки. Изначально true 
  const [isLoaging, setIsLoaging] = React.useState(true);
  // контекст роутов сайта 
  const [currentRoute, setCurrentRoute] = React.useState('');
  // попап бургер-меню
  const [isBurgerMenuPopup, setIsBurgerMenuPopup] = React.useState(false);
  // контролируем размер экрана - меняем данные на страницах согласно размера 
  const [withWindow, setwithWindow] = React.useState(window.innerWidth);

  // МАССИВЫ ФИЛЬМОВ
  // сохраненные фильмы польоватея с бэка
  const [savedAllMovies, setSavedAllMovies] = React.useState([]);

  // ИНФОРМАЦИОННЫЙ ПОПАП
  // стейт попапа оповещения 
  const [showInfoToolTip, setShowInfoToolTip] = React.useState(false);
  // текст попапа  оповещения 
  const [textInfoTooltip, setTextInfoTooltip] = React.useState('');
  // стейт результата отправки запроса к api (для попапа InfoTooltip)
  const [result, setResult] = React.useState(false);

  // СТИЛЬ CSS
  // стиль страницы в зависимости от состояния загрузки
  const appClasse = isLoaging ? "app app_loaging" : "app";

  // ЭФФЕКТЫ
  React.useEffect(() => {
    tockenCheck();
    // следим за шириной экрана 
    const handleResize = () => {
      setwithWindow(window.innerWidth);
    };
    let resizeTimeout;
    // но не сразу → задержим на ?? ms
    const delayedHandleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    window.addEventListener('resize', delayedHandleResize);
    return () => {
      window.removeEventListener('resize', delayedHandleResize);
    };
  }, []);


  // АУТЕНТИФИКАЦИЯ 
  // регистрируемся
  function handleRegister(data) {
    setLoggedIn(true);
    const { name, email, password } = data;
    auth.register(name, email, password)
      .then((data) => {
        setShowInfoToolTip(true);
        setResult(true);
        setTextInfoTooltip("Регистрация прошла успешно");
        // перебрасываем пользователя на авторизацию
        navigate('/signin', {
          replace: true
        });
      })
      .catch((err) => {
        if (err.message === "Validation failed") {
          setShowInfoToolTip(true);
          setResult(false);
          setTextInfoTooltip("Данные формы невалидны. Проверьте корректность заполнения полей.");// текст
        } else {
          setShowInfoToolTip(true);
          setResult(false);
          setTextInfoTooltip(err.message);// текст ошибки
        };
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  };

  // авторизируемся
  function hendleLogin(data) {
    setLoggedIn(true);
    // debugger
    const { email, password } = data;
    auth.authorize(email, password)
      .then((dataUser) => {
        setLoggedIn(true);
        setCurrentUser(dataUser);
        navigate('/movies', {
          replace: true
        });
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        // console.log(err.message);
        setTextInfoTooltip(err.message);// текст ошибки
        setShowInfoToolTip(true);
        setResult(false);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  };

  //проверяем наличие токена 
  function tockenCheck() {
    setIsLoaging(true);
    auth.checkToken()
      .then((dataUser) => {
        setLoggedIn(true);
        setCurrentUser(dataUser);
        getSavedMovies();// запросим актуальный массив фильмов
        const path = location.pathname;
        // console.log(path);
        switch (path) {//навигируем авторизацию и регистрацию на фильмы, если пользователь туда заходит напрямую
          case "/signin":
            navigate('/movies');
            break;
          case "/signup":
            navigate('/movies');
            break;
          default:
        };
      })
      .catch((err) => {
        cleanLocalStorage()
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  };

  // обновляем данные пользователя
  function handleUpdataUser(data) {
    setLoggedIn(true);
    // console.log(data);
    // debugger
    mainApi.patchUserInfo(data)
      .then((data) => {
        setShowInfoToolTip(true);
        setResult(true);
        setTextInfoTooltip("Данные пользователя обновлены");// текст
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        setTextInfoTooltip(err.message);// текст ошибки
        setShowInfoToolTip(true);
        setResult(false);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  };

  // удаляем токен
  function handleExitProfile() {
    setLoggedIn(true);
    // debugger
    // console.log("выходим из акка?");
    auth.logout()
      .then(() => {
        // console.log("разлогинились");
        cleanLocalStorage();
        // разлогинились - переход на страницу авторизации
        navigate('/', {
          replace: true
        });
        setLoggedIn(false);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        setTextInfoTooltip(err.message);// текст ошибки
        setShowInfoToolTip(true);
        setResult(false);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  };

  // ФИЛЬМЫ
  // запросим все фильмы - передадим на страницу
  function getMovies() {
    setLoggedIn(true);
    return apiWithMovies.getMovieInfo()
      .then((arrMovies) => {
        const newAllMovies = transformArrMovies(arrMovies);
        return newAllMovies;
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        setTextInfoTooltip(err.message);// текст ошибки
        setShowInfoToolTip(true);
        setResult(false);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  };

  // трансформируем массив с апи в нужный формат
  function transformArrMovies(arr) {
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
  };

  // запрос сохраненных фильмов
  function getSavedMovies() {
    setLoggedIn(true);
    // debugger
    return mainApi.getArrMovies()
      .then((arrMovies) => {
        setSavedAllMovies(arrMovies);
        // return arrMovies;// вернем массив карточек
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        setTextInfoTooltip(err.message);// текст ошибки
        setShowInfoToolTip(true);
        setResult(false);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  };

  // удаление фильма 
  function deleteMovies(card) {
    setLoggedIn(true);
    // console.log(card);
    // поймаем id сохраненного на нашем api фильма
    const saveMovie = savedAllMovies.find((item) => item.movieId === card.id);
    return mainApi.deleteCard(card._id || saveMovie._id)
      .then(() => {
        const updateArr = savedAllMovies.filter((item) => item._id === card._id ? false : true);
        setSavedAllMovies(updateArr);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        // покажем попап
        setShowInfoToolTip(true);
        setResult(false);
        setTextInfoTooltip(err.message);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  };

  // сохранение фильма 
  function saveMovies(card) {
    setLoggedIn(true);
    const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, id } = card;
    mainApi.postUserMovies({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId: id })
      .then(likeCard => {
        setSavedAllMovies([likeCard, ...savedAllMovies]);// + новый фильм
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        // покажем попап
        setShowInfoToolTip(true);
        setResult(false);
        setTextInfoTooltip(err.message);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  };

  // очищаем локальное хранилище
  function cleanLocalStorage() {
    localStorage.clear();
    /* localStorage.removeItem("allMovies");
    localStorage.removeItem("searchMovies");
    localStorage.removeItem("queryMovies");
    localStorage.removeItem("savedLineCard"); */
  };

  // БУРГЕР-МЕНЮ
  // открываем попап меню
  function handleOpenMenu() {
    setIsBurgerMenuPopup(true);
  };

  // закрываем попап 
  function closeAllPopups() {
    setIsBurgerMenuPopup(false);
    setShowInfoToolTip(false);
  };

  // РОУТИНГ
  // пререход на страницу данных пользователя
  function handleClickAccount() {
    navigate('/profile', {
      replace: true
    });
    setIsBurgerMenuPopup(false);// закрываем меню
  };

  // переход на страницу с фильмами
  function handleClickMovies() {
    navigate('/movies', {
      replace: true
    });
    setIsBurgerMenuPopup(false);// закрываем меню
  };

  // переход на страницу с сохраненными фильмами
  function handleClickSavedMovies() {
    navigate('/saved-movies', {
      replace: true
    });
    setIsBurgerMenuPopup(false);// закрываем меню
  };

  // переход на главную страницу
  function handleClickHome() {
    navigate('/', {
      replace: true
    });
    setIsBurgerMenuPopup(false);// закрываем меню
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={appClasse}>
        {isLoaging ?
          <Preloader /> :
          <>
            <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} window={withWindow} loggedIn={loggedIn} />
            <Routes>
              <Route path="/movies" element={!loggedIn ? <Navigate to='/signin' /> :
                <ProtectedRoute
                  element={MoviesBase}
                  loggedIn={loggedIn}
                  setCurrentRoute={setCurrentRoute}
                  getMovies={getMovies}
                  savedAllMovies={savedAllMovies}
                  window={withWindow}
                  onSave={saveMovies}
                  onDelete={deleteMovies} />} replace />

              <Route path="/saved-movies" element={!loggedIn ? <Navigate to='/signin' /> :
                <ProtectedRoute
                  element={MoviesSaved}
                  loggedIn={loggedIn}
                  setCurrentRoute={setCurrentRoute}
                  arrMovies={savedAllMovies}
                  deleteMovies={deleteMovies}
                  window={withWindow}
                />} />
              <Route path="/profile" element={!loggedIn ? <Navigate to='/signin' /> :
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  setCurrentRoute={setCurrentRoute}
                  onClickExit={handleExitProfile}
                  handleDataForm={handleUpdataUser} />} />

              <Route path="/" element={<Main />} />

              <Route path="/signup" element={!loggedIn ? <Register handleDataForm={handleRegister} /> : <Navigate to='/movies' />} />
              <Route path="/signin" element={!loggedIn ? <Login handleDataForm={hendleLogin} /> : <Navigate to='/movies' />} />

              <Route path='*' element={<NotFound />} replace />
            </Routes>
            <Footer />
          </>
        }
        <PopupMenu
          isOpen={isBurgerMenuPopup}
          onClose={closeAllPopups}
          onClickAccount={handleClickAccount}
          onClickHome={handleClickHome}
          onClickMovies={handleClickMovies}
          onClickSavedMovies={handleClickSavedMovies} />

        <InfoTooltip
          isOpen={showInfoToolTip}
          onClose={closeAllPopups}
          res={result}
          text={textInfoTooltip} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
