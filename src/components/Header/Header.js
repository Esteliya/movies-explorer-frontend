import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../image/header__logo.svg";//лого
import Cover from "./Cover/Cover"

/* кнопка */
import ButtonWithText from "./ButtonWithText/ButtonWithText";// кнопка с текстом 
// import ButtonWithIcon from "./ButtonWithIcon/ButtonWithIcon";// кнопка текст с иконкой 
// import ButtonMenu from "./ButtonMenu/ButtonMenu";// кнопка меню (три полосочки) 

/* иконки */
// import AccountIcon from "../../image/button_icon_account.svg";

function Header() {
    return (
        <>
            <header className="header header_main">
                <Link to="/"><img src={headerLogo} alt="Логотип Movie" className="header__logo" /></Link>
                <nav className="header__menu">
                    <div className="header__navigation-movie">
                        <Link to="/movies" name="Фильмы" className="header__link">Фильмы</Link>
                        <Link to="/saved-movies" name="Сохраненные фильмы" className="header__link">Сохраненные фильмы</Link>
                    </div>
                    <div>
                        <Link to="/signup" name="Регистрация" className="header__link">Регистрация</Link>
                    </div>
                </nav>
                {/* <ButtonMenu /> */}
                <ButtonWithText text="Войти" />
                {/* <ButtonWithIcon text="Аккаунт" icon={AccountIcon}/> */}
                {/* <button className="header__button" name="Войти">Войти</button> */}
            </header>
            <Cover />
        </>

    )
}
export default Header;