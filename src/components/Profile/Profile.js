import React from "react";
import "./Profile.css";
import ItemFormProfile from "./ItemFormProfile/ItemFormProfile";
import ButtonSave from "./ButtonSave/ButtonSave";
import { useValidationProfile } from "../../utils/validation";


function Profile(props) {
    const { onClickExit, handleDataForm } = props;

    const { currentUser, name, setName, email, setEmail, nameIsValid, setNameIsValid, emailIsValid, setEmailIsValid, errorMessage, setErrorMessage, errorText, setErrorText, handleInputName, handleInputEmail, displayMessage, validInput } = useValidationProfile();

    // редактировать прфил? 
    const [editProfile, setEditProfile] = React.useState(false);
    // неактивный инпут
    const [disabledInput, setDisabledInput] = React.useState(true);
    // // состояние кнопки
    const [disabledButton, setDisabledButton] = React.useState(true);

    React.useEffect(() => {
        validInput(editProfile);
    }, [editProfile, name, email]);

    React.useEffect(() => {
        displayMessage();
    }, [nameIsValid, emailIsValid, name, email]);

    React.useEffect(() => {
        handleDisableButton()
    }, [nameIsValid, emailIsValid, name, email]);

    // ОБРАБОТЧИК КНОПКИ 
    function handleDisableButton() {
        if (name === currentUser.name && email === currentUser.email) {
            // console.log("ДАННЫЕ НЕ МЕНЯЛИСЬ");
            setDisabledButton(true);
            return;
        };
        if (nameIsValid && emailIsValid) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        };
    };
    // проверим, что в стейтах
    React.useEffect(() => {
        console.log(email);
        console.log(name);
    }, [email, name, editProfile]);

    // ОБРАБОТЧИК ФОРМЫ
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        data.email = email || currentUser.email;
        data.name = name || currentUser.name;
        console.log(data);
        await handleDataForm(data);
        //деактивируем форму редактирования
        setEditProfile(false);
        setDisabledButton(true);
    };

    function handleClickEditButton() {
        setEditProfile(true);
        setDisabledInput(false);
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