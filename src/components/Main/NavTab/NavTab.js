import "./NavTab.css";


function Navigation() {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__input"><a href="#navigation" name="О проекте" className="header__link">О проекте</a></li>
                <li className="navigation__input"><a href="#techs" name="Технологии" className="header__link">Технологии</a></li>
                <li className="navigation__input"><a href="#student" name="Студент" className="header__link">Студент</a></li>
            </ul>
        </nav>

    )
}
export default Navigation;