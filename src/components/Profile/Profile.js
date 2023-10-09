import React from "react";
import "./Profile.css";
import ItemFormProfile from "./ItemFormProfile/ItemFormProfile";
import ButtonSave from "./ButtonSave/ButtonSave";

import CurrentUserContext from "../../context/CurrentUserContext";

function Profile(props) {
    const { onClickExit, handleDataForm } = props;

    // контекст - ловим данные пользователя
    const currentUser = React.useContext(CurrentUserContext);

    const [disabledButton, setDisabledButton] = React.useState(true);

    const [editProfile, setEditProfile] = React.useState(false);
    // стейты для каждого инпута
    const [name, setName] = React.useState(currentUser.name);
    const [email, setEmail] = React.useState(currentUser.email);

    const [disabledInput, setDisabledInput] = React.useState(true);

    React.useEffect(() => {
    }, [currentUser]);

    function handleInputName(e) {
        setName(e.target.value);
        // console.log(name);
    };

    function handleInputEmail(e) {
        setEmail(e.target.value);
        // console.log(email);
    };

    //обработчик формы
    function handleSubmit(e) {
        e.preventDefault();
        // console.log("сабмит формы профиля")
        //запишем и передадим данные инпутов 
        const data = {};
        data.email = email || currentUser.email;
        data.name = name || currentUser.name;
        // console.log(data)
        handleDataForm(data);
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
                    <form className="profile__form" id="profile" onSubmit={handleSubmit}>
                        <ItemFormProfile form="profile" labelInput="Имя" placeholder={currentUser.name} value={name || ''} onChange={handleInputName} disabled={disabledInput} typeInput="text" minLength="2" maxLength="30" />
                        <ItemFormProfile form="profile" labelInput="E-mail" placeholder={currentUser.email} value={email || ''} onChange={handleInputEmail} disabled={disabledInput} typeInput="email" />
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
                            <ButtonSave onClick={handleClickSave} disabled={disabledButton} form="profile" />
                        </>}
                </div>
            </section>
        </main>

    )
};

export default Profile;