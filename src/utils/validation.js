import React from 'react';
import CurrentUserContext from "../context/CurrentUserContext";
// константы текста ошибок
import { SEND_TEXT, END_RESULT, ENTER_NAME, ENTER_EMAIL, ENTER_PASSWORD } from "../utils/constants";

// ПАТТЕРН ВАЛИДАЦИИ
const pattern = {
    // name: /^[\p{L}\s-]{2,30}/ui,
    name: /^[a-zA-Zа-яА-Я0-9\s\-_]{2,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^[a-zA-Z0-9_-]{8,}$/,
};

// РОУТЫ С ФИЛЬМАМИ 
// фалидация строки поиска + выдача сообщения 
function useValidationSearchForm() {
    const [isValid, setIsValid] = React.useState(true);
    // показать ошибку если данные невалидны
    const [showError, setShowError] = React.useState(false);
    // текст ошибки
    const [isTextError, setIsTextError] = React.useState("");
    // текущая строка поиска
    const [currentQuery, setCurrentQuery] = React.useState("");

    function handleQuery(query, startQuery, isChecked, newIsChecked) {
        if (query === "") {
            setIsValid(false);
            setIsTextError(SEND_TEXT);
            return;
        };
        // посвторный запрос 
        if (query === startQuery && isChecked === newIsChecked) {
            setIsValid(false);
            setIsTextError(END_RESULT);
            return;
        };
    };

    return { isValid, setIsValid, showError, setShowError, isTextError, setIsTextError, currentQuery, setCurrentQuery, handleQuery };
};

// ФОРМЫ ПОЛЬЗОВАТЕЛЯ
// валидация формы регистрации/ авторизации 
function useValidationUserForm() {

    // переменные состояния email и password
    const [name, setName] = React.useState('');
    const [nameErr, setNameErr] = React.useState(''); 
    const [email, setEmail] = React.useState('');
    const [emailErr, setEmailErr] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState('');

    // валидация 
    const [isValid, setIsValid] = React.useState(true);

    // имя
    function handleChangeName(e) {
        const name = e.target.value;
        if (pattern.name.test(name)) {
            setName(name);
            setNameErr("");
        } else {
            setNameErr(ENTER_NAME);
        };
    };

    // имейл 
    function handleChangeEmail(e) {
        const email = e.target.value
        if (pattern.email.test(email)) {
            setEmail(email);
            setEmailErr("");
        } else {
            setEmailErr(ENTER_EMAIL);
        };
    };

    // пароль
    function handleChangePassword(e) {
        const password = e.target.value;
        if (pattern.password.test(password)) {
            setPassword(password);
            setPasswordErr("");
        } else {
            setPasswordErr(ENTER_PASSWORD);
        };
    };

    return { name, setName, nameErr, setNameErr, email, setEmail, emailErr, setEmailErr, password, setPassword, passwordErr, setPasswordErr, isValid, setIsValid, handleChangeName, handleChangeEmail, handleChangePassword };
}

// валидация редактирования данных пользователя 
function useValidationProfile() {

    // контекст - ловим данные пользователя
    const currentUser = React.useContext(CurrentUserContext);
    // стейты для каждого инпута
    const [name, setName] = React.useState(currentUser.name);
    const [email, setEmail] = React.useState(currentUser.email);
    // инпуты → изначально невалидны
    const [nameIsValid, setNameIsValid] = React.useState(false);
    const [emailIsValid, setEmailIsValid] = React.useState(false);
    // ошибка есть? 
    const [errorMessage, setErrorMessage] = React.useState(false);
    // текст ошибки
    const [errorText, setErrorText] = React.useState('текст ошибки');

    // ОБРАБОЧИКИ ИНПУТОВ
    // имя
    function handleInputName(e) {
        const nameValue = e.target.value;
        setName(nameValue);
    };

    // e-mail
    function handleInputEmail(e) {
        const emailValue = e.target.value;
        setEmail(emailValue);
        console.log(email);
    };

    // отобразим сообщение
    function displayMessage() {
        if (nameIsValid && emailIsValid) {
            setErrorMessage(false);
        } else {
            setErrorMessage(true)
            !nameIsValid && setErrorText(ENTER_NAME);
            !emailIsValid && setErrorText(ENTER_EMAIL);
        };
    };

    function validInput(editProfile) {
        if (editProfile) {
            setNameIsValid(pattern.name.test(name));
            setEmailIsValid(pattern.email.test(email));
        };
    };

    return { currentUser, name, setName, email, setEmail, nameIsValid, setNameIsValid, emailIsValid, setEmailIsValid, errorMessage, setErrorMessage, errorText, setErrorText, handleInputName, handleInputEmail, displayMessage, validInput };
};

// ЭКСПОРТ
export {
    useValidationSearchForm,
    useValidationUserForm,
    useValidationProfile,
};