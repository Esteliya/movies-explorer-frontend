import './MoviesBase.css'

import Movies from "../Movies/Movies"
import ButtonElse from "./ButtonElse/ButtonElse"
import { BASE_MOVIES_URL, MOVIES_URL } from '../../utils/config'; // ловим путь к превью

// import cards from "../../utils/cards";


function MoviesBase(props) {

    const { mobile, cards, blankPage, messageText, handleDataForm, onClickCardButton } = props;


    function handleClickStart() {
        console.log("Ищем фильмы в общей базе");
    }
/* 
    function handlelickCardButton() {
        // console.log("клик по кнопке лайка")// +
        handleClickLike();
    } */

    function handleClickElse() {
        console.log("клик по кнопке Еще")// +
    }

    return (
        <Movies cards={cards} mobile={mobile} onClickForm={handleClickStart} blankPage={blankPage} messageText={messageText} handleDataForm={handleDataForm} onClickCardButton={onClickCardButton} >
            {!blankPage && <ButtonElse onClickElse={handleClickElse}/>}
        </Movies>
    )
}
export default MoviesBase;