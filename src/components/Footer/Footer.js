import "./Footer.css";
import "../../mixStile/formatSection.css";

function Footer() {
    return (
        <section className="footer format-section">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__context">
                <p className="footer__data">&#169; {new Date().getFullYear()}</p>
                <ul className="footer__links">
                    <li className="footer__item"><a href="#" className="footer__link">Яндекс.Практикум</a></li>
                    <li className="footer__item"><a href="#" className="footer__link">Github</a></li>
                </ul>
            </div>
        </section>
    )
}
export default Footer;