import './MoviesBase.css'

import Movies from "../Movies/Movies"
import ButtonElse from "./ButtonElse/ButtonElse"

// import cards from "../../utils/cards";


function MoviesBase(props) {

    const {mobile, cards, onClick, blankPage, messageText} = props;
    
    return (
        <Movies cards={cards} mobile={mobile} onClick={onClick} blankPage={blankPage} messageText={messageText}>
            {!blankPage && <ButtonElse />}
        </Movies>
    )
}
export default MoviesBase;