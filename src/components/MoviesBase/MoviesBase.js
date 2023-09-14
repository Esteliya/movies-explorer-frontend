import './MoviesBase.css'

import Movies from "../Movies/Movies"
import ButtonElse from "./ButtonElse/ButtonElse"

// import cards from "../../utils/cards";


function MoviesBase(props) {

    const {mobile, cards, onClick} = props;
    
    return (
        <Movies cards={cards} mobile={mobile} onClick={onClick}>
            <ButtonElse />
        </Movies>
    )
}
export default MoviesBase;