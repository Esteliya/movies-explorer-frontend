import "./Register.css"
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"

function Register(props) {
    const { onClick } = props;

    return (
        <section className="margin-form-center">
            <Auth
                title='Добро пожаловать!'
                btnText='Зарегистрироваться'
                titleLink='Уже зарегистрированы?'
                textLink='Войти'
                link='/signin'
                margin='91'
                onClick={onClick}>
                <ItemForm
                    titleInput="Имя"
                />
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
export default Register;