import "./ItemForm.css"


function ItemForm(props) {
    const { titleInput } = props;

    return (
        <article className="item-form">
            <h2 className="item-form__title">{titleInput}</h2>
            <input className="item-form__input"></input>
            <span className="item-form__mistake">Тестовый текст ошибки. Много-много-много-много-много-много-много очень много текста</span>
        </article>

    )
}
export default ItemForm;