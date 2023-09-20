import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Footer.css";
import "../../mixStile/formatSection.css";

function Footer() {
    const location = useLocation();//будем следить за роутами
    // страницы с контентом (главная + фильмы)
    const routeContent = location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/';

    // отслеживаем свой роут
    /* React.useEffect(() => {
        console.log('Current location is ', location.pathname);
        console.log(routeContent)
    }, [location]); */
    
    return (
        <>
        {routeContent && <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__context">
                <p className="footer__data">&#169; {new Date().getFullYear()}</p>
                <ul className="footer__links">
                    <li className="footer__item"><a href="https://practicum.yandex.ru" rel="noreferrer" target="_blank" className="footer__link hover-effect">Яндекс.Практикум</a></li>
                    <li className="footer__item"><a href="https://github.com" rel="noreferrer" target="_blank" className="footer__link hover-effect">Github</a></li>
                </ul>
            </div>
        </footer>}
        </>
    )
}
export default Footer;