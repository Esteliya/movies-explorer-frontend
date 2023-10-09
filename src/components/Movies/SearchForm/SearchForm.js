import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    const { onSubmitQuery, handleSearch, isChecked, onClickFilter } = props;

    const [query, setQuery] = React.useState('');// запрос
    // отобразить повторный запрос и пустой запрос → блокировать кнопку !!!!!
    const [showError, setShowError] = React.useState(false);// показать ошибку
    const [isTextError, setIsTextError] = React.useState('');// текст ошибки
    const [beChecked, setBeChecked] = React.useState(isChecked === "on" ? true : false);

    // обработка инпута
    function handleInputMovies(e) {
        const value = e.target.value;
        // console.log(value);
        setQuery(value);
    };

    //обработчик формы
    function handleSearchForm(e) {
        e.preventDefault();
        //setQuery(e.target.value);
        //setQuery(stringValue)
        // console.log("сабмит формы поиска фильмов")
        // console.log(query)
        onSubmitQuery(query);// отправка запроса по сабмиту!!!!
        handleSearch(query);
    };

    return (
        <section className="search-form">
            {showError && <span className="search-form__mistake">{isTextError}</span>}
            <form name="Поиск фильмов"
                method="post"
                onSubmit={handleSearchForm}
                noValidate
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
                    <FilterCheckbox beChecked={beChecked} onClickFilter={onClickFilter} />
                    <p className="search-form__checkbox-title">Короткометражки</p>
                </div>
            </form>
        </section>
    )
};

export default SearchForm;