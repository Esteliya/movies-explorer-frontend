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
import AccountIcon from "../../../images/button_icon_account.svg"
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

    return (
        <>
            <nav className="navigate navigate_movie">
                <Logo />
                {currentUser.loggedIn && !isMobile &&
                    <>
                        <Link to="/movies" name="Фильмы" className="navigate__link navigate__link_movie hover-effect">Фильмы</Link>
                        <Link to="/saved-movies" name="Сохраненные фильмы" className="navigate__link hover-effect">Сохраненные фильмы</Link>
                    </>}
            </nav>
            <nav className="navigate navigate_profile">
                {!currentUser.loggedIn &&
                    <>
                        <Link to="/signup" name="Регистрация" className="navigate__link hover-effect">Регистрация</Link>
                        <ButtonWithText text="Войти" onClick={passPageLogin} />
                    </>}
                {!isMobile && currentUser.loggedIn && <ButtonWithIcon text="Аккаунт" homepage={homepage} icon={AccountIcon} onClick={onClickAccount} />}
                {isMobile && currentUser.loggedIn && <ButtonMenu homepage={homepage} onClick={openButton} />}
            </nav>
        </>
    )
}
export default Navigate;