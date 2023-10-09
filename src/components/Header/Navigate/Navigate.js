import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./Navigate.css";
import "../../../mixStile/hoverEffect.css";
/* лого */
import Logo from "../../Logo/Logo";
/* кнопки */
import ButtonWithText from "../ButtonWithText/ButtonWithText"
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon"
import ButtonMenu from "../ButtonMenu/ButtonMenu";
/* иконка для кнопки */
import AccountIcon from "../../../images/button_icon_account.svg";

function Navigate(props) {
    const { window, homepage, openButton, onClickAccount, loggedIn } = props;
    // если экран меньше или равно - показать кнопку меню
    const isWindow = window <= 768;

    const navigate = useNavigate();
    // пререход на страницу авторизации - на функционале перенести 
    function passPageLogin() {
        navigate('/signin', {
            replace: true
        });
    };

    return (
        <>
            <nav className="navigate navigate_movie">
                <Logo />
                {loggedIn && !isWindow &&
                    <>
                        <Link to="/movies" name="Фильмы" className="navigate__link navigate__link_movie hover-effect">Фильмы</Link>
                        <Link to="/saved-movies" name="Избранное" className="navigate__link hover-effect">Сохраненные фильмы</Link>
                    </>}
            </nav>
            <nav className="navigate navigate_profile">
                {!loggedIn &&
                    <>
                        <Link to="/signup" name="Регистрация" className="navigate__link hover-effect">Регистрация</Link>
                        <ButtonWithText text="Войти" onClick={passPageLogin} />
                    </>}
                {!isWindow && loggedIn && <ButtonWithIcon text="Аккаунт" homepage={homepage} icon={AccountIcon} onClick={onClickAccount} />}
                {isWindow && loggedIn && <ButtonMenu homepage={homepage} onClick={openButton} />}
            </nav>
        </>
    )
};

export default Navigate;