import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <form name="Поиск фильмов" method="post" className="search-form">
            <input className="search-form__input" placeholder="Фильм"></input>
            <button className="search-form__button"></button>
            <div className="search-form__checkbox">
                <FilterCheckbox />
                <p className="search-form__checkbox-title">Короткометражки</p>
            </div>
        </form>
    )
}
export default SearchForm;