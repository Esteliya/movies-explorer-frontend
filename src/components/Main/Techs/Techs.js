import "./Techs.css";
import "../../../mixStile/titleSection.css";
import "../../../mixStile/paddingSection.css";

function Techs() {
    return (
        <section id="techs" className="techs format-section">
            <h2 className="techs__title title-section">Технологии</h2>
            <div className="techs__context">
                <h3 className="techs__subtitle">7 технологий</h3>
                <p className="techs__discription">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__list">
                    <li className="techs__item">HTML</li>
                    <li className="techs__item">CSS</li>
                    <li className="techs__item">JS</li>
                    <li className="techs__item">React</li>
                    <li className="techs__item">Git</li>
                    <li className="techs__item">Express.js</li>
                    <li className="techs__item">mongoDB</li>
                </ul>
            </div>
        </section>
    )
};

export default Techs;
