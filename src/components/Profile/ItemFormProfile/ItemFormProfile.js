import "./ItemFormProfile.css"


function ItemFormProfile(props) {
    const { labelInput, placeholder, onChange, disabled } = props;

    return (
        <fieldset className="item-form-profile">
            <label className="item-form-profile__label" >{labelInput}</label>
            <input className="item-form-profile__input" disabled={disabled} placeholder={placeholder} onChange={onChange}></input>
        </fieldset>

    )
}
export default ItemFormProfile;