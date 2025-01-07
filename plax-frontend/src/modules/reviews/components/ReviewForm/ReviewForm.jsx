import { StarFilled, StarOutlined } from '@ant-design/icons';
import './ReviewForm.css';

export const ReviewForm = ({ reservation }) => {
    return (
        <>
            <h1 className='reviewForm__title'>Califica está estancia</h1>
            <form className="reviewForm__form">
                <div className='reviewform__rating-container'>
                    <div className='reviewForm__rating'>
                        <input type="radio" id='one' value={1} name='appreciation' hidden />
                        <label htmlFor="one">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                    <div className='reviewForm__rating'>
                        <input type="radio" id='two' value={2} name='appreciation' hidden />
                        <label htmlFor="two">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                    <div className='reviewForm__rating'>
                        <input type="radio" id='three' value={3} name='appreciation' hidden />
                        <label htmlFor="three">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                    <div className='reviewForm__rating'>
                        <input type="radio" id='four' value={4} name='appreciation' hidden />
                        <label htmlFor="four">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                    <div className='reviewForm__rating'>
                        <input type="radio" id='five' value={5} name='appreciation' hidden />
                        <label htmlFor="five">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                </div>
                <div className='form__container'>
                    <label htmlFor="comment" className="form__label">Opinión (opcional)
                        <textarea id='comment' name='comment' placeholder='Escribe aquí tu opinión' rows={5} />
                    </label>
                </div>
                <div>
                    <button className='button button--primary'>Enviar opinión</button>
                </div>
            </form>
        </>
    )
}
