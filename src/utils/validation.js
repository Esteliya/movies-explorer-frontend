import React from 'react';

// роуты с фильмами 
// фалидация строки поиска + выдача сообщения 
function useValidationSearchForm () {
    const [isValid, setIsValid] = React.useState(true);
    // показать ошибку если данные невалидны
    const [showError, setShowError] = React.useState(false);
    // текст ошибки
    const [isTextError, setIsTextError] = React.useState('Результат запрса уже на странице. Задайте новые параметры поиска.');
    // текущая строка поиска
    const [currentQuery, setCurrentQuery] = React.useState("");

    function handleQuery (query, stateQuery) {
        if (query === "") {
            // console.log("Пустая строка");
            setIsValid(false);
            setIsTextError("Введите текст запроса");
            return;
        };
        // посвторный запрос 
        if (query === stateQuery) {
            // console.log("Повторный запрос");
            setIsValid(false);
            setIsTextError("Результат запроса уже на странице");
            return;
        };
    };

    return {isValid, setIsValid, showError, setShowError, isTextError, setIsTextError, currentQuery, setCurrentQuery, handleQuery};
};

// валидация формы регистрации/ авторизации 
function useValidationUserForm () {
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
        // name: /^[\p{L}\s-]{2,30}/ui,
        name: /^[a-zA-Zа-яА-Я0-9\s\-_]{2,30}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^[a-zA-Z0-9_-]{8,}$/,
    };

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

    return {name, setName, nameErr, setNameErr, email, setEmail, emailErr, setEmailErr, password, setPassword, passwordErr, setPasswordErr, isValid, setIsValid, pattern, handleChangeName, handleChangeEmail, handleChangePassword};
}

// валидация редактирования данных пользователя 


// ЭКСПОРТ
export {
    useValidationSearchForm,
    useValidationUserForm,
};