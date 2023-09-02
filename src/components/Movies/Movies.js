import './Movies.css'

import SearchForm from './SearchForm/SearchForm';// поиск
import MoviesCardList from './MoviesCardList/MoviesCardList';// фильмы
import ButtomElse from './ButtomElse/ButtomElse'

function Movies() {
    return (
        <section className='movies'>
        <SearchForm />
        <MoviesCardList />      
        <ButtomElse /> 
        </section>
    )
}
export default Movies;