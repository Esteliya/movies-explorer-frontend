import './MoviesCardList.css';

import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList(props) {
    const { cards } = props;

    return (
        <section className='movies-card-list'>
            {
                cards.slice(0, 12).map((card) => {
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
