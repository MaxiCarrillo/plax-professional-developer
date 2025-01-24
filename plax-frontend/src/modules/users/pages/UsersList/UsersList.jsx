import { useContext, useState } from "react";
import { PaginateItems } from "../../../core/components";
import { Modal } from "../../../core/components/Modal/Modal";
import { FormModalContext } from "../../../core/context";
import { UserForm } from "../../components/UserForm/UserForm";
import { useUser } from "../../hooks/useUser";

export const UsersList = () => {

    const { users, getUsers, deleteUser, loading, totalPages, error } = useUser();
    const { handleShowModal } = useContext(FormModalContext);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const onRefetch = () => {
        setRefetch((prev) => !prev);
    }

    const addUser = () => {
        setContentModal(
            <UserForm onRefetch={onRefetch} />
        );
        handleShowModal();
    }

    const editUser = (user) => {
        setContentModal(
            <UserForm user={user} onRefetch={onRefetch} />
        );
        handleShowModal();
    }

    return (
        <main className="dashboardList__container">
            <header className='dashboard__header'>
                <h1>Lista de Usuarios</h1>
            </header>
            <button className='button button--primary' onClick={addUser}>Agregar usuario</button>
            <section className='dashboardList__itemSection'>
                <PaginateItems
                    fetchData={getUsers}
                    loading={loading}
                    data={users?.data}
                    totalPages={totalPages}
                    deleteItem={deleteUser}
                    error={error}
                    editItem={editUser}
                    refetch={refetch}
                    onRefetch={onRefetch}
                />
            </section>
            <Modal>
                {contentModal}
            </Modal>
        </main>
    )
}
