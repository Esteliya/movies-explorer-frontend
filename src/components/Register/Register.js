import React from "react";
import "./Register.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm"

function Register(props) {
    const { handleDataForm } = props;

    // переменные состояния email и password
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Обработчики изменения инпута
    // имя 
    function handleChangeName(e) {
        setName(e.target.value);
        // console.log(name)
    }
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
        console.log("сабмит формы регистрации")
        console.log(name)
        console.log(email)
        console.log(password)
        //запишем и передадим данные инпутов 
        const data = {};
        data.name = name;
        data.email = email;
        data.password = password;
        handleDataForm(data);
    }

    function hendleClick() {
        console.log("Зарегистрироваться?")

    }

    return (
        <main className="margin-form-center">
            <Auth
                title='Добро пожаловать!'
                btnText='Зарегистрироваться'
                titleLink='Уже зарегистрированы?'
                textLink='Войти'
                link='/signin'
                onClick={hendleClick}
                onSubmit={hendleSubmitForm}>
                <ItemForm
                    label="Имя"
                    type="text"
                    minLength="2"
                    maxLength="30"
                    placeholder="Введите имя"
                    onChange={handleChangeName}
                />
                <ItemForm
                    label="E-mail"
                    type="email"
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
export default Register;