import './MovieCard.css'

function MovieCard(props) {
    const { cardImg, cardTitle, cardTime } = props;

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
        <div className='movie-card__preview' style={{ backgroundImage: `url(${cardImg})` }}></div>
        <div className='movie-card__info'>
            <div className='movie-card__data'>
                <p className='movie-card__title'>{cardTitle}.</p>
                <p className='movie-card__time'>{hoursMins(cardTime)}</p>
            </div>
            <button className='movie-card__like'></button>
        </div>


    </div>

)
}
export default MovieCard;