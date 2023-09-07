import { Link } from "react-router-dom";
import './PopupMenu.css'
import ButtonWithIcon from "../Header/ButtonWithIcon/ButtonWithIcon";
import AccountIcon from "../../images/button_icon_account.svg";

function PopupMenu(props) {
    const {isOpen, onClose, onClickAccount, onClickHome, onClickMovies, onClickSavedMovies } = props;

    const popupClass = isOpen ? ('popup-menu__overlay') : ('popup-menu__overlay popup-menu__overlay_close');

    return (
        <div className={popupClass}>
            <div className='popup-menu'>
                <nav className='popup-menu__navigate'>
                    <ul className='popup-menu__links'>
                        <li className='popup-menu__item'><Link to="/" name="Главная" className="popup-menu__link" onClick={onClickHome}>Главная</Link></li>
                        <li className='popup-menu__item'><Link to="/movies" name="Фильмы" className="popup-menu__link" onClick={onClickMovies}>Фильмы</Link></li>
                        <li className='popup-menu__item'><Link to="/saved-movies" name="Сохраненные фильмы" className="popup-menu__link" onClick={onClickSavedMovies}>Сохраненные фильмы</Link></li>
                    </ul>
                </nav>
                <ButtonWithIcon text="Аккаунт" icon={AccountIcon} onClick={onClickAccount}/>
            </div>
            <button type="button" className="popup-menu__button-close" onClick={onClose}/>
        </div>
    )
}
export default PopupMenu;