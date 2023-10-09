import React from "react";
import "./Login.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm";

function Login(props) {
    const { handleDataForm } = props;

    // переменные состояния email и password
    const [email, setEmail] = React.useState('');
    const [emailErr, setEmailErr] = React.useState('');//ошибка
    const [password, setPassword] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState('');//ошибка

    // валидация 
    const [isValid, setIsValid] = React.useState(true);

    // регулярки для валидации
    const pattern = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^[a-zA-Z0-9_-]{8,}$/,
    };

    React.useEffect(() => {
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);

        if (email === "" && password === "") {
            //console.log("ошибка валидации")
            setIsValid(true)
        } else {
            setIsValid(false)// кнопка активна
        };
    }, [isValid, email, password, emailErr, passwordErr]);

    // Обработчики изменения инпута
    // имейл 
    function handleChangeEmail(e) {
        const email = e.target.value
        if (pattern.email.test(email)) {
            //console.log("valid email")
            setEmail(email);
            setEmailErr("");
        } else {
            setEmailErr('Поле "email" должно быть заполнено и иметь форму ***@***.**');
        };
    };

    // пароль
    function handleChangePassword(e) {
        const password = e.target.value
        if (pattern.password.test(password)) {
            //console.log("valid password")
            setPassword(password);
            setPasswordErr("");
        } else {
            setPasswordErr("Пароль должен быть не менее 8 символов и содержать цифру, прописную и строчную буквы.");
        };
    };

    // обработчик формы
    function hendleSubmitForm(e) {
        e.preventDefault();
        if (email === "" && password === "") {
            //console.log("ошибка валидации")
            setIsValid(true);
        } else {
            // console.log("поля валидны")
            const data = {};
            data.email = email;
            data.password = password;
            handleDataForm(data);
        };
    };

    return (
        <main className="margin-form-center">
            <Auth
                title='Рады видеть!'
                btnText='Войти'
                titleLink='Ещё не зарегистрированы? '
                textLink='Регистрация'
                link='/signup'
                onSubmit={hendleSubmitForm}>
                <ItemForm
                    label="E-mail"
                    type="email"
                    name="email"
                    placeholder="Введите e-mail"
                    onChange={handleChangeEmail}
                    textError={emailErr}
                />
                <ItemForm
                    label="Пароль"
                    type="password"
                    name="password"
                    minLength="8"
                    maxLength="30"
                    placeholder="Введите пароль"
                    onChange={handleChangePassword}
                    textError={passwordErr}
                />
            </Auth>
        </main>
    )
};

export default Login;