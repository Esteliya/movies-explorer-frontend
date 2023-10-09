import React from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';

function MovieCard(props) {
    const { cardTitle, cardTime, movie, onClickCardButton, window, isLike } = props;
    const mobile = window <= 712;
    const [showDeleteButton, setShowDeleteButton] = React.useState(false);
    const location = useLocation();//проверим, на каком роуте выдаем карточки
    // все фильмы 
    const savedMovies = location.pathname === '/saved-movies';
    // сохраненные фильмы
    const movies = location.pathname === '/movies';
    // лайк ? активная кнопка : неактивная  
    const classLikeButton = isLike ? "movie-card__button movie-card__button_like-active hover-effect" : "movie-card__button movie-card__button_like hover-effect";

    React.useEffect(() => {
        //console.log(window, mobile)
        if (mobile) {
            setShowDeleteButton(true);
        } else {
            setShowDeleteButton(false);
        };

    }, [window]);

    function handleMouseEnter() {
        setShowDeleteButton(true);
    };

    function handleMouseLeave() {
        setShowDeleteButton(false);
    };

    // высчитываем часы и минуты - вынести???
    const hoursMins = (num) => {
        let hours = Math.floor(num / 60);
        let mins = num % 60;
        if (mins < 10) {
            mins = "0" + mins;
        }
        return `${hours}ч ${mins}м`;
    };

    return (
        <div className='movie-card'>
            <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <div className='movie-card__preview'
                    style={{ backgroundImage: `url(${movie.image})` }}></div>
            </a>
            <div className='movie-card__info'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>

                <div className='movie-card__data'>
                    <h2 className='movie-card__title'>{cardTitle}.</h2>
                    <p className='movie-card__time'>{hoursMins(cardTime)}</p>
                </div>
                {savedMovies &&
                    showDeleteButton &&
                    <button className='movie-card__button movie-card__button_delete hover-effect'
                        type="button"
                        onClick={() => { onClickCardButton(movie) }} />}

                {movies &&
                    <button className={classLikeButton}
                        type="button"
                        onClick={() => { onClickCardButton(movie) }} />}
            </div>
        </div>

    )
};

export default MovieCard;