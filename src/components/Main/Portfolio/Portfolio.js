import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio format-section">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <p className="portfolio__name-link">Статичный сайт</p>
                    <button href="#" className="portfolio__button"></button>
                </li>
                <li className="portfolio__item">
                    <p className="portfolio__name-link">Адаптивный сайт</p>
                    <button href="#" className="portfolio__button"></button>
                </li>
                <li className="portfolio__item">
                    <p className="portfolio__name-link">Одностраничное приложение</p>
                    <button href="#" className="portfolio__button"></button>
                </li>
            </ul>
        </section>

    )
}
export default Portfolio;