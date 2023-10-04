import './InfoTooltip.css'
import iconFalse from '../../images/icon-false.svg'
import iconTrue from '../../images/icon-true.svg'

function InfoTooltip(props) {
  const { isOpen, onClose, res, text } = props;

  const popupClass = isOpen ? ('info-popup info-popup_open') : ('info-popup');


  return (
    <div className={popupClass}>
      <div className="info-popup__container">
        <div className="info-popup__icon" style={{ backgroundImage: `url(${res ? iconTrue : iconFalse})` }} />
        <p className="info-popup__content">{text}</p>
        <button type="button" aria-label="Закрыть." className="info-popup__close-button" onClick={onClose} />
      </div>
    </div>
  )

}

export default InfoTooltip;