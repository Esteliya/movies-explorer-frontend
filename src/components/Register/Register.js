import React from "react";
import "./Register.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm";

function Register(props) {
    const { handleDataForm } = props;

    // переменные состояния email и password
    const [name, setName] = React.useState('');
    const [nameErr, setNameErr] = React.useState('');// ошибка 
    const [email, setEmail] = React.useState('');
    const [emailErr, setEmailErr] = React.useState('');//ошибка
    const [password, setPassword] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState('');//ошибка

    // валидация 
    const [isValid, setIsValid] = React.useState(true);

    // регулярки для валидации
    const pattern = {
        name: /^[\p{L}\s-]{2,30}/ui,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^[a-zA-Z0-9_-]{8,}$/,
    };

    React.useEffect(() => {
        setNameErr(nameErr);
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);

        if (name === "" && email === "" && password === "") {
            //console.log("ошибка валидации")
            setIsValid(true);
        } else {
            setIsValid(false);// кнопка активна
        };
    }, [isValid, name, email, password, nameErr, emailErr, passwordErr]);

    // Обработчики изменения инпута
    // имя 
    function handleChangeName(e) {
        const name = e.target.value;
        // console.log(pattern.name.test(name));
        if (pattern.name.test(name)) {
            // console.log("valid name");
            setName(name);
            setNameErr("");
        } else {
            setNameErr('Поле должно быть заполнено. "Имя" может содержать только кириллические и/или латинские буквы, дефис, пробел')
        };
    };
    // имейл 
    function handleChangeEmail(e) {
        const email = e.target.value
        if (pattern.email.test(email)) {
            // console.log("valid email");
            setEmail(email);
            setEmailErr("");
        } else {
            setEmailErr('Поле "email" должно быть заполнено и иметь форму ***@***.**');
        };
        // console.log(email);
    };

    // пароль
    function handleChangePassword(e) {
        const password = e.target.value;
        if (pattern.password.test(password)) {
            // console.log("valid password");
            setPassword(password);
            setPasswordErr("");
        } else {
            setPasswordErr("Пароль должен быть не менее 8 символов и содержать цифру, прописную и строчную буквы.");
        };
        // console.log(password);
    };

    // обработчик формы
    function hendleSubmitForm(e) {
        e.preventDefault();
        if (name === "" && email === "" && password === "") {
            // console.log("ошибка валидации");
            setIsValid(true);
        } else {
            // console.log("поля валидны");
            const data = {};
            data.name = name;
            data.email = email;
            data.password = password;
            handleDataForm(data);
        };
    };

    return (
        <main className="margin-form-center">
            <Auth
                title='Добро пожаловать!'
                btnText='Зарегистрироваться'
                titleLink='Уже зарегистрированы? '
                textLink='Войти'
                link='/signin'
                disabled={isValid}
                onSubmit={hendleSubmitForm}>
                <ItemForm
                    label="Имя"
                    type="text"
                    name="name"
                    minLength="2"
                    maxLength="30"
                    placeholder="Введите имя"
                    onChange={handleChangeName}
                    textError={nameErr}
                />
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

export default Register;