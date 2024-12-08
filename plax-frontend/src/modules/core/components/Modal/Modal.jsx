import { useContext, useState } from "react";
import { FormModalContext } from "../../context";
import { Modal as ModalAntd } from "antd";

export const Modal = ({ children }) => {

    const { isModalOpen, handleCancel } = useContext(FormModalContext);

    return (
        <ModalAntd open={isModalOpen} onCancel={handleCancel} footer={null} centered mask>
            {children}
        </ModalAntd>
    )
}
