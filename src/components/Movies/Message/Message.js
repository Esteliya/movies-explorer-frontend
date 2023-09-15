import "./Message.css";

function Message(props) {
    const { text } = props;
    return (
        <section className="message">
            <p className="message__text">{text}</p>
        </section>
    )
}
export default Message;