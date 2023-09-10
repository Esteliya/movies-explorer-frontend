import { Link } from "react-router-dom";
import './PopupMenu.css'
import ButtonWithIcon from "../Header/ButtonWithIcon/ButtonWithIcon";
import AccountIcon from "../../images/button_icon_account.svg";

function PopupMenu(props) {
    const {isOpen, onClose, onClickAccount, onClickHome, onClickMovies, onClickSavedMovies } = props;

    const popupClass = isOpen ? ('popup') : ('popup popup_close');

    return (
        <div className={popupClass}>
            <div className='popup__menu'>
                <nav className='popup__menu-navigate'>
                    <ul className='popup__menu-links'>
                        <li className='popup__item'><Link to="/" name="Главная" className="popup__link" onClick={onClickHome}>Главная</Link></li>
                        <li className='popup__item'><Link to="/movies" name="Фильмы" className="popup__link" onClick={onClickMovies}>Фильмы</Link></li>
                        <li className='popup__item'><Link to="/saved-movies" name="Избранные" className="popup__link" onClick={onClickSavedMovies}>Сохраненные фильмы</Link></li>
                    </ul>
                </nav>
                <ButtonWithIcon text="Аккаунт" icon={AccountIcon} onClick={onClickAccount}/>
            </div>
            <button type="button" className="popup__button-close" onClick={onClose}/>
        </div>
    )
}
export default PopupMenu;