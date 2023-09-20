import './ButtonElse.css'

function ButtonElse(props) {
    const { onClickElse } = props;
    return (
        <button className="button-else hover-effect" type="button" onClick={onClickElse}>Еще</button>
    )
}
export default ButtonElse;