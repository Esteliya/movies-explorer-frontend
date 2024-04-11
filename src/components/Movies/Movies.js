import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';// поиск
import MoviesCardList from './MoviesCardList/MoviesCardList';// фильмы
import Message from './Message/Message';

function Movies(props) {
    // * / пустая страница? / сообщение/ карточки / формат экрана/ обработчик кнопки карточки
    const { children, blankPage, messageText, cards, visibleCard, window, onClickCardButton, savedAllMovies,
        // от формы поиска: запрос поиска/ строка поиска/ поиск по запросу/ чекбокс/ обработчик чекбокса / валиность запроса
        submitQuery, onSubmitQuery, handleSearch, isChecked, onClickFilter, onChangeFilter, isValid, showError, isTextError, setCurrentQuery, deleteMovie, saveMovie } = props;

    return (
        <main className='movies'>
            <SearchForm
                submitQuery={submitQuery}
                onSubmitQuery={onSubmitQuery}
                handleSearch={handleSearch}
                isChecked={isChecked}
                onClickFilter={onClickFilter} 
                onChangeFilter={onChangeFilter}
                isValid={isValid}
                showError={showError}
                isTextError={isTextError}
                setCurrentQuery={setCurrentQuery}/>
            {blankPage ?
                <Message text={messageText} /> :
                <MoviesCardList
                    cards={cards}
                    savedAllMovies={savedAllMovies}
                    window={window}
                    onClickCardButton={onClickCardButton}
                    visibleCard={visibleCard}
                    deleteMovie={deleteMovie}
                    saveMovie={saveMovie}/>}
            {children}
        </main>
    )
};

export default Movies;