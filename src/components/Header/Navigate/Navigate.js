import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./Navigate.css";
/* лого */
import Logo from "../../Logo/Logo";
/* кнопки */
import ButtonWithText from "../ButtonWithText/ButtonWithText"
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon"
import ButtonMenu from "../ButtonMenu/ButtonMenu";
/* иконка для кнопки */
import AccountIcon from "../../../image/button_icon_account.svg"
/* контекст - пока логирование - ждем функционал */
import CurrentUserContext from "../../../context/CurrentUserContext";

function Navigate(props) {
    const { mobile, homepage, openButton, onClickAccount } = props
    // если экран меньше или равно - показать кнопку меню
    const isMobile = mobile <= 768;

    const currentUser = React.useContext(CurrentUserContext);

    const navigate = useNavigate();
    // пререход на страницу авторизации - на функционале перенести 
    function passPageLogin() {
        navigate('/signin', {
            replace: true
        })
    }

    // пререход на страницу данных пользователя - на функционале перенести 
/*     function passPageProfile() {
        navigate('/profile', {
            replace: true
        })
    } */

/*     function handleClickMenu () {
        console.log("клик по меню");
    } */

    return (
        <>
            <nav className="navigate navigate_movie">
                <Logo />
                {currentUser.loggedIn && !isMobile && <>
                    <Link to="/movies" name="Фильмы" className="navigate__link">Фильмы</Link>
                    <Link to="/saved-movies" name="Сохраненные фильмы" className="navigate__link">Сохраненные фильмы</Link>
                </>}
            </nav>
            <nav className="navigate navigate_profile">
                {!currentUser.loggedIn &&
                    <>
                        <Link to="/signup" name="Регистрация" className="navigate__link">Регистрация</Link>
                        <ButtonWithText text="Войти" onClick={passPageLogin} />
                    </>}
                {!isMobile && currentUser.loggedIn && <ButtonWithIcon text="Аккаунт" homepage={homepage} icon={AccountIcon} onClick={onClickAccount} />}
                {isMobile && currentUser.loggedIn && <ButtonMenu homepage={homepage} onClick={openButton}/>}
            </nav>
        </>
    )
}
export default Navigate;