import { CopyOutlined, FacebookFilled, WhatsAppOutlined, XOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { NotificationContext } from "../../../core/context/notificationContext";
import './StayShare.css';

export const StayShare = ({ stay }) => {

    const [message, setMessage] = useState("¡Mira esta estancia increíble!");
    const { toaster } = useContext(NotificationContext);

    const shareStay = (platform) => {
        const url = window.location.href;
        let shareLink;
        if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            toaster['success']({
                message: 'Enlace copiado',
                description: 'El enlace de la estancia ha sido copiado al portapapeles.',
                duration: 2
            })
            return;
        }
        if (platform === 'facebook') {
            shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        }
        if (platform === 'whatsapp') {
            const encodedMessage = encodeURIComponent(`${message} ${url}`);
            shareLink = `https://web.whatsapp.com/send?text=${encodedMessage}`;
        }
        if (platform === 'twitter') {
            shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${message}`;
        }
        window.open(shareLink, '_blank');
    }

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <section className="stayShare__container">
            <h1>¡Compartir estancia!</h1>
            <figure className="stayShare__figure">
                <img src={stay?.images[0]} alt={stay?.name} width={50} height={50} />
                <figcaption>{stay?.name}</figcaption>
            </figure>
            <form className="form__container">
                <label htmlFor="text" className="form__label" aria-labelledby="text">
                    <textarea
                        name="text"
                        id="text"
                        rows="4"
                        placeholder="Escribe un mensaje para compartir la estancia"
                        onChange={handleOnChange}
                        value={message}
                    />
                </label>

            </form>
            <div className="stayShare__social-networks">
                <button className="button button--outline" onClick={() => shareStay('copy')}>
                    <CopyOutlined />
                    Copiar enlace
                </button>
                <button className="button button--outline" onClick={() => shareStay('whatsapp')}>
                    <WhatsAppOutlined />
                    Whatsapp
                </button>
                <button className="button button--outline" onClick={() => shareStay('twitter')}>
                    <XOutlined />
                    Twitter
                </button>
                <button className="button button--outline" onClick={() => shareStay('facebook')}>
                    <FacebookFilled />
                    Facebook
                </button>
            </div>
        </section>
    )
}
