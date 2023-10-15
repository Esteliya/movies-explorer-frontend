import React from "react";
import "./Register.css"
import "../../mixStile/formatForm.css";
import Auth from "../Auth/Auth";
import ItemForm from "../ItemForm/ItemForm";
import { useValidationUserForm } from "../../utils/validation";

function Register(props) {
    const { handleDataForm, process } = props;

    const { name, setName, nameErr, setNameErr, email, setEmail, emailErr, setEmailErr, password, setPassword, passwordErr, setPasswordErr, isValid, setIsValid, handleChangeName, handleChangeEmail, handleChangePassword } = useValidationUserForm();

    React.useEffect(() => {
        setNameErr(nameErr);
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);

        if (name === "" || email === "" || password === "") {
            setIsValid(false);
        } else {
            setIsValid(true);// кнопка активна
        };
    }, [name, email, password]);

    // обработчик формы
    function hendleSubmitForm(e) {
        e.preventDefault();
        // console.log("поля валидны");
        const data = {};
        data.name = name;
        data.email = email;
        data.password = password;
        handleDataForm(data);
    };

    return (
        <main className="margin-form-center">
            <Auth
                title='Добро пожаловать!'
                nameForm='Зарегистрироваться'
                btnText={process ? 'Регистрация...' : 'Зарегистрироваться'}
                titleLink='Уже зарегистрированы? '
                textLink='Войти'
                link='/signin'
                isValid={process ? false : isValid}
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