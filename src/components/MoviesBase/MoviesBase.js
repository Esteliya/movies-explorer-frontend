import './MoviesBase.css'

import Movies from "../Movies/Movies"
import ButtonElse from "./ButtonElse/ButtonElse"

import cards from "../../utils/cards";


function MoviesBase() {
    return (
        <Movies cards={cards} >
            <ButtonElse />
        </Movies>
    )
}
export default MoviesBase;