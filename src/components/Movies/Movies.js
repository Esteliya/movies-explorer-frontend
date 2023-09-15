import './Movies.css'

import SearchForm from './SearchForm/SearchForm';// поиск
import MoviesCardList from './MoviesCardList/MoviesCardList';// фильмы
import Message from './Message/Message';
// import Preloader from '../Preloader/Preloader'

function Movies(props) {
    const { children, cards, mobile, onClick, blankPage, messageText } = props;

    // const messageText = 'Запустите поиск интересующих Вас фильмов';

    return (
        <main className='movies'>
            <SearchForm onClick={onClick} />
            {!blankPage ?
                <Message text={messageText} /> :
                <MoviesCardList cards={cards} mobile={mobile} />}
            {children}
        </main>
    )
}
export default Movies;