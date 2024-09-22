import './ConfirmAction.css';
import { useEffect, useRef } from 'react';

export const ConfirmAction = ({ showModal, openCloseModal }) => {

    const dialogRef = useRef(null);

    useEffect(() => {
        if (showModal) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [showModal]);

    return (
        <dialog ref={dialogRef} className='dialog'>
            <div className="dialog__container">
                <p>Are you sure you want to delete this stay?</p>
                <div className="dialog__buttons">
                    <button className="button button--secondary" onClick={openCloseModal}>Cancel</button>
                    <button className="button button--danger">Delete</button>
                </div>
            </div>
        </dialog>
    )
}
