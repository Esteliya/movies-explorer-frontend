import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import { BASE_MOVIES_URL, MOVIES_URL } from '../../../utils/config'; // ловим путь к превью

import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList(props) {
    const { cards, visibleCard, window, onClickCardButton, savedAllMovies } = props;

    const location = useLocation();//проверим, на каком роуте выдаем карточки
    // все фильмы 
    const savedMovies = location.pathname === '/saved-movies'
    // сохраненные фильмы
    const movies = location.pathname === '/movies'

    // стейт кнопки лайка: сохранен фильмы / нет
    //const [isLike, setIsLike] = React.useState(false)

    //debugger
    // количество карточек на разных экранах → тольно на странице /movies 
    let arrCard = []
    if (movies) {
        console.log(window)
        arrCard = window <= 1224 ?
            (window <= 712 ? cards.slice(0, visibleCard.mobile) :
                cards.slice(0, visibleCard.tablet)) :
            cards.slice(0, visibleCard.desktop);
    }

    // получим сохраненный фильм - вынести??? 
    function getSavedMovie(arr, id) {
        return arr.find((movie) => {
            return movie.movieId === id;
        });
    };



    return (
        <section className='movies-card-list'>
            {
                movies && arrCard.map((card) => {
                    const likedMovie = getSavedMovie(savedAllMovies, card.id);
                    const likedMovieId = likedMovie ? likedMovie._id : "";
                    return (
                        <MovieCard
                            key={card.id || card._id}
                            cardTitle={card.nameRU}
                            cardTime={card.duration}
                            onClickCardButton={onClickCardButton}
                            movie={{ ...card, _id: likedMovieId }}
                            isLike={likedMovie ? true : false}
                            savedAllMovies={savedAllMovies}
                            window={window}
                        />
                    )
                })
            }
            {savedMovies && cards.map((card) => {
                return (
                    <MovieCard
                        key={card.id || card._id}
                        cardTitle={card.nameRU}
                        cardTime={card.duration}
                        onClickCardButton={onClickCardButton}
                        movie={card}
                        window={window}
                    />
                )
            })
            }
        </section>

    )
}
export default MoviesCardList;
