import { createContext, useState } from 'react';

export const FormModalContext = createContext();

export const FormModalProvider = ({ children }) => {

    const [showModal, setShowModal] = useState(false);

    const openCloseModal = () => {
        setShowModal((prev) => !prev);
    }

    return (
        <FormModalContext.Provider value={
            {
                showModal,
                openCloseModal,
            }
        }>
            {children}
        </FormModalContext.Provider>
    )
}