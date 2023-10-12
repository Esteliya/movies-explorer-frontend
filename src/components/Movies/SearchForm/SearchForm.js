import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    const { onSubmitQuery, handleSearch, isChecked, onClickFilter, isValid, showError, isTextError, setCurrentQuery } = props;

    const lastQuery = localStorage.getItem("query");
    const [query, setQuery] = React.useState('');// запрос
    const [beChecked, setBeChecked] = React.useState(isChecked === "on" ? true : false);
    // дизейбл кнопки = валидный запрос
    const [beDisabled, setBeDisabled] = React.useState(isValid);
    // css-стили кнопки
    const classButton = beDisabled ? "search-form__button search-form__button_disable hover-effect" : "search-form__button hover-effect";

    React.useEffect(() => {
        setQuery(query);
    }, [query]);

    React.useEffect(() => {
        handleDisableButton()
        // setShowError(showError)
    }, [isValid, query]);

    // обработчик дизейбла кнопки 
    function handleDisableButton() {
        // console.log(lastQuery !== query)
        if (lastQuery !== query) {
            setBeDisabled(false);
        }
        if (isValid) {
            // console.log("ЕСТЬ СТРОКА ЗАПРОС")
            setBeDisabled(false);
        } else {
            // console.log("НЕТ ЗАПРОСА")
            setBeDisabled(true);// дизейбл 
        }
    }

    // обработка инпута
    function handleInputMovies(e) {
        const value = e.target.value;
        setCurrentQuery(value);
        // console.log(value);
        setQuery(value);

    };

    //обработчик формы
    function handleSearchForm(e) {
        e.preventDefault();
        //setQuery(e.target.value);
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