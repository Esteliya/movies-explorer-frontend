import "./Student.css";
import "../../../mixStile/titleSection.css";
import "../../../mixStile/paddingSection.css";
import studentPhoto from "../../../images/student__photo.jpg";

function Student() {
    return (
        <section id="student" className="student format-section padding-section">
            <h2 className="student__title title-section">Студент</h2>
            <div className="student__context">
                <div className="student__info">
                    <h3 className="student__subtitle">Виталий</h3>
                    <p className="student__discription">Фронтенд-разработчик, 30 лет</p>
                    <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a href="https://github.com/Esteliya" rel="noreferrer" target="_blank" className="student__link hover-effect">Github</a>
                </div>
                <img src={studentPhoto} alt="Фотография студента" className="student__photo" />
            </div>
        </section>
    )
};

export default Student;