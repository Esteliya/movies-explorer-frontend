import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    const { onClick } = props;
    return (
        <section className="search-form">
            <form name="Поиск фильмов" method="post" >
                <input className="search-form__input focus-effect" placeholder="Фильм" required></input>
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