import './MoviesSaved.css'

import Movies from "../Movies/Movies"

import cards from "../../utils/saveCards";


function MoviesSaved() {
    return (
        <Movies cards={cards} />
    )
}
export default MoviesSaved;