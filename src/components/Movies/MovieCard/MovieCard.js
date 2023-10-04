import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './MovieCard.css'

function MovieCard(props) {
    const { cardTitle, cardTime, movie, onClickCardButton, window } = props;

    const mobile = window <= 712;// ???????

    const [showDeleteButton, setShowDeleteButton] = React.useState(mobile ? true : false);
    

    const location = useLocation();//проверим, на каком роуте выдаем карточки
    // все фильмы 
    const savedMovies = location.pathname === '/saved-movies';
    // сохраненные фильмы
    const movies = location.pathname === '/movies';


    React.useEffect(() => {
        console.log(window, mobile)
        setShowDeleteButton(showDeleteButton)

    }, [window])

    function handleMouseEnter() {
        setShowDeleteButton(true);
    };

    function handleMouseLeave() {
        setShowDeleteButton(false);
    };

    // высчитываем часы и минуты
    const hoursMins = (num) => {
        let hours = Math.floor(num / 60);
        let mins = num % 60;
        if (mins < 10) {
            mins = "0" + mins;
        }
        return `${hours}ч ${mins}м`;
    };

    //const isWindow = window <= 712;
    console.log("размер экрана мобильный???----- ", window)

   
    const classDeleteButton = 'movie-card__button movie-card__button_delete hover-effect'

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
                    <button className='movie-card__button movie-card__button_like hover-effect'
                        type="button"
                        onClick={() => { onClickCardButton(movie) }} />}
            </div>
        </div>

    )
};

export default MovieCard;