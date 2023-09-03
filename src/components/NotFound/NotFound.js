import { Link } from "react-router-dom";
import "./NotFound.css"

function NotFound() {

    //const before = window.history.back;

    return (
        <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__discription">Страница не найдена</p>
            <Link className="not-found__link" to="/">Назад</Link>
        </section>

    )
}
export default NotFound;