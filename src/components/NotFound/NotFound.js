import { Link } from "react-router-dom";
import "./NotFound.css"

function NotFound() {
    return (
        <main className="not-found">
            <div className="not-found__content">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__discription">Страница не найдена</p>
                <Link className="not-found__link hover-effect" to="/">Назад</Link>
            </div>
        </main>

    )
}
export default NotFound;