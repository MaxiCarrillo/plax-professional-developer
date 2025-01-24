import { StarFilled } from '@ant-design/icons'
import React from 'react'
import './ReviewCard.css'
import { format } from 'date-fns'

const stars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<StarFilled key={i} />);
    }
    return stars;
}


export const ReviewCard = ({ review }) => {

    return (
        <article className='ReviewCard__container'>
            <header className='ReviewCard__header'>
                <div className='ReviewCard__user'>
                    <div className='ReviewCard__avatar'>{review.user.firstname[0]}{review.user.lastname[0]}</div>
                    <p className='ReviewCard__stars'>
                        {stars(review.qualification)}
                    </p>
                </div>
                <div className='ReviewCard__info'>
                    <p>{review.user.firstname} {review.user.lastname}</p>
                    <p>{format(review.createdAt, 'dd/MM/yyyy - HH:mm')}</p>
                </div>
            </header>
            <p className='ReviewCard__comment'>{review.comment ?? "No ha agregado un comentario."}</p>
        </article>
    )
}
