import { Link } from "react-router-dom"
import { ItemList } from "../../components"

export const CategoriesList = () => {
  return (
    <main className="dashboardList__container">
            <header className='dashboard__header'>
                <h1>Lista de Categorias</h1>
            </header>
            <button className='button button--primary'>Agregar categoria</button>
            <section className='dashboardList__itemSection'>
                <Link>
                    <ItemList />
                </Link>
            </section>
        </main>
  )
}
