import "./Login.css"
import "../../mixStile/marginFormCenter.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"
/* добавить css для кнопки/инпута!!! */

function Login(props) {
const { onClick } = props;

    return (
        <section className="margin-form-center">
            <Auth 
        title='Рады видеть!'
        btnText='Войти'      
        titleLink='Ещё не зарегистрированы?'
        textLink='Регистрация'
        link='/signup'
        margin='179'
        onClick={onClick}>
            <ItemForm 
            titleInput="E-mail"
            />
            <ItemForm 
            titleInput="Пароль"
            />
        </Auth>
        </section>

    )
}
export default Login;