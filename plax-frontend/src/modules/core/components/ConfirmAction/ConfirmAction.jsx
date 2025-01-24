import { useContext, useEffect, useRef } from 'react';
import { NotificationContext } from '../../context/notificationContext';
import './ConfirmAction.css';

export const ConfirmAction = ({ showModal, openCloseModal, deleteItem, onRefetch }) => {

    const { toaster } = useContext(NotificationContext);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (showModal) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [showModal]);

    const handleClickDelete = async () => {
        openCloseModal();
        try {
            await deleteItem();
            toaster['success']({
                message: 'Item eliminado con exito.',
                description:
                    'El item ha sido eliminado.',
                duration: 3
            });
        } catch (error) {
            toaster['error']({
                message: 'No se ha podido eliminar el item.',
                description:
                    error.message,
                duration: 3
            });
        }
        onRefetch();
    }

    return (
        <dialog ref={dialogRef} className='dialog'>
            <div className="dialog__container">
                <p>¿Esta seguro de realizar está accion?</p>
                <div className="dialog__buttons">
                    <button className="button button--secondary" onClick={openCloseModal}>Cancelar</button>
                    <button className="button button--danger" onClick={() => handleClickDelete()}>Eliminar</button>
                </div>
            </div>
        </dialog>
    )
}
