import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './MovieCard.css'
import { BASE_MOVIES_URL } from '../../../utils/config'; // ловим путь к превью

function MovieCard(props) {
    const { cardImg, cardTitle, cardTime } = props;

    const [showDeleteButton, setShowDeleteButton] = React.useState(false);

    const location = useLocation();//проверим, на каком роуте выдаем карточки

    function handleMouseEnter() {
        setShowDeleteButton(true);
    }

    function handleMouseLeave() {
        setShowDeleteButton(false);
    }

    // высчитываем часы и минуты
    const hoursMins = (num) => {
        let hours = Math.floor(num / 60);
        let mins = num % 60;
        if (mins < 10) {
            mins = "0" + mins;
        }
        return `${hours}ч ${mins}м`;
    }

    return (
        <div className='movie-card'>
            <div className='movie-card__preview' style={{ backgroundImage: `url(${BASE_MOVIES_URL}${cardImg})` }}></div>
            <div className='movie-card__info' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className='movie-card__data'>
                    <h2 className='movie-card__title'>{cardTitle}.</h2>
                    <p className='movie-card__time'>{hoursMins(cardTime)}</p>
                </div>
                {location.pathname === '/saved-movies' && showDeleteButton && <button className='movie-card__button movie-card__button_delete hover-effect' type="button" />}
                {location.pathname === '/movies' && <button className='movie-card__button movie-card__button_like hover-effect' type="button" />}
            </div>
        </div>

    )
}
export default MovieCard;