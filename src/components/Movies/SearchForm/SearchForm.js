import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <section className="search-form">
            <form name="Поиск фильмов" method="post" >
                <input className="search-form__input focus-effect" placeholder="Фильм" required></input>
                <button type="submit" className="search-form__button hover-effect"></button>
                <div className="search-form__checkbox">
                    <FilterCheckbox />
                    <p className="search-form__checkbox-title">Короткометражки</p>
                </div>
            </form>
        </section>
    )
}
export default SearchForm;