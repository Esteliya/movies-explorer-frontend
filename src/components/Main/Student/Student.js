import "./Student.css";
import studentPhoto from "../../../image/student__photo.jpg";//фото

function Student() {
    return (
        <section className="student format-section">
            <h2 className="student__title">Студент</h2>
            <div className="student__context">
                <div className="student_info">
                    <h3 className="student__subtitle">Виталий</h3>
                    <p className="student__discription">Фронтенд-разработчик, 30 лет</p>
                    <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <p href="#" className="student__link">Github</p>
                </div>
                <img src={studentPhoto} alt="Фотография студента" className="student__photo" />
            </div>
        </section>

    )
}
export default Student;