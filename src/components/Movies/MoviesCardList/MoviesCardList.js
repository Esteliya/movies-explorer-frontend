import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import { getSavedMovie } from "../../../utils/handlers";

function MoviesCardList(props) {
    const { cards, visibleCard, window, savedAllMovies, onClickCardButton, deleteMovie, saveMovie } = props;

    const location = useLocation();//проверим, на каком роуте выдаем карточки
    // все фильмы 
    const savedMovies = location.pathname === '/saved-movies';
    // сохраненные фильмы
    const movies = location.pathname === '/movies';

    //debugger
    // количество карточек на разных экранах → тольно на странице /movies 
    let arrCard = []
    if (movies) {
        // console.log(window);
        arrCard = window <= 1224 ?
            (window <= 712 ? cards.slice(0, visibleCard.mobile) :
                cards.slice(0, visibleCard.tablet)) :
            cards.slice(0, visibleCard.desktop);
    };

    return (
        <section className='movies-card-list'>
            {
                movies && arrCard.map((card) => {
                    const likedMovie = getSavedMovie(savedAllMovies, card.id);
                    const likedMovieId = likedMovie ? likedMovie._id : "";
                    const onClickCardButton = () => {
                        if(likedMovie) {
                            console.log(likedMovie._id)
                            deleteMovie(likedMovie._id);
                        } else {
                            saveMovie({ ...card, _id: likedMovieId });
                        }
                    };
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
