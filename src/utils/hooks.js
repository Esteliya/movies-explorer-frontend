// Обработчкики типичных событий для станиц с фильмами


function filteredMovies(req, movies, checkbox) {
    if (movies === null || movies === undefined) {
        console.log("МЫ ТУТ?????")
        return
    }
    if (checkbox === "on") {
        console.log("ON -----")
        const shorts = movies.filter((item) => item.duration < 40);
        const filtered = shorts.filter(item => {
            let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
            return result;
        });
        console.log("НАФИЛЬТРОВАЛИ ------", filtered)
        return filtered;
    } else {
        console.log("OFF -----")
        const filtered = movies.filter(item => {
            let result = item.nameRU.toLowerCase().includes(req.toLowerCase()) || item.nameEN.toLowerCase().includes(req.toLowerCase());
            return result;
        });
        console.log("НАФИЛЬТРОВАЛИ ------", filtered)
        return filtered;
    }
    
}



export {
    filteredMovies,
};