import "./Login.css"
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"
/* добавить css для кнопки/инпута!!! */

function Login() {
    return (
        <Auth 
        title='Рады видеть!'
        btnText='Войти'
        textLink='Ещё не зарегистрированы?'
        link='Регистрация'>
            <ItemForm 
            titleInput="Имя"
            />
            <ItemForm 
            titleInput="E-mail"
            />
        </Auth>

    )
}
export default Login;