import { DropboxOutlined, Loading3QuartersOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import * as Yup from "yup"
import { FormModalContext } from "../../../core/context"
import { NotificationContext } from "../../../core/context/notificationContext"
import { useFeature } from "../../hooks/useFeature"

export const FeatureForm = ({ feature, onRefetch }) => {
    const { toaster } = useContext(NotificationContext);
    const { loading, addFeature, editFeature } = useFeature()
    const { handleCancel } = useContext(FormModalContext)
    const [files, setFiles] = useState([])

    const formik = useFormik({
        initialValues: {
            name: "",
            icon: [],
        },
        validationSchema: Yup.object(feature ? ({
            name: Yup.string().required("El nombre es obligatorio"),
        }) : ({
            name: Yup.string().required("El nombre es obligatorio"),
            icon: Yup.array().min(1, 'Se requiere un icono').required('Icono es obligatorio')
        })),
        validateOnChange: true,
        onSubmit: async (values) => {
            if (feature) {
                try {
                    values.id = feature.id
                    await editFeature(values)
                    formik.resetForm()
                    setFiles([])
                    handleCancel()
                    onRefetch()
                    toaster['success']({
                        message: 'Característica editada correctamente',
                        description: 'La característica se ha editado correctamente',
                        duration: 3
                    });
                } catch (error) {
                    toaster['error']({
                        message: 'Error al editar la característica',
                        description: error.message,
                        duration: 3
                    });
                }
            } else {
                try {
                    await addFeature(values)
                    formik.resetForm()
                    setFiles([])
                    handleCancel()
                    onRefetch()
                    toaster['success']({
                        message: 'Característica agregada correctamente',
                        description: 'La característica se ha agregado correctamente',
                        duration: 3
                    });
                } catch (error) {
                    toaster['error']({
                        message: 'Error al agregar la característica',
                        description: error.message,
                        duration: 3
                    });
                }
            }
        },
    });

    useEffect(() => {
        if (feature) {
            formik.setValues({
                name: feature.name,
            });
        } else {
            formik.resetForm();
            setFiles([]);
        }
    }, [feature]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/svg+xml': ['.svg']
        },
        onDrop: (acceptedFiles) => {
            const svgFiles = acceptedFiles.filter(file => file.type === 'image/svg+xml');
            formik.setFieldValue('icon', acceptedFiles);
            setFiles(acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            ));
        },
        maxFiles: 1
    });

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
            <h2 className='stayForm__title'>{feature ? 'Editar' : 'Agregar'}</h2>
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
                {
                    feature &&
                    <div className='form__container'>
                        <label className='form__label'>
                            Icono actual
                            <figure className='form__image'>
                                <img src={feature.icon} alt={feature.name} />
                            </figure>
                        </label>
                    </div>
                }
                <div className='form__container'>
                    <label className='form__label'>
                        {feature ? 'Nuevo icono' : 'Icono'}
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <DropboxOutlined />
                            <p>Arrastra y suelta una imágen aquí, o haz clic para seleccionar una icono</p>
                        </div>
                    </label>
                    {formik.errors.icon && <label className='label--error'>{formik.errors.icon}</label>}
                    <aside className='thumbsContainer'>
                        {thumbs}
                    </aside>
                </div>
                <button type="submit" className='button button--primary' disabled={loading}>
                    {loading ? <Loading3QuartersOutlined className='spin-animation' /> : <PlusCircleOutlined />}
                    {feature ? 'Editar' : 'Agregar'}
                </button>
            </form>
        </>
    )
}
