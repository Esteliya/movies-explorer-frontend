import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import { BASE_MOVIES_URL, MOVIES_URL } from '../../../utils/config'; // ловим путь к превью

import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList(props) {
    const { cards, mobile, onClickCardButton } = props;

    const location = useLocation();//проверим, на каком роуте выдаем карточки
    // все фильмы 
    const movies = location.pathname === '/saved-movies'
    // сохраненные фильмы
    const savedMovies = location.pathname === '/movies'

    // debugger;
    
    // проверяем размер экрана и отображаем необходимое количество карточек
    const arrCard = mobile <= 1224 ? (mobile <= 712 ? cards.slice(0, 5) : cards.slice(0, 8)) : cards.slice(0, 12);

    return (
        <section className='movies-card-list'>
            {
               arrCard.map((card) => {
                    return (
                        <MovieCard
                            key={card.id || card._id}
                            cardImg={card.image.url}
                            cardTitle={card.nameRU}
                            cardTime={card.duration}
                            onClickCardButton={onClickCardButton}
                            movie={card}
                        />
                    )
                })
            }
        </section>

    )
}
export default MoviesCardList;
