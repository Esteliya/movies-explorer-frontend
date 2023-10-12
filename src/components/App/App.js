import './App.css';
import React from 'react';
// импортируем Routes
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
// обработчики 
import { transformArrMovies } from "../../utils/handlers"
// константы (текст)
import { REG_SUCCESFUL, UPPDATA_SUCCESFUL, NOT_VALID } from "../../utils/constants";
// API
import { apiWithMovies } from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/Auth';
// контекст
import CurrentUserContext from "../../context/CurrentUserContext";
// защита 
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


// РОУТЫ
// о проекте
import Main from '../Main/Main';
// страница с фильмами из api
import MoviesBase from '../MoviesBase/MoviesBase';
// сохраненные фильмы
import MoviesSaved from '../MoviesSaved/MoviesSaved';
// страница регистрации
import Register from '../Register/Register';
// страница авторизации
import Login from '../Login/Login';
// страница редактирования профиля
import Profile from '../Profile/Profile';
// страницы не существует
import NotFound from '../NotFound/NotFound';

// ОБЩИЕ КОМПОНЕНТЫ
// меню
import Header from '../Header/Header';
// подвал
import Footer from '../Footer/Footer';
// попап меню (бургер-меню)
import PopupMenu from "../PopupMenu/PopupMenu";
// информационный попап
import InfoTooltip from "../InfoTooltip/InfoTooltip";
// прелоадер - загрузка 
import Preloader from "../Preloader/Preloader";

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
    setIsLoaging(true);
    const { name, email, password } = data;
    auth.register(name, email, password)
      .then((data) => {
        setShowInfoToolTip(true);
        setResult(true);
        setTextInfoTooltip(REG_SUCCESFUL);
        // перебрасываем пользователя на авторизацию
        navigate('/signin', {
          replace: true
        });
      })
      .catch((err) => {
        if (err.message === "Validation failed") {
          setShowInfoToolTip(true);
          setResult(false);
          setTextInfoTooltip(NOT_VALID);// текст
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
    setIsLoaging(true);
    // debugger
    const { email, password } = data;
    auth.authorize(email, password)
      .then((dataUser) => {
        setLoggedIn(true);
        setCurrentUser(dataUser);
        getSavedMovies();
        navigate('/movies', {
          replace: true
        });
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

  //проверяем наличие токена 
  function tockenCheck() {
    setIsLoaging(true);
    auth.checkToken()
      .then((dataUser) => {
        setCurrentUser(dataUser);
        setLoggedIn(true);
        getSavedMovies();// запросим актуальный массив фильмов
        const path = location.pathname;
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
    setIsLoaging(true);
    // debugger
    mainApi.patchUserInfo(data)
      .then((data) => {
        setShowInfoToolTip(true);
        setResult(true);
        setTextInfoTooltip(UPPDATA_SUCCESFUL);// текст
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
    setIsLoaging(true);
    // debugger
    auth.logout()
      .then(() => {
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
    setIsLoaging(true);
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

  // запрос сохраненных фильмов
  function getSavedMovies() {
    setIsLoaging(true);
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
    /* .finally(() => {
      setIsLoaging(false);
    }); */
  };

  // сохранение фильма 
  function saveMovies(card) {
    // setIsLoaging(true);
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
    /* .finally(() => {
      setIsLoaging(false);
    }); */
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
            <Header
              openButton={handleOpenMenu}
              onClickAccount={handleClickAccount}
              window={withWindow}
              loggedIn={loggedIn} />
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

              <Route path="/signup" element={
                !loggedIn ?
                  <Register handleDataForm={handleRegister} /> :
                  <Navigate to='/movies' />} />
              <Route path="/signin" element={
                !loggedIn ?
                  <Login handleDataForm={hendleLogin} /> :
                  <Navigate to='/movies' />} />

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
