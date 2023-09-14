import './Movies.css'

import SearchForm from './SearchForm/SearchForm';// поиск
import MoviesCardList from './MoviesCardList/MoviesCardList';// фильмы
// import Preloader from '../Preloader/Preloader'

function Movies(props) {
    const { children, cards, mobile, onClick } = props;

    return (
        <main className='movies'>
            <SearchForm onClick={onClick}/>
            <MoviesCardList cards={cards} mobile={mobile} />
            {children}
        </main>
    )
}
export default Movies;