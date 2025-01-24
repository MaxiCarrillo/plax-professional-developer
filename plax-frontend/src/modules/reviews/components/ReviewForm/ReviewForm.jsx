import { LoadingOutlined, SendOutlined, StarFilled } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormModalContext } from '../../../core/context';
import { NotificationContext } from '../../../core/context/notificationContext';
import { useReview } from '../../hooks/useReview';
import './ReviewForm.css';

export const ReviewForm = ({ reservation, onRefetch }) => {

    const { toaster } = useContext(NotificationContext);
    const { createReview, isLoading } = useReview();
    const { handleCancel } = useContext(FormModalContext);

    const formik = useFormik({
        initialValues: {
            qualification: 0,
            comment: ''
        },
        validationSchema: Yup.object({
            qualification: Yup.number().required('La calificación es obligatoria').min(1, 'La calificación minima es 1').max(5, 'La calificación maxima es 5'),
            comment: Yup.string()
        }),
        onSubmit: async (values) => {
            const body = {
                id_reservation: reservation.id,
                id_stay: reservation.stay.id,
                ...values
            }
            try {
                await createReview(body);
                formik.resetForm();
                toaster['success']({
                    message: 'Opinión enviada',
                    description: 'Gracias por enviar tu opinión',
                    duration: 3
                });
                onRefetch();
            } catch (error) {
                toaster['error']({
                    message: 'Error al enviar la opinión',
                    description: error.message,
                    duration: 3
                });
            } finally {
                handleCancel();
            }

        }
    })

    return (
        <>
            <h1 className='reviewForm__title'>Califica está estancia</h1>
            <form className="reviewForm__form" onSubmit={formik.handleSubmit}>
                <div className='reviewform__rating-container'>
                    <div className='reviewForm__rating'>
                        <input
                            type="radio"
                            id='one'
                            value={1}
                            name='qualification'
                            hidden
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="one">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                    <div className='reviewForm__rating'>
                        <input type="radio" id='two' value={2} name='qualification' hidden onChange={formik.handleChange} />
                        <label htmlFor="two">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                    <div className='reviewForm__rating'>
                        <input type="radio" id='three' value={3} name='qualification' hidden onChange={formik.handleChange} />
                        <label htmlFor="three">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                    <div className='reviewForm__rating'>
                        <input type="radio" id='four' value={4} name='qualification' hidden onChange={formik.handleChange} />
                        <label htmlFor="four">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                    <div className='reviewForm__rating'>
                        <input type="radio" id='five' value={5} name='qualification' hidden onChange={formik.handleChange} />
                        <label htmlFor="five">
                            <StarFilled className='icon' />
                        </label>
                    </div>
                </div>
                <div className='form__container'>
                    <label htmlFor="comment" className="form__label">Opinión (opcional)
                        <textarea
                            id='comment'
                            name='comment'
                            placeholder='Escribe aquí tu opinión'
                            rows={5}
                            value={formik.values.comment}
                            onChange={formik.handleChange}
                        />
                    </label>
                </div>
                <div>
                    <button type='submit' className='button button--primary' disabled={!formik.isValid || !formik.dirty || isLoading}>
                        {isLoading ? <LoadingOutlined /> : <SendOutlined />}
                        Enviar opinión
                    </button>
                </div>
            </form>
        </>
    )
}
