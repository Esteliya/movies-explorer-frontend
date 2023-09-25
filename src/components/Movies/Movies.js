import React from 'react';
import './Movies.css'

import SearchForm from './SearchForm/SearchForm';// поиск
import MoviesCardList from './MoviesCardList/MoviesCardList';// фильмы
import Message from './Message/Message';
// import Preloader from '../Preloader/Preloader'

function Movies(props) {
    // * / пустая страница? / сообщение/ карточки / формат экрана/ обработчик кнопки карточки
    const { children, blankPage, messageText, cards, mobile, onClickCardButton,
        // от формы поиска: запрос поиска/ строка поиска/ поиск по запросу
        setQuery, query, handleSearch } = props;
    // const messageText = 'Запустите поиск интересующих Вас фильмов';



    return (
        <main className='movies'>
            <SearchForm setQuery={setQuery} query={query} handleSearch={handleSearch} />
            {blankPage ?
                <Message text={messageText} /> :
                <MoviesCardList cards={cards} mobile={mobile} onClickCardButton={onClickCardButton} />}
            {children}
        </main>
    )
}
export default Movies;