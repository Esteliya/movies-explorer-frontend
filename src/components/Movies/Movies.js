import './Movies.css'

import SearchForm from './SearchForm/SearchForm';// поиск
import MoviesCardList from './MoviesCardList/MoviesCardList';// фильмы
import Message from './Message/Message';
// import Preloader from '../Preloader/Preloader'

function Movies(props) {
    const { children, cards, image, mobile, onClickForm, blankPage, messageText, handleDataForm, onClick, onClickCardButton } = props;

    // const messageText = 'Запустите поиск интересующих Вас фильмов';

    
    return (
        <main className='movies'>
            <SearchForm onClickForm={onClickForm} handleDataForm={handleDataForm}/>
            {blankPage ?
                <Message text={messageText} /> :
                <MoviesCardList cards={cards} mobile={mobile} onClick={onClick} onClickCardButton={onClickCardButton} image={image}/>}
            {children}
        </main>
    )
}
export default Movies;