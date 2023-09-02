import './SavedMovies.css'

import Movies from "../Movies/Movies"

import cards from "../../utils/saveCards";


function SavedMovies() {
    return (
        <Movies cards={cards} />
    )
}
export default SavedMovies;