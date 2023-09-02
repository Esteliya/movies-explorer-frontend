import './MoviesBase.css'

import Movies from "../Movies/Movies"
import ButtomElse from "./ButtomElse/ButtomElse"

import cards from "../../utils/cards";


function MoviesBase() {
    return (
        <Movies cards={cards}>
            <ButtomElse />
        </Movies>
    )
}
export default MoviesBase;