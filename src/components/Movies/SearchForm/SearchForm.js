import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function SearchForm(props) {
    const { onSubmitQuery, handleSearch, isChecked, onClickFilter, isValid, showError, isTextError, setCurrentQuery } = props;

    const lastQuery = localStorage.getItem("query");
    const [query, setQuery] = React.useState('');// запрос
    // const [currentQuery, setCurrentQuery] = React.useState("")
    // const [lastQuery, setLastQuery] = React.useState(''); // предыдущий запрос ???? пробуем 
    // отобразить повторный запрос и пустой запрос → блокировать кнопку !!!!!
    // const [showError, setShowError] = React.useState(!isValid);// показать ошибку если данные невалидны
    // const [isTextError, setIsTextError] = React.useState('Результат запрса уже на странице. Задайте новые параметры поиска.');// текст ошибки
    const [beChecked, setBeChecked] = React.useState(isChecked === "on" ? true : false);
    // валидация 
    // const [isValid, setIsValid] = React.useState(false);
    const [beDisabled, setBeDisabled] = React.useState(isValid);// дизейбл кнопки = валидный запрос

    React.useEffect(() => {
        console.log("query -------", query)
        setQuery(query)
    }, [query]);

    React.useEffect(() => {
        handleDisableButton()
        // setShowError(showError)
    }, [isValid, query]);

    /*     React.useEffect(() => {
            if (!query === lastQuery) {
                if (!query === lastQuery) {
                   
                    setShowError(true)
                 return
                } 
            }
        }, [query, lastQuery]); */

    // валидация поиска
    /*     function handleValidationSearch() {
            console.log("СТЕЙТ ЗАПРОСА -------", query)
            if (query !== "") {
                if (!query === lastQuery) {
                    setIsValid(false)
                    // setShowError(true)
                    console.log("ПОВТОРНЫЙ ЗАПРОС")
                } else {
                    setIsValid(true)
                    console.log("ВАЛИДНАЯ СТРОКА +")
                }
    
            } else {
                console.log("СТЕЙТ ЗАПРОСА -------", query)
                setIsValid(false)
                console.log("НЕВАЛИДНАЯ СТРОКА")
            }
        } */

    // проверим строку запроса - УДАЛИТЬ!!! 
    /*     React.useEffect(() => {
            console.log("СТРОКА ЗАПРОСА -------", query)
        }, [query]) */

    // обработчик дизейбла кнопки 
    function handleDisableButton() {
        console.log(lastQuery !== query)
        if (lastQuery !== query) {
            console.log("разные запросы --- разблокировать кнопку ")
            setBeDisabled(false);
        }
        if (isValid) {
            console.log("ЕСТЬ СТРОКА ЗАПРОС")
            setBeDisabled(false);
        } else {
            console.log("НЕТ ЗАПРОСА")
            setBeDisabled(true);// дизейбл 
        }
    }

    // обработка инпута
    function handleInputMovies(e) {
        const value = e.target.value;
        setCurrentQuery(value)
        // console.log(value);
        // setLastQuery(query); // сохраняем последний запрос
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

    const classButton = beDisabled ? "search-form__button search-form__button_disable hover-effect" : "search-form__button hover-effect"


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
                    disabled={beDisabled}
                    className={classButton}
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