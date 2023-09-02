import "./Register.css"
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"

function Register() {
    return (
        <Auth 
        title='Добро пожаловать!'
        btnText='Зарегистрироваться'
        titleLink='Уже зарегистрированы?'
        textLink='Войти'
        link='/signin'>
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

    )
}
export default Register;