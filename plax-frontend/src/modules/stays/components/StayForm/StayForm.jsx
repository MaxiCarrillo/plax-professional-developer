import { DeleteFilled, DropboxOutlined, Loading3QuartersOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as Yup from 'yup';
import { useCategory } from '../../../categories/hooks/useCategory';
import { FormModalContext } from '../../../core/context';
import { NotificationContext } from '../../../core/context/notificationContext';
import { useFeature } from '../../../features/hooks/useFeature';
import { useStay } from '../../hooks/useStay';
import './StayForm.css';

const initialValues = {
    name: '',
    price: 0,
    description: '',
    address: {
        street: '',
        city: '',
        country: ''
    },
    features: [],
    category_id: null,
    images: [],
    policies: [{ policy: "", description: "" }]
}

const addressSchema = Yup.object().shape({
    street: Yup.string().required('La calle es obligatoria'),
    city: Yup.string().required('La ciudad es obligatoria'),
    country: Yup.string().required('El país es obligatorio'),
});

const editSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    price: Yup.number().required('El precio es obligatorio').min(1, 'El precio debe ser mayor a 0'),
    description: Yup.string().required('La descripción es obligatoria'),
    address: addressSchema,
    category_id: Yup.string().required('La categoría es obligatoria'),
    features: Yup.array().min(1, 'Se requiere al menos una característica').required('Característica es obligatoria'),
    policies: Yup.array()
        .of(
            Yup.object().shape({
                policy: Yup.string().required("El título de la política es obligatorio"),
                description: Yup.string().required("La descripción es obligatoria"),
            })
        )
        .min(1, "Debes agregar al menos una política"),
})

const createSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    price: Yup.number().required('El precio es obligatorio').min(1, 'El precio debe ser mayor a 0'),
    description: Yup.string().required('La descripción es obligatoria'),
    address: addressSchema,
    category_id: Yup.string().required('La categoría es obligatoria'),
    images: Yup.array().min(1, 'Se requiere al menos una imagen').required('Imagen es obligatoria'),
    features: Yup.array().min(1, 'Se requiere al menos una característica').required('Característica es obligatoria'),
    policies: Yup.array()
        .of(
            Yup.object().shape({
                policy: Yup.string().required("El título de la política es obligatorio"),
                description: Yup.string().required("La descripción es obligatoria"),
            })
        )
        .min(1, "Debes agregar al menos una política"),
})



