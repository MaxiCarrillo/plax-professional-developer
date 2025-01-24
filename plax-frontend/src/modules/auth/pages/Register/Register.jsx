import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { NotificationContext } from '../../../core/context/notificationContext';
import authService from '../../services/auth.service';
import './Register.css';
import { Loading3QuartersOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

export const Register = () => {
    const { toaster } = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            firstname: Yup.string().trim().required('El nombre es obligatorio'),
            lastname: Yup.string().trim().required('El apellido es obligatorio'),
            email: Yup.string().trim().email('El email no es válido').required('El email es obligatorio'),
            password: Yup.string().trim().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres')
        }),
        validateOnChange: true,
        onSubmit: async (newUser) => {
            try {
                setLoading(true);
                await authService.register(newUser);
                toaster['success']({
                    message: 'Registro exitoso.',
                    description: '¡Bienvenido a Plax!',
                    duration: 3
                })
                navigate('/iniciar-sesion');
            } catch (error) {
                toaster['error']({
                    message: 'Error al registrarse.',
                    description: error.message,
                    duration: 3
                })
            } finally {
                setLoading(false);
            }
        }
    })

    return (
        <>
            <Link className='button button--secondary auth__button' to={'/iniciar-sesion'}><UserOutlined />Iniciar Sesión</Link>
            <form className='auth__form' onSubmit={formik.handleSubmit}>
                <h2>Crear una cuenta</h2>
                <p>Ingresa tus datos acá abajo para crear una cuenta.</p>
                <div className='form__container'>
                    <label htmlFor="firstname" className='form__label form__label--required'>Nombre
                        <input type="text" name="firstname" id="firstname" placeholder='Ingrese su nombre' value={formik.values.firstname} onChange={formik.handleChange} required />
                    </label>
                    {formik.errors.firstname && <label className='label--error'>
                        {formik.errors.firstname}
                    </label>}
                </div>
                <div className='form__container'>
                    <label htmlFor="lastname" className='form__label form__label--required'>Apellido
                        <input type="text" name="lastname" id="lastname" placeholder='Ingrese su apellido' value={formik.values.lastname} onChange={formik.handleChange} required />
                    </label>
                    {
                        formik.errors.lastname && <label className='label--error'>
                            {formik.errors.lastname}
                        </label>
                    }
                </div>
                <div className='form__container'>
                    <label htmlFor="email" className='form__label form__label--required'>Email
                        <input type="email" name="email" id="email" placeholder='Ingrese su email' value={formik.values.email} onChange={formik.handleChange} autoComplete='email' required />
                    </label>
                    {
                        formik.errors.email && <label className='label--error'>
                            {formik.errors.email}
                        </label>
                    }
                </div>
                <div className='form__container'>
                    <label htmlFor="password" className='form__label form__label--required'>Contraseña
                        <input type="password" name="password" id="password" placeholder='Ingrese su contraseña' value={formik.values.password} onChange={formik.handleChange} autoComplete='current-password' required />
                    </label>
                    {
                        formik.errors.password && <label className='label--error'>
                            {formik.errors.password}
                        </label>
                    }
                </div>
                <div className='form__container'>
                    <button type='submit' className='button button--base' disabled={loading}>
                        {loading ? <Loading3QuartersOutlined className='spin-animation' /> : <UserAddOutlined />}
                        Registrarme
                    </button>
                </div>
                <p className='form__terms'><small>Al registrarse está aceptando los terminos y condiciones de Plax.</small></p>
            </form>
        </>
    )
}
