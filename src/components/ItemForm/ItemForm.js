import "./ItemForm.css"
import "../../mixStile/focusEffect.css";


function ItemForm(props) {
    const { label, type, placeholder, minLength, maxLength, onChange } = props;

    return (
        <fieldset className="item-form">
            <label className="item-form__label">{label}</label>
            <input className="item-form__input focus-effect" type={type} required placeholder={placeholder} minLength={minLength} maxLength={maxLength}  onChange={onChange}></input>
            <span className="item-form__mistake">Тестовый текст ошибки. Много-много-много-много-много-много-много очень много текста</span>
        </fieldset>

    )
}
export default ItemForm;