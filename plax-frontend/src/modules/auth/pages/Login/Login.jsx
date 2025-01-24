import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { NotificationContext } from '../../../core/context/notificationContext';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/auth.service';
import { Loading3QuartersOutlined, LoadingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

export const Login = () => {
    const [loading, setLoading] = useState(false);
    const { toaster } = useContext(NotificationContext);
    const { login } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().trim().email('El email no es válido').required('El email es obligatorio'),
            password: Yup.string().trim().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres')
        }),
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const data = await authService.login(values);
                login(data.user, data.token);
                navigate('/');
                toaster['success']({
                    message: 'Inicio de sesión exitoso.',
                    description: '¡Bienvenido a Plax!',
                    duration: 3
                })
            } catch (error) {
                toaster['error']({
                    message: 'Error al iniciar sesión.',
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
            <Link className='button button--secondary auth__button' to={'/registro'}><UserAddOutlined />Crear Cuenta</Link>
            <form className='auth__form' onSubmit={formik.handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <p>Ingresa tus datos acá abajo para iniciar sesión.</p>
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
                        {loading ? <Loading3QuartersOutlined className='spin-animation' /> : <UserOutlined />}
                        Ingresar
                    </button>
                </div>
                <p className='form__terms'><small>Recuerde no compartir sus datos personales con ninguna persona.</small></p>
            </form>
        </>
    )
}
