import "./TestPage.css";
import { apiWithMovies, baseApi } from "../../utils/MoviesApi";
import { BASE_MOVIES_URL } from '../../utils/config';


function TestPage(props) {
    const { onClick } = props;
    function handleClick() {
        
        // console.log("кнопка работает");
        /* baseApi.getMovieInfo()
        .then((data) => {
            console.log(data)
        }) */
        apiWithMovies.getMovieInfo()
        .then((data) => {
            //console.log(data)
            data.map((card) => {
                console.log(card.image.url);
                const image = `${BASE_MOVIES_URL}${card.image.url}` //нужная картинка!!!
                console.log(image);
                // console.log(card.image.formats.large);
                // console.log(card.duration); // + продолжительность фильма
                // console.log(card.nameRU); // + название
                // console.log(card.id); // + id 
            })
        })
    }

    return (
        <section className="test-page">
            <h1>ТЕСТОВАЯ СТРАНИЦА</h1>
            <button type="button" className="test-page__button" onClick={onClick}>ТЕСТОВАЯ КНОПКА</button>
        </section>
    )
}
export default TestPage;