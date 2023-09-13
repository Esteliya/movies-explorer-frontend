import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio format-section">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a href="https://github.com/Esteliya/how-to-learn" rel="noreferrer" target="_blank" className="portfolio__link hover-effect">
                        <p className="portfolio__name-link">Статичный сайт</p>
                        <div className="portfolio__button-link"></div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://github.com/Esteliya/russian-travel" rel="noreferrer" target="_blank" className="portfolio__link hover-effect">
                        <p className="portfolio__name-link">Адаптивный сайт</p>
                        <div className="portfolio__button-link"></div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://github.com/Esteliya/react-mesto-auth" rel="noreferrer" target="_blank" className="portfolio__link hover-effect">
                        <p className="portfolio__name-link">Одностраничное приложение</p>
                        <div className="portfolio__button-link"></div>
                    </a>
                </li>
            </ul>
        </section>
    )
}
export default Portfolio;