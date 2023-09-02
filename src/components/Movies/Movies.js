import './Movies.css'

import SearchForm from './SearchForm/SearchForm';// поиск
import MoviesCardList from './MoviesCardList/MoviesCardList';// фильмы

function Movies(props) {
    const { children, cards } = props;

    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList cards={cards}/>
            {children}
        </section>
    )
}
export default Movies;