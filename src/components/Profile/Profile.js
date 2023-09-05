import React from "react";
import "./Profile.css";
import ButtonSave from "./ButtonSave/ButtonSave";

function Profile(props) {
    const { onClickExit } = props;

    const [editProfile, setEditProfile] = React.useState(false);

    const [inputChange, setInputChange] = React.useState('');


    function handleClickEdit() {
        console.log("Редактируем");
        setEditProfile(true);
    }

    function handleInputChange(e) {
        setInputChange(e.target.value);
        console.log(inputChange);
    }

    function handleClickSave() {
        console.log("Сохраняем");
        setEditProfile(false);
    }

    return (
        <section className="profile">
            <div className="profile__format-form">
                <div className="profile__format-element">
                    <h1 className="profile__title">Привет, Виталий!</h1>
                    <ul className="profile__list">
                        <li className="profile__item">
                            <h2 className="profile__item-title">Имя</h2>
                            {!editProfile && <p className="profile__item-content">Виталий</p>}
                            {editProfile && <input className="profile__input" placeholder="Виталий" onChange={handleInputChange}></input>}
                        </li>
                        <li className="profile__item">
                            <h2 className="profile__item-title">E-mail</h2>
                            {!editProfile && <p className="profile__item-content">pochta@yandex.ru</p>}
                            {editProfile && <input className="profile__input" placeholder="pochta@yandex.ru" onChange={handleInputChange}></input>}
                        </li>
                    </ul>
                </div>
                <div className="profile__format-element">
                    {!editProfile &&
                        <>
                            <button className="profile__buttom" type="button" onClick={handleClickEdit}>Редактировать</button>
                            <button className="profile__buttom profile__buttom_red" type="button" onClick={onClickExit}>Выйти из аккаунта</button>
                        </>}
                    {editProfile && <ButtonSave onClick={handleClickSave} />}
                </div>
            </div>
        </section>

    )
}
export default Profile;