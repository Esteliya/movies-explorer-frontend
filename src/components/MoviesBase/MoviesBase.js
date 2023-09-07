import './MoviesBase.css'

import Movies from "../Movies/Movies"
import ButtonElse from "./ButtonElse/ButtonElse"

import cards from "../../utils/cards";


function MoviesBase(props) {

    const {mobile} = props;
    
    return (
        <Movies cards={cards} mobile={mobile} >
            <ButtonElse />
        </Movies>
    )
}
export default MoviesBase;