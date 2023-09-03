import { Link, useNavigate } from "react-router-dom";
import "./Navigate.css";
/* лого */
import Logo from "../../Logo/Logo";
/* кнопки */
import ButtonWithText from "../ButtonWithText/ButtonWithText"
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon"
import ButtonMenu from "../ButtonMenu/ButtonMenu";
/* иконка для кнопки */
import AccountIcon from "../../../image/button_icon_account.svg"

function Navigate(props) {
    const { mobile, loggedIn } = props
    // если экран меньше или равно - показать кнопку меню
    const isMobile = mobile <= 768;

    const navigate = useNavigate();
    // пререход на страницу авторизации - на функционале перенести 
    function passPageLogin() {
        navigate('/signin', {
            replace: true
        })
    }

    // пререход на страницу данных пользователя - на функционале перенести 
    function passPageProfile() {
        navigate('/profile', {
            replace: true
        })
    }

    return (
        <>
            <nav className="navigate navigate_movie">
                <Logo />
                {loggedIn && <>
                    <Link to="/movies" name="Фильмы" className="navigate__link">Фильмы</Link>
                    <Link to="/saved-movies" name="Сохраненные фильмы" className="navigate__link">Сохраненные фильмы</Link>
                </>}
            </nav>
            <nav className="navigate navigate_profile">
                {!loggedIn &&
                    <>
                        <Link to="/signup" name="Регистрация" className="navigate__link">Регистрация</Link>
                        <ButtonWithText text="Войти" onClick={passPageLogin} />
                    </>}
                {!isMobile && loggedIn && <ButtonWithIcon text="Аккаунт" icon={AccountIcon} onClick={passPageProfile} />}
                {isMobile && <ButtonMenu />}
            </nav>
        </>
    )
}
export default Navigate;