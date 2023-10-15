import React from "react";
import "./Login.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm";
import { useValidationUserForm } from "../../utils/validation";

function Login(props) {
    const { handleDataForm, process } = props;

    const { email, setEmail, emailErr, setEmailErr, password, setPassword, passwordErr, setPasswordErr, isValid, setIsValid, handleChangeEmail, handleChangePassword } = useValidationUserForm();

    React.useEffect(() => {
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);

        if (email === "" || password === "") {
            setIsValid(false)
        } else {
            setIsValid(true)// кнопка активна
        };
    }, [email, password]);

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
                btnText={process ? 'Авторизация...' : 'Войти'}
                nameForm='Войти'
                titleLink='Ещё не зарегистрированы? '
                textLink='Регистрация'
                link='/signup'
                onSubmit={hendleSubmitForm}
                isValid={process ? false : isValid}>
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