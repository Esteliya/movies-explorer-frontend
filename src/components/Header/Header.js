import "./Header.css";
import headerLogo from "../../image/header__logo.svg";//лого
import Cover from "./Cover/Cover"

/* кнопка */
import ButtonWithText from "./ButtonWithText/ButtonWithText";// кнопка с текстом 
// import ButtonWithIcon from "./ButtonWithIcon/ButtonWithIcon";// кнопка текст с иконкой 
// import ButtonMenu from "./ButtonMenu/ButtonMenu";// кнопка меню (три полосочки) 

/* иконки */
import AccountIcon from "../../image/button_icon_account.svg";

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