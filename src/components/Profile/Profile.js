import "./Profile.css";

function Profile(props) {
    const { onClickExit } = props;

    return (
        <section className="profile">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <ul className="profile__list">
                <li className="profile__item">
                    <h2 className="profile__item-title">Имя</h2>
                    <p className="profile__item-content">Виталий</p>
                </li>
                <li className="profile__item">
                    <h2 className="profile__item-title">E-mail</h2>
                    <p className="profile__item-content">pochta@yandex.ru</p>
                </li>
            </ul>
            <button className="profile__buttom" type="button">Редактировать</button>
            <button className="profile__buttom profile__buttom_red" type="button" onClick={onClickExit}>Выйти из аккаунта</button>
        </section>

    )
}
export default Profile;