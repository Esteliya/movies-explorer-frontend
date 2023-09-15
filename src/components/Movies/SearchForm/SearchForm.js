import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    const { onClick } = props;

    const {inputMovies, setInputMovies} = React.useState('строка');

    
    function handleInputMovies (e) {
        console.log(inputMovies)
        //setInputMovies(e.target.value);
        // console.log(inputMovies);
        
        const value = e.target.value;
        console.log(value)
        
    }


    return (
        <section className="search-form">
            <form name="Поиск фильмов" method="post" >
                <input className="search-form__input focus-effect" placeholder="Фильм" required onChange={handleInputMovies}></input>
                <button type="submit" className="search-form__button hover-effect" onClick={onClick}></button>
                <div className="search-form__checkbox">
                    <FilterCheckbox />
                    <p className="search-form__checkbox-title">Короткометражки</p>
                </div>
            </form>
        </section>
    )
}
export default SearchForm;