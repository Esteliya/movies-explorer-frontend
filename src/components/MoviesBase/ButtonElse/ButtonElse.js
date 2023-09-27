import './ButtonElse.css'

function ButtonElse(props) {
    const { onClickElse, activeButtonElse } = props;

    // кнопка активаня ? да : нет
    const buutonClasse = activeButtonElse ? "button-else button-else_active hover-effect" : "button-else hover-effect"

    return (
        <button className={buutonClasse} type="button" onClick={onClickElse}>Еще</button>
    )
}
export default ButtonElse;