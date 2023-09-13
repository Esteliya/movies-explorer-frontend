import "./NavTab.css";


function Navigation() {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__input"><a href="#navigation" name="Проект" className="navigation__link hover-effect">О проекте</a></li>
                <li className="navigation__input"><a href="#techs" name="Технологии" className="navigation__link hover-effect">Технологии</a></li>
                <li className="navigation__input"><a href="#student" name="Студент" className="navigation__link hover-effect">Студент</a></li>
            </ul>
        </nav>
    )
}
export default Navigation;