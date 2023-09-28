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
        setQuery, query, handleSearch, beChecked, onClickFilter  } = props;

    return (
        <main className='movies'>
            <SearchForm
                setQuery={setQuery}
                query={query}
                handleSearch={handleSearch}
                beChecked={beChecked} 
                onClickFilter={onClickFilter}/>
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