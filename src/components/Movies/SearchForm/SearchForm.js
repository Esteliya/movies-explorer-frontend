import React from "react";
// import { useLocation } from 'react-router-dom';
import "./SearchForm.css";
import ValidationForm from "../../../utils/validationForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    // запрос поиска/ строка поиска/ поиск по запросу
    const { setQuery, query, handleSearch } = props;

    /* const location = useLocation();//проверим, на каком роуте выдаем карточки
    // все фильмы 
    const savedMovies = location.pathname === '/saved-movies'
    // сохраненные фильмы
    const movies = location.pathname === '/movies' */



    // обработка инпута
    function handleInputMovies (e) {
        const value = e.target.value;
        //console.log(value)//что в инпуте? 
        setQuery(value)
        //console.log(query)// нужная строка +
        
    }

     //обработчик формы
     function handleSearchForm(e) {
        e.preventDefault();
        // console.log("сабмит формы поиска фильмов")
        console.log(query)
        handleSearch(query)
     }

    return (
        <section className="search-form">
            <form name="Поиск фильмов"
                method="post"
                onSubmit={handleSearchForm}
            >
                <input
                    className="search-form__input focus-effect"
                    name='query'
                    placeholder="Фильм"
                    type='text'
                    required
                    onChange={handleInputMovies}></input>

                <button
                    type="submit"
                    className="search-form__button hover-effect"
                ></button>

                <div className="search-form__checkbox">
                    <FilterCheckbox />
                    <p className="search-form__checkbox-title">Короткометражки</p>
                </div>
            </form>
        </section>
    )
}
export default SearchForm;