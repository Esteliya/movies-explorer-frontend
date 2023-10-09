import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './MovieCard.css'

function MovieCard(props) {
    const { cardTitle, cardTime, movie, savedAllMovies, onClickCardButton, window, isLike } = props;

    const mobile = window <= 712;// ???????

    const [showDeleteButton, setShowDeleteButton] = React.useState(false);

    
    const location = useLocation();//проверим, на каком роуте выдаем карточки
    // все фильмы 
    const savedMovies = location.pathname === '/saved-movies';
    // сохраненные фильмы
    const movies = location.pathname === '/movies';

    // стейт кнопки лайка: сохранен фильмы / нет
    // const [isLike, setIsLike] = React.useState(false)


/*     React.useEffect (() => {
        movies && handleLikeCard();
    },[savedAllMovies, isLike]) */

    function handleLikeCard() {
        /* console.log("отрисованный фильм ------- ", movie)
        console.log('массив сохраненных фильмов ------', savedAllMovies)
        if (savedAllMovies.length > 0) {
            console.log("ОК. Проверим совпадения")
            savedAllMovies.forEach((item) => {
                if (item.movieId === movie.id) {
                    console.log(`Сохраненный фильм ${item.movieId} совпадает с фильмом в выдаче ${movie.id}`);
                    setIsLike(true)
                } else {
                    console.log(`Нет совпадений`);
                    setIsLike(false)
                }
            });
        } */
        /* arrSavedMovies.forEach((item) => {
            if (item.movieId === movie.id) {
                console.log(`Movie ID ${item.movieId} matches Card ID ${movie.id}`);
            } else {
                console.log(`Movie ID ${item.movieId} does not match Card ID ${movie.id}`);
                return movie
            }
        }); */
    }




    React.useEffect(() => {
        //console.log(window, mobile)
        if (mobile) {
            setShowDeleteButton(true);
        } else {
            setShowDeleteButton(false);
        }

    }, [window])

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

    // лайк ? активная кнопка : неактивная  
    const classLikeButton = isLike ? "movie-card__button movie-card__button_like-active hover-effect" : "movie-card__button movie-card__button_like hover-effect"
    // const classDeleteButton = 'movie-card__button movie-card__button_delete hover-effect'

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