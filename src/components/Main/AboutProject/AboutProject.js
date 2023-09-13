import "./AboutProject.css";
import "../../../mixStile/titleSection.css";
import "../../../mixStile/paddingSection.css";

function AboutProject() {
    return (
        <section id="navigation" className="about-project format-section padding-section">
            <h2 className="about-project__title title-section">О проекте</h2>
            <div className="about-project__context">
                <div className="about-project__column">
                    <h3 className="about-project__discription">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__column">
                    <h3 className="about-project__discription">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__progress">
                <div className="about-project__time">
                    <div className="about-project__trend about-project__trend_back">
                        <p className="about-project__trend-text">1 неделя</p>
                    </div>
                    <p className="about-project__trend-comment">Back-end</p>
                </div>
                <div className="about-project__time">
                    <div className="about-project__trend about-project__trend_front">
                        <p className="about-project__trend-text">4 недели</p>
                    </div>
                    <p className="about-project__trend-comment">Front-end</p>
                </div>
            </div>
        </section>
    )
}
export default AboutProject;