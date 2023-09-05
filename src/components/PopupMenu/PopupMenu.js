import { Link } from "react-router-dom";
import './PopupMenu.css'
import ButtonWithIcon from "../Header/ButtonWithIcon/ButtonWithIcon";
import AccountIcon from "../../image/button_icon_account.svg";

function PopupMenu(props) {
    const {isOpen, onClose} = props;

    const popupClass = isOpen ? ('popup-menu__overlay') : ('popup-menu__overlay popup-menu__overlay_close');

    return (
        <div className={popupClass}>
            <div className='popup-menu'>
                <nav className='popup-menu__navigate'>
                    <ul className='popup-menu__links'>
                        <li className='popup-menu__item'><Link to="/" name="Фильмы" className="popup-menu__link">Главная</Link></li>
                        <li className='popup-menu__item'><Link to="/movies" name="Фильмы" className="popup-menu__link">Фильмы</Link></li>
                        <li className='popup-menu__item'><Link to="/saved-movies" name="Фильмы" className="popup-menu__link">Сохраненные фильмы</Link></li>
                    </ul>
                </nav>
                <ButtonWithIcon text="Аккаунт" icon={AccountIcon}/>
            </div>
            <button className="popup-menu__button-close" onClick={onClose}/>
        </div>
    )
}
export default PopupMenu;