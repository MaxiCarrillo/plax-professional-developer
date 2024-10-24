import './StayForm.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStay } from '../../hooks/useStay';
import { useEffect, useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormModalContext } from '../../../core/context';

export const StayForm = ({ stay, onRefetch }) => {
    const { openCloseModal } = useContext(FormModalContext);
    const { addStay, editStay, loading } = useStay();
    const [files, setFiles] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '',
            price: 0,
            description: '',
            address: '',
            category_id: '',
            images: [],
        },
        validationSchema: Yup.object(stay ? ({
            name: Yup.string().required('El nombre es obligatorio'),
            price: Yup.number().required('El precio es obligatorio').min(1, 'El precio debe ser mayor a 0'),
            description: Yup.string().required('La descripción es obligatoria'),
            address: Yup.string().required('La dirección es obligatoria'),
            category_id: Yup.string().required('La categoría es obligatoria'),

        }) : ({
            name: Yup.string().required('El nombre es obligatorio'),
            price: Yup.number().required('El precio es obligatorio').min(1, 'El precio debe ser mayor a 0'),
            description: Yup.string().required('La descripción es obligatoria'),
            address: Yup.string().required('La dirección es obligatoria'),
            category_id: Yup.string().required('La categoría es obligatoria'),
            images: Yup.array().min(1, 'Se requiere al menos una imagen').required('Imagen es obligatoria')
        })
        ),
        validateOnChange: true,
        onSubmit: async (values) => {
            if (stay) {
                if (imagesToDelete.length === stay.images.length && !formik.values.images) {
                    alert('No se pueden eliminar todas las imagenes y no agregar nuevas');
                } else {
                    values.id = stay.id;
                    values.imagesToDelete = imagesToDelete;
                    await editStay(values);
                    formik.resetForm();
                    setFiles([]);
                    setImagesToDelete([]);
                    openCloseModal();
                    onRefetch();
                }
            } else {
                await addStay(values);
                formik.resetForm();
                setFiles([]);
                openCloseModal();
                onRefetch();
            }
        }
    });

    const handleImageChange = (event, imageUrl) => {
        const isChecked = event.target.checked;
        const imageName = imageUrl.split('/').pop();
        setImagesToDelete(prevState => {
            if (isChecked) {
                return [...prevState, imageName];
            } else {
                return prevState.filter(image => image !== imageName);
            }
        });
    };

    useEffect(() => {
        if (stay) {
            formik.setValues({
                name: stay.name,
                price: stay.price,
                description: stay.description,
                address: stay.address,
                category_id: stay.category_id,
            });
        } else {
            formik.resetForm();
            setFiles([]);
        }
    }, [stay]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: (acceptedFiles) => {
            formik.setFieldValue('images', acceptedFiles);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
    })

    const thumbs = files.map(file => (
        <div className='thumb' key={file.name}>
            <figure className='thumb-inner'>
                <img
                    src={file.preview}
                    title={file.name}
                    className='thumb__img'
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </figure>
        </div>
    ));

    return (
        <>
            <h2 className='stayForm__title'>{stay ? 'Editar' : 'Agregar'}</h2>
            <form className='stayForm__form' onSubmit={formik.handleSubmit}>
                <div className='form__container'>
                    <label className='form__label'>
                        Nombre
                        <input type="text" placeholder='Nombre' name='name' value={formik.values.name} onChange={formik.handleChange} />
                    </label>
                    {formik.errors.name && <label className='label--error'>
                        {formik.errors.name}
                    </label>}
                </div>
                <div className='form__container'>
                    <label className='form__label'>
                        Precio
                        <input type="number" min={1} placeholder='Precio' name='price' value={formik.values.price} onChange={formik.handleChange} />
                    </label>
                    {formik.errors.price && <label className='label--error'>{formik.errors.price}</label>}
                </div>
                <div className='form__container'>
                    <label className='form__label'>
                        Dirección
                        <input type="text" placeholder='Dirección' name='address' value={formik.values.address} onChange={formik.handleChange} />
                    </label>
                    {formik.errors.address && <label className='label--error'>{formik.errors.address}</label>}
                </div>
                <div className='form__container'>
                    <label className='form__label'>
                        Categoría
                        <input type="text" placeholder='Categoría' name='category_id' value={formik.values.category_id} onChange={formik.handleChange} />
                    </label>
                    {formik.errors.address && <label className='label--error'>{formik.errors.address}</label>}
                </div>
                <div className='form__container'>
                    <label className='form__label'>
                        Descripción
                        <textarea placeholder='Descripción' name='description' value={formik.values.description} onChange={formik.handleChange} />
                    </label>
                    {formik.errors.description && <label className='label--error'>{formik.errors.description}</label>}
                </div>
                {
                    stay &&
                    <div className='form__container'>
                        <label className='form__label'>
                            Imagenes actuales (Selecciona las imagenes a eliminar)
                        </label>
                        <div className='form__image-container'>
                            {stay.images.map((image, index) => (
                                <div key={index} className='form__image'>
                                    <label htmlFor={`imagesToDelete[${index}]`}>
                                        <img src={image} alt={stay.name} />
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={`imagesToDelete[${index}]`}
                                        name={`imagesToDelete[${index}]`}
                                        value={image}
                                        onChange={(e) => handleImageChange(e, image)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                }
                <div className='form__container'>
                    <label className='form__label'>
                        Imágenes
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar imágenes</p>
                        </div>
                    </label>
                    {formik.errors.images && <label className='label--error'>{formik.errors.images}</label>}
                    <aside className='thumbsContainer'>
                        {thumbs}
                    </aside>
                </div>
                <button type="submit" className='button button--primary'>{stay ? 'Editar' : 'Agregar'}</button>
            </form>
        </>
    )
}