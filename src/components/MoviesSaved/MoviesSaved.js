import React from 'react';
import './MoviesSaved.css'

import Movies from "../Movies/Movies"

// import cards from "../../utils/saveCards";

// СДЕЛАТЬ!! 


function MoviesSaved(props) {
    const {mobile, cards, blankPage, messageText, handleDataForm, getMovies} = props;

    // запрашиваем фильмы
React.useEffect(() => {
    getMovies()
}, []); 

    
    function handleClickStart() {
        console.log("Ищем фильмы в базе");
    }
    return (
        <Movies cards={cards} mobile={mobile} onClickForm={handleClickStart} blankPage={blankPage} messageText={messageText} handleDataForm={handleDataForm} />
    )
}
export default MoviesSaved;