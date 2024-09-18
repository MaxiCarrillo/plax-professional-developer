import { Link } from "react-router-dom"
import { ItemList } from "../../components"

export const CategoriesList = () => {

    const categories = [];

    return (
        <main className="dashboardList__container">
            <header className='dashboard__header'>
                <h1>Lista de Categorias</h1>
            </header>
            <button className='button button--primary'>Agregar categoria</button>
            <section className='dashboardList__itemSection'>
                {
                    categories.length !== 0 ?
                        categories.map((category, index) => (
                            <Link>
                                <ItemList key={category.id} data={category} />
                            </Link>
                        ))
                        : (
                            <h2>No hay categorias disponibles</h2>
                        )
                }
            </section>
        </main>
    )
}
