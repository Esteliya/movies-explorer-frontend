import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    const { onClickForm, handleDataForm } = props;

    const [inputMovies, setInputMovies] = React.useState('');
    
    function handleInputMovies (e) {
       //  console.log(inputMovies)
        // console.log(inputMovies);
        
        const value = e.target.value;
        // console.log(value)
        setInputMovies(value)
        
    }

     //обработчик формы
     function handleSubmit(e) {
        e.preventDefault();
        // console.log("сабмит формы поиска фильмов")
        // передаем запрос в функцию-обработчик поиска
        handleDataForm(inputMovies)
     }



    return (
        <section className="search-form">
            <form name="Поиск фильмов" method="post" onSubmit={handleSubmit}>
                <input className="search-form__input focus-effect" placeholder="Фильм" required onChange={handleInputMovies}></input>
                <button type="submit" className="search-form__button hover-effect" onClick={onClickForm}></button>
                <div className="search-form__checkbox">
                    <FilterCheckbox />
                    <p className="search-form__checkbox-title">Короткометражки</p>
                </div>
            </form>
        </section>
    )
}
export default SearchForm;