import React from "react";
// import { useLocation } from 'react-router-dom';
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    // запрос поиска/ строка поиска/ поиск по запросу/ чекнули?да-нет/ стейт-управление стейтом короткометражек/ обработчик чекбокса
    const { submitQuery, onSubmitQuery, handleSearch, isChecked, onClickFilter } = props;

     const [query, setQuery] = React.useState('');// запрос
     // const [isChecked, setIsChecked] = React.useState(false);// чекбокс 
     // отобразить повторный запрос и пустой запрос → блокировать кнопку !!!!!
     const [showError, setShowError] = React.useState(false);// показать ошибку
     const [isTextError, setIsTextError] = React.useState('');// текст ошибки
     const [beChecked, setBeChecked] = React.useState(isChecked === "on" ? true : false);

/*      React.useEffect(() => {
        console.log(isChecked === "on")
     }, []) */
    // обработка инпута
    function handleInputMovies(e) {
        //stringValue = e.target.value;
        const value = e.target.value;
        console.log(value)//что в инпуте? 
        setQuery(value)
        // localStorage.setItem("query", value);// сохраним в ЛС запрос +
        //console.log(query)// нужная строка +   
    }

    //обработчик формы
    function handleSearchForm(e) {
        e.preventDefault();
        //setQuery(e.target.value);
        //setQuery(stringValue)
        // console.log("сабмит формы поиска фильмов")
        // console.log(query)
        onSubmitQuery(query);// отправка запроса по сабмиту!!!!
        handleSearch(query)
    }

/*     // обработчик чекбокса 
    function handleChecked(e) {
        e.preventDefault();
        //console.log("чекнули")
        if (isChecked) {
            console.log("on")
            localStorage.setItem("checkedShort", 'on');// сохраним в ЛС чек on +
        } else {
            console.log("off")
            localStorage.setItem("checkedShort", 'off');// сохраним в ЛС чек off +
        }
    } */


    return (
        <section className="search-form">
            {showError && <span className="search-form__mistake">{isTextError}</span>}
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
                    <FilterCheckbox beChecked={beChecked} onClickFilter={onClickFilter} />
                    <p className="search-form__checkbox-title">Короткометражки</p>
                </div>
            </form>
        </section>
    )
}
export default SearchForm;