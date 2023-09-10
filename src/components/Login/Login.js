import "./Login.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"

function Login(props) {
    const { onClick } = props;

    return (
        <main className="margin-form-center">
            <Auth
                title='Рады видеть!'
                btnText='Войти'
                titleLink='Ещё не зарегистрированы?'
                textLink='Регистрация'
                link='/signup'
                onClick={onClick}>
                <ItemForm
                    label="E-mail"
                    type="email"
                    minLength="2"
                    maxLength="30"
                />
                <ItemForm
                    label="Пароль"
                    type="password"
                />
            </Auth>
        </main>

    )
}
export default Login;