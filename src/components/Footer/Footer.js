import "./Footer.css";
import "../../mixStile/formatSection.css";

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__context">
                <p className="footer__data">&#169; {new Date().getFullYear()}</p>
                <ul className="footer__links">
                    <li className="footer__item"><a href="https://practicum.yandex.ru" rel="noreferrer" target="_blank" className="footer__link hover-effect">Яндекс.Практикум</a></li>
                    <li className="footer__item"><a href="https://github.com" rel="noreferrer" target="_blank" className="footer__link hover-effect">Github</a></li>
                </ul>
            </div>
        </footer>
    )
}
export default Footer;