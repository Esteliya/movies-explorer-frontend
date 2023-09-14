import './MoviesCardList.css';

import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList(props) {
    const { cards, mobile } = props;

    // debugger;
    
    // проверяем размер экрана и отображаем необходимое количество карточек
    const arrCard = mobile <= 1224 ? (mobile <= 712 ? cards.slice(0, 5) : cards.slice(0, 8)) : cards.slice(0, 12);

    return (
        <section className='movies-card-list'>
            {
               arrCard.map((card) => {
                    return (
                        <MovieCard
                            key={card.id}
                            cardImg={card.image.url}
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