export const StayForm = ({ stay, onRefetch }) => {
    const { toaster } = useContext(NotificationContext);
    const { handleCancel } = useContext(FormModalContext);
    const { addStay, editStay, loading } = useStay();
    const [files, setFiles] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [optionsCategories, setOptionsCategories] = useState([]);
    const [optionsFeatures, setOptionsFeatures] = useState([]);
    const { categories, getAllCategories, loading: loadingCategories, error: errorCaterogies } = useCategory();
    const { features, getAllFeatures, loading: loadingFeatures, error: errorFeatures } = useFeature();

    useEffect(() => {
        getAllCategories();
        getAllFeatures();
    }, []);


    useEffect(() => {
        if (categories) {
            const options = categories?.map(category => {
                return {
                    label: category.name,
                    value: category.id
                }
            });
            setOptionsCategories(options);

        }
    }, [categories]);

    useEffect(() => {
        if (features) {
            const options = features?.map(feature => {
                return {
                    label: feature.name,
                    value: feature.id
                }
            });
            setOptionsFeatures(options);
        }
    }, [features]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: stay ? editSchema : createSchema,
        validateOnChange: true,
        onSubmit: async (values) => {
            if (stay) {
                if (imagesToDelete.length === stay.images.length && !formik.values.images) {
                    alert('No se pueden eliminar todas las imagenes y no agregar nuevas');
                } else {
                    try {
                        values.id = stay.id;
                        values.imagesToDelete = imagesToDelete;
                        await editStay(values);
                        formik.resetForm();
                        setFiles([]);
                        setImagesToDelete([]);
                        handleCancel();
                        onRefetch();
                        toaster['success']({
                            message: 'Alojamiento editado correctamente',
                            description: 'El alojamiento fue editado correctamente.',
                            duration: 3
                        });
                    } catch (e) {
                        toaster['error']({
                            message: 'Error al editar el alojamiento',
                            description: e.message,
                            duration: 3
                        });
                    }
                }
            } else {
                try {
                    await addStay(values);
                    formik.resetForm();
                    setFiles([]);
                    handleCancel();
                    onRefetch();
                    toaster['success']({
                        message: 'Alojamiento creado correctamente',
                        description: 'El alojamiento fue creado correctamente.',
                        duration: 3
                    });
                } catch (e) {
                    toaster['error']({
                        message: 'Error al crear el alojamiento',
                        description: e.message,
                        duration: 3
                    });

                }
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

    const checkboxesRef = useRef([]);

    useEffect(() => {
        if (stay) {
            formik.setValues({
                name: stay.name,
                price: stay.price,
                description: stay.description,
                address: stay.address,
                category_id: stay.category_id,
                features: stay.features.map(feature => feature.id),
                policies: stay.policies,
            });
            setImagesToDelete([]);
            checkboxesRef.current.forEach(checkbox => {
                if (checkbox) checkbox.checked = false;
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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
            <form className='stayForm__form stayForm__form--overflow' onSubmit={formik.handleSubmit}>
                <div className='form__col-2'>
                    <div className='form__container'>
                        <label className='form__label'>
                            Nombre
                            <input type="text" placeholder='Nombre' name='name' value={formik.values.name} onChange={formik.handleChange} required />
                        </label>
                        {(formik.errors.name && formik.touched.name) && <label className='label--error'>
                            {formik.errors.name}
                        </label>}
                    </div>
                    <div className='form__container'>
                        <label className='form__label'>
                            Precio
                            <input type="number" min={1} placeholder='Precio' name='price' value={formik.values.price} onChange={formik.handleChange} required />
                        </label>
                        {(formik.errors.price && formik.touched.price) && <label className='label--error'>{formik.errors.price}</label>}
                    </div>
                </div>
                <div className='form__container'>
                    <label className='form__label'>
                        Categoría
                        <Select
                            id="category_id"
                            name="category_id"
                            className="select"
                            value={formik.values.category_id}
                            onChange={(value) => formik.setFieldValue('category_id', value)}
                            options={optionsCategories}
                            placeholder="Seleccióne una categoria"
                            optionFilterProp="label"
                            disabled={loadingCategories || errorCaterogies}
                        />
                    </label>
                    {(formik.errors.category_id && formik.touched.category_id) && <label className='label--error'>{formik.errors.category_id}</label>}
                </div>
                <div className='form__container'>
                    <label className='form__label'>
                        Características
                        <Select
                            id="features"
                            name="features"
                            className="select"
                            mode='multiple'
                            allowClear
                            value={formik.values.features}
                            onChange={(value) => formik.setFieldValue('features', value)}
                            options={optionsFeatures}
                            placeholder="Seleccióne las características"
                            optionFilterProp="label"
                            disabled={loadingFeatures || errorFeatures}
                        />
                    </label>
                    {(formik.errors.features && formik.touched.features) && <label className='label--error'>{formik.errors.features}</label>}
                </div>
                <div className="form__container">
                    <label className="form__label">
                        Calle
                        <input
                            type="text"
                            placeholder="Calle"
                            name="address.street"
                            value={formik.values.address.street}
                            onChange={formik.handleChange}
                        />
                    </label>
                    {(formik.errors.address?.street && formik.touched.address?.street) && (
                        <label className="label--error">{formik.errors.address.street}</label>
                    )}
                </div>

                <div className="form__col-2">
                    <div className="form__container">
                        <label className="form__label">
                            País
                            <input
                                type="text"
                                placeholder="País"
                                name="address.country"
                                value={formik.values.address.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </label>
                        {(formik.errors.address?.country && formik.touched.address?.country) && (
                            <label className="label--error">{formik.errors.address.country}</label>
                        )}
                    </div>
                    <div className="form__container">
                        <label className="form__label">
                            Provincia o Ciudad
                            <input
                                type="text"
                                placeholder="Provincia o Ciudad"
                                name="address.city"
                                value={formik.values.address.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </label>
                        {(formik.errors.address?.city && formik.touched.address?.city) && (
                            <label className="label--error">{formik.errors.address.city}</label>
                        )}
                    </div>
                </div>
                <div className='form__container'>
                    <label className='form__label'>
                        Descripción
                        <textarea placeholder='Descripción' name='description' value={formik.values.description} onChange={formik.handleChange} />
                    </label>
                    {(formik.errors.description && formik.touched.description) && <label className='label--error'>{formik.errors.description}</label>}
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
                                        ref={el => (checkboxesRef.current[index] = el)}
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
                        <div {...getRootProps({
                            className: `dropzone ${isDragActive ? 'dropzone--active' : ''}`,
                        })}>
                            <input {...getInputProps()} />
                            <DropboxOutlined />
                            <p>
                                {isDragActive
                                    ? '¡Suelta los archivos aquí!'
                                    : 'Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar imágenes'}
                            </p>
                        </div>
                    </label>
                    {(formik.errors.images && formik.touched.images) && <label className='label--error'>{formik.errors.images}</label>}
                    <aside className='thumbsContainer'>
                        {thumbs}
                    </aside>
                </div>
                <FormikProvider value={formik}>
                    <FieldArray name='policies'>
                        {({ push, remove }) => (
                            <>
                                <button
                                    type="button"
                                    className='button button--base'
                                    style={{ alignSelf: 'start' }}
                                    onClick={() => push({ policy: "", description: "" })}
                                >
                                    <PlusCircleOutlined />Añadir política
                                </button>
                                {formik.values.policies.map((_, index) => (
                                    <Fragment key={index} >
                                        <div className='form__container'>
                                            <label className='form__label'>Título de la política
                                                <input
                                                    type="text"
                                                    name={`policies[${index}].policy`}
                                                    value={formik.values.policies[index].policy}
                                                    onChange={formik.handleChange}
                                                />
                                            </label>
                                            {(formik.errors.policies?.[index]?.policy && formik.touched.policies?.[index]?.policy) && (
                                                <div style={{ color: "red" }}>{formik.errors.policies[index].policy}</div>
                                            )}
                                        </div>
                                        <div className='form__container'>
                                            <label className='form__label'>Descripción
                                                <textarea
                                                    name={`policies[${index}].description`}
                                                    value={formik.values.policies[index].description}
                                                    onChange={formik.handleChange}
                                                />
                                            </label>

                                            {(formik.errors.policies?.[index]?.description && formik.touched.policies?.[index]?.description) && (
                                                <div style={{ color: "red" }}>{formik.errors.policies[index].description}</div>
                                            )}
                                        </div>
                                        {formik.values.policies.length > 1 && (
                                            <button
                                                type="button"
                                                className='button button--danger'
                                                onClick={() => remove(index)}
                                                style={{ alignSelf: 'end' }}
                                            >
                                                <DeleteFilled />Eliminar política
                                            </button>
                                        )}
                                    </Fragment>
                                ))}
                            </>
                        )}
                    </FieldArray>
                </FormikProvider>
                <button type="submit" className='button button--primary' disabled={loading}>
                    {loading ? <Loading3QuartersOutlined className='spin-animation' /> : <PlusCircleOutlined />}
                    {stay ? 'Editar' : 'Agregar'}
                </button>
            </form>
        </>
    )
}