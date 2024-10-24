import { FormModalContext } from '../../context';
import './FormModal.css';
import { useRef, useEffect, useContext } from 'react';

export const FormModal = ({ children }) => {
    const { showModal, openCloseModal } = useContext(FormModalContext);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (showModal) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [showModal])

    return (
        <dialog ref={dialogRef} className='formModal__dialog'>
            <div className='formModal__container'>
                <button
                    className='formModal__close'
                    onClick={() => openCloseModal()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </button>
                {children}
            </div>
        </dialog>
    )
}
