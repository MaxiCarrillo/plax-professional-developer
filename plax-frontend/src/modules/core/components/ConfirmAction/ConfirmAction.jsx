import './ConfirmAction.css';
import { useEffect, useRef } from 'react';

export const ConfirmAction = ({ showModal, openCloseModal, deleteItem, onRefetch }) => {

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
        await deleteItem();
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
