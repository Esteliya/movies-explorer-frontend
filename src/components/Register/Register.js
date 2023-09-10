import "./Register.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"

function Register(props) {
    const { onClick } = props;

    return (
        <main className="margin-form-center">
            <Auth
                title='Добро пожаловать!'
                btnText='Зарегистрироваться'
                titleLink='Уже зарегистрированы?'
                textLink='Войти'
                link='/signin'
                onClick={onClick}>
                <ItemForm
                    label="Имя"
                    type="text"
                    minLength="2"
                    maxLength="30"
                />
                <ItemForm
                    label="E-mail"
                    type="email"
                />
                <ItemForm
                    label="Пароль"
                    type="password"
                    minLength="8"
                    maxLength="30"
                />
            </Auth>
        </main>
    )
}
export default Register;