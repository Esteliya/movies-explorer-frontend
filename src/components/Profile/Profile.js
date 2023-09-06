import React from "react";
import "./Profile.css";
import ItemFormProfile from "./ItemFormProfile/ItemFormProfile";
import ButtonSave from "./ButtonSave/ButtonSave";

function Profile(props) {
    const { onClickExit } = props;

    const [editProfile, setEditProfile] = React.useState(false);

    const [inputChange, setInputChange] = React.useState('');

    const [disabledInput, setDisabledInput] = React.useState(true);

    function handleInputChange(e) {
        setInputChange(e.target.value);
        console.log(inputChange);
    }

    function handleClickSave() {
        console.log("Сохраняем");
        setEditProfile(false);
    }

    function handleClickEditButton () {
        console.log("Редактируем");
        setEditProfile(true);
        setDisabledInput(false)
        console.log(disabledInput);
    }

    return (
        <main className="profile">
            <div className="profile__format-form">
                <div className="profile__format-element">
                    <h1 className="profile__title">Привет, Виталий!</h1>
                    <form className="profile__form">
                        <ItemFormProfile labelInput="Имя" placeholder="Виталий" onChange={handleInputChange} disabled={disabledInput}/>
                        <ItemFormProfile labelInput="E-mail" placeholder="pochta@yandex.ru" onChange={handleInputChange} disabled={disabledInput} />
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
            </div>
        </main>

    )
}
export default Profile;