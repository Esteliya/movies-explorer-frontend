import "./Login.css"
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"
/* добавить css для кнопки/инпута!!! */

function Login() {
    return (
        <Auth 
        title='Рады видеть!'
        btnText='Войти'      
        titleLink='Ещё не зарегистрированы?'
        textLink='Регистрация'
        link='/signup'>
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