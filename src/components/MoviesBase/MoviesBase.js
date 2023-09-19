import './MoviesBase.css'

import Movies from "../Movies/Movies"
import ButtonElse from "./ButtonElse/ButtonElse"

// import cards from "../../utils/cards";


function MoviesBase(props) {

    const {mobile, cards, blankPage, messageText, handleDataForm} = props;

    
    function handleClickStart() {
        console.log("Ищем фильмы в общей базе");
    }
    
    return (
        <Movies cards={cards} mobile={mobile} onClick={handleClickStart} blankPage={blankPage} messageText={messageText} handleDataForm={handleDataForm} >
            {!blankPage && <ButtonElse />}
        </Movies>
    )
}
export default MoviesBase;