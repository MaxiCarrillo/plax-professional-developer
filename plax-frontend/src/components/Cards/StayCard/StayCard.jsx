import './StayCard.css';

export const StayCard = ({stay}) => {
    const {id, name, images, address, price} = stay;
    return (
        <a href="">
            <article className='stayCard__container'>
                <figure>
                    <img src={images[0]} alt="Hotel" height={250} width={250} />
                </figure>
                <div className='stayCard__info'>
                    <h3 className='stayCard__titulo'>{name}</h3>
                    <p>{address}</p>
                    <p className='stayCard___score'><span>9.1</span>10 comentarios</p>
                    <p className='stayCard__price'><small>1 noche</small><strong>${price}</strong></p>
                </div>
            </article>
        </a>
    )
}
