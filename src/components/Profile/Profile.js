import React from "react";
import "./Profile.css";
import ItemFormProfile from "./ItemFormProfile/ItemFormProfile";
import ButtonSave from "./ButtonSave/ButtonSave";
import CurrentUserContext from "../../context/CurrentUserContext";
import { useValidationProfile } from "../../utils/validation";


function Profile(props) {
    const { onClickExit, handleDataForm } = props;

    const {currentUser, name, setName, email, setEmail, nameIsValid, setNameIsValid, emailIsValid, setEmailIsValid, errorMessage, setErrorMessage, errorText, setErrorText, handleInputName, handleInputEmail, displayMessage, validInput} = useValidationProfile();
    // контекст - ловим данные пользователя
    // const currentUser = React.useContext(CurrentUserContext);
    // // стейты для каждого инпута
    // const [name, setName] = React.useState(currentUser.name);
    // const [email, setEmail] = React.useState(currentUser.email);

    // редактировать прфил? 
    const [editProfile, setEditProfile] = React.useState(false);
    // неактивный инпут
    const [disabledInput, setDisabledInput] = React.useState(true);

    // ВАЛИДАЦИЯ
    // // инпуты → изначально невалидны
    // const [nameIsValid, setNameIsValid] = React.useState(false);
    // const [emailIsValid, setEmailIsValid] = React.useState(false);
    // // состояние кнопки
    const [disabledButton, setDisabledButton] = React.useState(true);

    // РЕГУЛЯРКИ - ВЫНЕСТИ!!! 
    // имя
    // const namePattern = /^[a-zA-Zа-яА-Я0-9\s\-_]{2,30}$/;
    // // e-mail
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // // ОШИБКА
    // // есть? 
    // const [errorMessage, setErrorMessage] = React.useState(false);//ошибка
    // // текст
    // const [errorText, setErrorText] = React.useState('текст ошибки');//текст ошибки

    /*     React.useEffect(() => {
            if(currentUser){
                setName(currentUser.name);
                setEmail(currentUser.email);
            }
        }, [currentUser]); */

    React.useEffect(() => {
        // проверяем актуальность валидации при заполнении поля
        // console.log("имя ----------", name)
        // console.log("имейл -----------", email)
        validInput(editProfile)
       /*  if (editProfile) {
            setNameIsValid(namePattern.test(name));
            setEmailIsValid(emailPattern.test(email));
            // console.log("имя валидно?????", nameIsValid)
            // console.log("имейл валиден?????", emailIsValid)
        } */
        // console.log(name, "имя валидно?  ----------", nameIsValid)
        // console.log(email, "имейл валиден? -----------", emailIsValid)
        // console.log("состояние ошибки", errorMessage)
        // setErrorMessage(nameIsValid && emailIsValid)
    }, [editProfile, name, email]);

    React.useEffect(() => {
        displayMessage();
    }, [nameIsValid, emailIsValid, name, email])

    /* function displayMessage () {
        if (nameIsValid && emailIsValid) {
            // console.log("ПОЛЯ ВАЛИДНЫ")
            setErrorMessage(false)
        } else {
            // console.log("ПОЛЯ НЕВАЛИДНЫ")
            setErrorMessage(true)
            !nameIsValid && setErrorText("Поле 'имя' должно быть не менее 2 символов и может содержать только русские, латинские буквы, цифры, тире и нижнее подчеркивание.")
            !emailIsValid && setErrorText("Поле 'email' должно быть заполнено и иметь форму ***@***.**.")
        }
    } */

    // узнаем состояние ошибки - УДАЛИТЬ!!!
   /*  React.useEffect(() => {
        console.log("ошибка активна? ----", errorMessage)
    }, [errorMessage, name, email]) */

    React.useEffect(() => {
        handleDisableButton()
    }, [nameIsValid, emailIsValid, name, email])

    // ОБРАБОТЧИКИ ИНПУТОВ
    // имя
    /* function handleInputName(e) {
        const nameValue = e.target.value;
        setName(nameValue);
        // console.log(name);
    };
    // e-mail
    function handleInputEmail(e) {
        const emailValue = e.target.value;
        setEmail(emailValue);
        console.log(email);
    }; */

    // ОБРАБОТЧИК КНОПКИ 
    function handleDisableButton() {
        if (name === currentUser.name && email === currentUser.email) {
            console.log("ДАННЫЕ НЕ МЕНЯЛИСЬ")
            setDisabledButton(true)
            return
        }
        if (nameIsValid && emailIsValid) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true)
        }
    }
    // проверим, что в стейтах
    React.useEffect(() => {
        console.log(email);
        console.log(name);
    }, [email, name, editProfile]);

    // ОБРАБОТЧИК ФОРМЫ
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("сабмит формы профиля")
        //запишем и передадим данные инпутов
        // console.log(currentUser.email)
        // console.log(currentUser.name)
        const data = {};
        data.email = email || currentUser.email;
        data.name = name || currentUser.name;
        console.log(data)
        await handleDataForm(data);
        //деактивируем форму редактирования
        setEditProfile(false);
        setDisabledButton(true)
    };

    function handleClickEditButton() {
        // console.log("Редактируем");
        setEditProfile(true);
        setDisabledInput(false);
        //console.log(disabledInput);
    };

    return (
        <main className="profile">
            <section className="profile__format-form">
                <div className="profile__format-element">
                    <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                    <form className="profile__form" id="profile" onSubmit={handleSubmit} noValidate>
                        <ItemFormProfile
                            form="profile"
                            labelInput="Имя"
                            placeholder={currentUser.name}
                            value={name || ''}
                            onChange={handleInputName}
                            disabled={disabledInput}
                            typeInput="text"
                            minLength="2" maxLength="30" />
                        <ItemFormProfile
                            form="profile"
                            labelInput="E-mail"
                            placeholder={currentUser.email}
                            value={email || ''}
                            onChange={handleInputEmail}
                            disabled={disabledInput}
                            typeInput="email" />
                    </form>
                </div>
                <div className="profile__format-element">
                    {editProfile ?
                        <>
                            {errorMessage && <span className="profile__form-mistake">{errorText}</span>}
                            <ButtonSave disabled={disabledButton} form="profile" />
                        </> :
                        <>
                            <button type="button" className="profile__buttom hover-effect" onClick={handleClickEditButton}>Редактировать</button>
                            <button type="button" className="profile__buttom profile__buttom_red hover-effect" onClick={onClickExit}>Выйти из аккаунта</button>
                        </>
                    }
                </div>
            </section>
        </main>

    )
};

export default Profile;