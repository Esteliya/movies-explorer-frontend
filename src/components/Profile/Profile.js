import React from "react";
import "./Profile.css";
import ItemFormProfile from "./ItemFormProfile/ItemFormProfile";
import ButtonSave from "./ButtonSave/ButtonSave";

import CurrentUserContext from "../../context/CurrentUserContext";

function Profile(props) {
    const { onClickExit, handleDataForm } = props;

    // контекст - ловим данные пользователя
    const currentUser = React.useContext(CurrentUserContext);
    // стейты для каждого инпута
    const [name, setName] = React.useState(currentUser.name);
    const [email, setEmail] = React.useState(currentUser.email);

    // редактировать прфил? 
    const [editProfile, setEditProfile] = React.useState(false);
    // неактивный инпут
    const [disabledInput, setDisabledInput] = React.useState(true);

    // ВАЛИДАЦИЯ
    // инпуты → изначально невалидны
    const [nameIsValid, setNameIsValid] = React.useState(false);
    const [emailIsValid, setEmailIsValid] = React.useState(false);
    // состояние кнопки
    const [disabledButton, setDisabledButton] = React.useState(true);

    // РЕГУЛЯРКИ - ВЫНЕСТИ!!! 
    // имя
    const namePattern = /^[a-zA-Zа-яА-Я0-9\s\-_]{2,30}$/;
    // e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ОШИБКА
    // есть? 
    const [errorMessage, setErrorMessage] = React.useState(false);//ошибка
    // текст
    const [errorText, setErrorText] = React.useState('');//текст ошибки



    React.useEffect(() => {
        // проверяем актуальность валидации при заполнении поля

        if (editProfile) {
            setNameIsValid(namePattern.test(name));
            setEmailIsValid(emailPattern.test(email));
            console.log("имя валидно?????", nameIsValid)
            console.log("имейл валиден?????", emailIsValid)
            /* if (name===currentUser.name && email===currentUser.email) {
                console.log("МЫ ТУТ!!!")
                setDisabledButton(false)
            } else {
                setDisabledButton(nameIsValid || emailIsValid)
            } */
        }
        console.log("имя ----------", name === currentUser.name)
        console.log("имейл -----------", email === currentUser.email)

    }, [currentUser, editProfile, name, email]);

    /*     React.useEffect(() => {
            (nameIsValid || emailIsValid) && setDisabledButton(true)
    
        }, [nameIsValid, emailIsValid]); */

    function handleInputName(e) {
        const name = e.target.value;
        setName(name);
        console.log(name);
        setNameIsValid(namePattern.test(name))
        if (nameIsValid === false) {
            setErrorMessage(true)
            setErrorText("Поле 'имя' должно быть не менее 2 символов и может содержать только русские, латинские буквы, цифры, тире и нижнее подчеркивание.")
        } else {
            setErrorMessage(false)
        }
    };

    function handleInputEmail(e) {
        const email = e.target.value;
        setEmail(email);
        console.log(email);
        setEmailIsValid(emailPattern.test(email));
        if (emailIsValid === false) {
            setErrorMessage(true)
            setErrorText("Поле 'email' должно быть заполнено и иметь форму ***@***.**.")
        } else {
            setErrorMessage(false)
        }
    };

    React.useEffect(() => {
        handleDisableButton()
    }, [nameIsValid, emailIsValid])

    // обработка кнопки 
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

    //обработчик формы
    function handleSubmit(e) {
        e.preventDefault();
        // console.log("сабмит формы профиля")
        //запишем и передадим данные инпутов 
        const data = {};
        data.email = email || currentUser.email;
        data.name = name || currentUser.name;
        handleDataForm(data);
        //деактивируем форму редактирования
        setEditProfile(false);

    };

    function handleClickSave() {
        // console.log("Сохраняем");
        // setEditProfile(false);
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
                            <ButtonSave onClick={handleClickSave} disabled={disabledButton} form="profile" />
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