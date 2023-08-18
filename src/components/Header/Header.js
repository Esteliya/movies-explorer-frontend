import "./Header.css";
import headerLogo from "../../image/header__logo.svg";//лого
import Cover from "./Cover/Cover"

function Header() {
    return (
        <>
            <header className="header">
                <img src={headerLogo} alt="Логотип Movie" className="logo" />
                <nav className="header__menu">
                    <div className="header__navigation-movie">
                        <a className="header__link" href="#">Фильмы</a>
                        <a className="header__link" href="#">Сохраненные фильмы</a>
                    </div>
                    <div>
                        <a className="header__link" href="#">Регистрация</a>
                    </div>
                </nav>
                <button className="header__button" name="Войти">Войти</button>
            </header>
            <Cover />
        </>

    )
}
export default Header;