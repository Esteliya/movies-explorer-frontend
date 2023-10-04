import React from 'react';
import './Movies.css'

import SearchForm from './SearchForm/SearchForm';// поиск
import MoviesCardList from './MoviesCardList/MoviesCardList';// фильмы
import Message from './Message/Message';
// import Preloader from '../Preloader/Preloader'

function Movies(props) {
    // * / пустая страница? / сообщение/ карточки / формат экрана/ обработчик кнопки карточки
    const { children, blankPage, messageText, cards, renderedCard, window, onClickCardButton,
        // от формы поиска: запрос поиска/ строка поиска/ поиск по запросу/ чекбокс/ обработчик чекбокса 
        submitQuery, onSubmitQuery, handleSearch, isChecked, onClickFilter } = props;
        //.log(`MOVIES.JS >>>>blankPage = ${blankPage}`);
        
/*     let cardsList;
    if ( (! cards || cards.length < 1 ) &&  JSON.parse(localStorage.getItem("searchMovies")).length ){
        console.log('2342')
        cardsList = JSON.parse(localStorage.getItem("searchMovies"));
        return  cardsList;
    } */


    return (
        <main className='movies'>
            <SearchForm
                submitQuery={submitQuery}
                onSubmitQuery={onSubmitQuery}
                handleSearch={handleSearch}
                isChecked={isChecked}
                onClickFilter={onClickFilter} />
            {blankPage ?
                <Message text={messageText} /> :
                <MoviesCardList
                    cards={cards}
                    window={window}
                    onClickCardButton={onClickCardButton}
                    renderedCard={renderedCard} />}
            {children}
        </main>
    )
}
export default Movies;