import React from "react";
import "./Login.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm";
import { useValidationUserForm } from "../../utils/validation";

function Login(props) {
    const { handleDataForm } = props;

    const { email, setEmail, emailErr, setEmailErr, password, setPassword, passwordErr, setPasswordErr, isValid, setIsValid, handleChangeEmail, handleChangePassword } = useValidationUserForm();

    React.useEffect(() => {
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);

        if (email === "" || password === "") {
            //console.log("ошибка валидации")
            setIsValid(false)
        } else {
            setIsValid(true)// кнопка активна
        };
    }, [isValid, email, password, emailErr, passwordErr]);

    // обработчик формы
    function hendleSubmitForm(e) {
        e.preventDefault();
        // console.log("поля валидны")
        const data = {};
        data.email = email;
        data.password = password;
        handleDataForm(data);
    };

    return (
        <main className="margin-form-center">
            <Auth
                title='Рады видеть!'
                btnText='Войти'
                titleLink='Ещё не зарегистрированы? '
                textLink='Регистрация'
                link='/signup'
                onSubmit={hendleSubmitForm}
                isValid={isValid}>
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