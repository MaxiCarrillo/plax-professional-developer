import './Home.css';
import { CategoryCard } from '../../../categories/components/';
import { StayCard } from '../../../stays/components/';
import { useEffect, useState } from 'react';

export const Home = () => {

    const [categories, setCategories] = useState([]);
    const [stays, setStays] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data.data);
            });
        fetch('http://localhost:8080/api/stays/random')
            .then(response => response.json())
            .then(data => {
                setStays(data);
            });
    }, [])

    return (
        <main className='home__main'>
            <section className='home__mainSection'>
                <div>
                    <h1>Encontrá tu próxima estancia</h1>
                    <form className='mainSection__form'>
                        <label htmlFor="">
                            <input type="text" placeholder='Lugar de destino' name='hola' />
                        </label>
                        <label htmlFor="">
                            <input type="date" name="date" />
                        </label>
                        <button className='button button--base'>
                            Buscar
                        </button>
                    </form>
                </div>
                <svg viewBox="0 0 1280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M937.184 63.56C875.317 74.35 815.413 93.69 753.717 105.42C665.835 122.14 574.315 123.15 486.571 105.81C401.301 89 312.885 48 228.629 27.17C153.909 8.69 72.3306 1.08 -0.00012207 24.17V120H1280V92.65C1170.7 53.7958 1052.15 43.7355 937.184 63.56Z" fill="#F0F1F4" />
                </svg>
            </section>
            <section className='home__categorySection'>
                <h2>Buscar por tipo de alojamiento</h2>
                <div className='categorySection__container'>
                    {
                        categories.map(category => <CategoryCard key={category.id} category={category} />)
                    }
                </div>
            </section>
            <section className='home__recommendationsSection'>
                <h2>Nuestras recomendaciones</h2>
                <div className='recommendationsSection__container'>
                    {
                        stays.map(stay => <StayCard key={stay.id} stay={stay} />)
                    }
                </div>
            </section>
        </main>
    )
}
