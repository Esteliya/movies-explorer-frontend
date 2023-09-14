import React from "react";
import "./Profile.css";
import ItemFormProfile from "./ItemFormProfile/ItemFormProfile";
import ButtonSave from "./ButtonSave/ButtonSave";

function Profile(props) {
    const { onClickExit } = props;

    const [editProfile, setEditProfile] = React.useState(false);

    // const [inputChange, setInputChange] = React.useState('');
    // стейты для каждогго инпута
    const [inputName, setInputName] = React.useState('');
    const [inputEmail, setInputEmail] = React.useState('');

    const [disabledInput, setDisabledInput] = React.useState(true);

    function handleInputName(e) {
        setInputName(e.target.value);
        console.log(inputName);
    }

    function handleInputEmail(e) {
        setInputEmail(e.target.value);
        console.log(inputEmail);
    }

    function handleClickSave() {
        console.log("Сохраняем");
        setEditProfile(false);
    }

    function handleClickEditButton() {
        console.log("Редактируем");
        setEditProfile(true);
        setDisabledInput(false)
        console.log(disabledInput);
    }

    return (
        <main className="profile">
            <section className="profile__format-form">
                <div className="profile__format-element">
                    <h1 className="profile__title">Привет, Виталий!</h1>
                    <form className="profile__form">
                        <ItemFormProfile labelInput="Имя" placeholder="Виталий" onChange={handleInputName} disabled={disabledInput} typeInput="text"minLength="2" maxLength="30"/>
                        <ItemFormProfile labelInput="E-mail" placeholder="pochta@yandex.ru" onChange={handleInputEmail} disabled={disabledInput} typeInput="email"/>
                    </form>
                </div>
                <div className="profile__format-element">
                    {!editProfile &&
                        <>
                            <button type="button" className="profile__buttom hover-effect" onClick={handleClickEditButton}>Редактировать</button>
                            <button type="button" className="profile__buttom profile__buttom_red hover-effect" onClick={onClickExit}>Выйти из аккаунта</button>
                        </>}
                    {editProfile &&
                        <>
                            <span className="profile__form-mistake">Тестовый текст ошибки. Много-много-много-много-много-много-много очень много текста</span>
                            <ButtonSave onClick={handleClickSave} />
                        </>}
                </div>
            </section>
        </main>

    )
}
export default Profile;