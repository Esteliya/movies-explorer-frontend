import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio format-section">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <p className="portfolio__name-link">Статичный сайт</p>
                    <a href="https://github.com/Esteliya/how-to-learn" rel="noreferrer" target="_blank"><div className="portfolio__link"></div></a>
                </li>
                <li className="portfolio__item">
                    <p className="portfolio__name-link">Адаптивный сайт</p>
                    <a href="https://github.com/Esteliya/russian-travel" rel="noreferrer" target="_blank"><div className="portfolio__link"></div></a>
                </li>
                <li className="portfolio__item">
                    <p className="portfolio__name-link">Одностраничное приложение</p>
                    <a href="https://github.com/Esteliya/react-mesto-auth" rel="noreferrer" target="_blank"><div className="portfolio__link"></div></a>
                </li>
            </ul>
        </section>

    )
}
export default Portfolio;