import "./ItemForm.css"


function ItemForm(props) {
    const { titleInput } = props;

    return (
        <fieldset className="item-form">
            <label className="item-form__title">{titleInput}</label>
            <input className="item-form__input"></input>
            <span className="item-form__mistake">Тестовый текст ошибки. Много-много-много-много-много-много-много очень много текста</span>
        </fieldset>

    )
}
export default ItemForm;