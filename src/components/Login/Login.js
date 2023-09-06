import "./Login.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"

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