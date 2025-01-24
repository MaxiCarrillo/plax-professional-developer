import { CloseOutlined, EditOutlined, Loading3QuartersOutlined, SaveFilled } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../../auth/context/AuthContext';
import { useUser } from '../../../users/hooks/useUser';
import { NotificationContext } from '../../context/notificationContext';
import './Profile.css';

export const Profile = () => {

    const [edit, setEdit] = useState(false);
    const { updateName, loading } = useUser();
    const { user, updateUser } = useAuth();
    const { toaster } = useContext(NotificationContext);

    const form = useFormik({
        initialValues: {
            firstname: user.firstname,
            lastname: user.lastname
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('El nombre es obligatorio'),
            lastname: Yup.string().required('El apellido es obligatorio')
        }),
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const response = await updateName(values);
                toaster['success']({
                    message: 'Nombre actualizado correctamente.',
                    description:
                        'El nombre se ha actualizado correctamente.',
                    duration: 3
                });
                updateUser(response);
                setEdit(false);
            } catch (error) {
                console.error(error);
                toaster['error']({
                    message: 'No se pudo actualizar el nombre.',
                    description:
                        'Por favor, intente nuevamente más tarde.',
                    duration: 3
                });
                return;
            }
        }
    })

    return (
        <main className='profile__container'>
            <button type="button" className='button button--outline' onClick={() => setEdit(!edit)}>{edit ? <><CloseOutlined />Cancelar</> : <><EditOutlined />Editar</>}</button>
            <section className='profile__info'>
                <figure>
                    {
                        user.avatar ?
                            <img src={user.avatar} alt="Avatar" /> :
                            <p>{user.firstname[0]}{user.lastname[0]}</p>
                    }
                </figure>
                <h1>{user.email}</h1>
                <p>{user.role}</p>
            </section>
            <hr className='separator' />
            <form className='profile__form' onSubmit={form.handleSubmit}>
                <div className='form__container'>
                    <label className='form__label'>Nombre
                        <input type="text" name='firstname' value={form.values.firstname} onChange={form.handleChange} disabled={!edit} />
                    </label>
                    {
                        (form.errors.firstname && form.touched.firstname) && <label className='label--error'>{form.errors.firstname}</label>
                    }
                </div>
                <div className='form__container'>
                    <label className='form__label'>Apellido
                        <input type="text" name='lastname' value={form.values.lastname} onChange={form.handleChange} disabled={!edit} />
                    </label>
                    {
                        (form.errors.lastname && form.touched.lastname) && <label className='label--error'>{form.errors.lastname}</label>
                    }
                </div>
                <button type="submit" className='button button--primary' disabled={!edit || loading}>
                    {loading ? <Loading3QuartersOutlined className='spin-animation' /> : <SaveFilled />}
                    Guardar nombre
                </button>
            </form>
        </main>
    )
}
