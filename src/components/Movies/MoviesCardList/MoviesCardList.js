import './MoviesCardList.css';
// тестовый массив фильмов. Потом меняем на api
import cards from "../../../utils/cards";

import MovieCard from './MovieCard/MovieCard';

function MoviesCardList() {
    return (
        <section className='movies-card-list'>
            {
                cards.map((card) => {
                    return (
                        <MovieCard
                            key={card.id}
                            cardImg={card.url}
                            cardTitle={card.nameRU}
                            cardTime={card.duration}
                        />
                    )
                })
            }
        </section>

    )
}
export default MoviesCardList;
