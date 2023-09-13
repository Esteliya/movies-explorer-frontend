import './Movies.css'

import SearchForm from './SearchForm/SearchForm';// поиск
import MoviesCardList from './MoviesCardList/MoviesCardList';// фильмы
// import Preloader from '../Preloader/Preloader'

function Movies(props) {
    const { children, cards, mobile } = props;

    return (
        <main className='movies'>
            <SearchForm />
            <MoviesCardList cards={cards} mobile={mobile} />
            {children}
        </main>
    )
}
export default Movies;