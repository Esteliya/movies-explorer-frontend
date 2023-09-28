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
  // база всех фильмов 
  const [allMovies, setAllMovies] = React.useState([]);

  // сохраненные фильмы польоватея с бэка
  const [savedAllMovies, setSavedAllMovies] = React.useState([]);

  // страница с фильмими пустая ? (выдаем сообщения) ↓ ↓ ↓
  //const [blankPage, setBlankPage] = React.useState(true);
  // стейт сообщения на странице с фильмами: сообщения об ошибках/не найденных фильмах/просьба о поиске...
  //const [messageText, setMessageText] = React.useState('');


  React.useEffect(() => {
    tockenCheck();
    // setMessageText('Запустите поиск интересующих Вас фильмов');
// следим за шириной экрана 
    const handleResize = () => {
      setwithWindow(window.innerWidth);
    };
    
    let resizeTimeout;
    // но не сразу → задержим на ?? ms
    const delayedHandleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100); // задержка в ?? ms
    };
    
    window.addEventListener('resize', delayedHandleResize);
    
    return () => {
      window.removeEventListener('resize', delayedHandleResize);
    };

    /* const handleResize = () => {
      setwithWindow(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }; */
  }, []);








  // АУТЕНТИФИКАЦИЯ +++
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
    //debugger
    const { email, password } = data;
    auth.authorize(email, password)
      .then((dataUser) => {
        console.log("авторизировались");
        setLoggedIn(true);
        setCurrentUser(dataUser)
        // getMovies();
        navigate('/movies', {
          replace: true
        });
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);

      });
  }

  //проверяем наличие токена 
  function tockenCheck() {
    auth.checkToken()
      .then((dataUser) => {
        //console.log('сравнили токен - есть');
        setLoggedIn(true)
        setCurrentUser(dataUser)
        // запросим данные пользователя
        //запросим фильмы с сервера
        //console.log(location);
        //getMovies();// запрашиваем все фильмы
        //getSavedMovies();// запрашиваем сохраненные фильмы пользователя 
        //getDataLocalStorage("Movies", setDataMovies);
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
        cleanLocalStorage()
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
        cleanLocalStorage()
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
  // ФИЛЬМЫ
  // запросим фильмы - передадим на страницу
  function getMovies() {
    return apiWithMovies.getMovieInfo()
      .then((arrMovies) => {
        setAllMovies(arrMovies);
        return arrMovies;// вернем массив карточек
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  // запрос сохраненных фильмов
  function getSavedMovies() {
    return mainApi.getArrMovies()
      .then((arrMovies) => {
        setSavedAllMovies(arrMovies);
        return arrMovies;// вернем массив карточек
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  // очищаем локальное хранилище
  function cleanLocalStorage() {
    localStorage.clear();
    /* localStorage.removeItem("allMovies");
    localStorage.removeItem("searchMovies");
    localStorage.removeItem("queryMovies");
    localStorage.removeItem("savedLineCard"); */
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

  function test() {
    console.log("тестируем")
  }

  // отображения лайка
  // сравнима массивы > выведем лайки

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header openButton={handleOpenMenu} onClickAccount={handleClickAccount} window={withWindow} loggedIn={loggedIn} />
        <Routes>
          <Route path='/testpage' element={<TestPage onClick={test} />} />

          <Route path="/" element={<Main />} />

          <Route path="/movies" element={<MoviesBase
            cards={allMovies}
            getMovies={getMovies}
            window={withWindow}
          />} />

          <Route path="/saved-movies" element={<MoviesSaved
          cards={savedAllMovies}
          getMovies={getSavedMovies}
          window={withWindow}
          />} />

          <Route path="/signup" element={<Register handleDataForm={handleRegister} />} />
          <Route path="/signin" element={<Login handleDataForm={hendleLogin} />} />
          <Route path="/profile" element={<Profile onClickExit={handleExitProfile} handleDataForm={handleUpdataUser} />} />
          <Route path='*' element={<NotFound />} replace />
        </Routes>

        <PopupMenu
          isOpen={isBurgerMenuPopup}
          onClose={closePopup}
          onClickAccount={handleClickAccount}
          onClickHome={handleClickHome}
          onClickMovies={handleClickMovies}
          onClickSavedMovies={handleClickSavedMovies} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
