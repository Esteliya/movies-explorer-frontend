import React from "react";
import "./Login.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"

function Login(props) {
    const { handleDataForm } = props;

    // переменные состояния email и password
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Обработчики изменения инпута
    // имейл 
    function handleChangeEmail(e) {
        setEmail(e.target.value);
        // console.log(email)
    }
    // пароль
    function handleChangePassword(e) {
        setPassword(e.target.value);
        // console.log(password)
    }

    // обработчик формы
    function hendleSubmitForm(e) {
        e.preventDefault();
        //записать и передать данные инпутов 
        console.log("сабмит формы авторизации")
        console.log(email)
        console.log(password)
        //запишем и передадим данные инпутов 
        const data = {};
        data.email = email;
        data.password = password;
        handleDataForm(data);
    }

    function hendleClick () {
        console.log("Войти?")
        
    }


    return (
        <main className="margin-form-center">
            <Auth
                title='Рады видеть!'
                btnText='Войти'
                titleLink='Ещё не зарегистрированы?'
                textLink='Регистрация'
                link='/signup'
                onClick={hendleClick}
                onSubmit={hendleSubmitForm}>
                <ItemForm
                    label="E-mail"
                    type="email"
                    minLength="2"
                    maxLength="30"
                    placeholder="Введите e-mail"
                    onChange={handleChangeEmail}
                />
                <ItemForm
                    label="Пароль"
                    type="password"
                    minLength="8"
                    maxLength="30"
                    placeholder="Введите пароль"
                    onChange={handleChangePassword}
                />
            </Auth>
        </main>

    )
}
export default Login;