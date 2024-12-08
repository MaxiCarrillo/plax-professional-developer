import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useCategory } from '../../../categories/hooks/useCategory';
import { Popover } from '../../../core/components/Popover/Popover';
import { StayCard } from '../../components';
import { useStay } from '../../hooks/useStay';
import './StaysSearch.css';

export const StaysSearch = () => {

    const { categories, getAllCategories, loading: loadingCategories, error: errorCaterogies } = useCategory();
    const { stays, searchStays, loading: loadingStays, totalPages, error } = useStay();
    const [options, setOptions] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        searchStays();
        getAllCategories();
    }, []);

    useEffect(() => {
        if (categories) {
            const options = categories?.map(category => {
                return {
                    label: category.name,
                    value: category.id
                }
            });
            setOptions(options);
        }
    }, [categories]);

    const handleCategoriesChange = (values) => {
        setSelectedCategories(values);
        searchStays(values);
    }

    return (
        <main className='StaySearch__container'>
            <section className='StaySearch__filters'>
                <p>Filtrar por:</p>
                <form>
                    <div className='StaySearch__form-container'>
                        <label htmlFor='categorias'>Categorias:</label>
                        <Select
                            placeholder='Tipo de alojamiento'
                            id='categorias'
                            className='form__element'
                            options={options}
                            mode='multiple'
                            value={selectedCategories}
                            onChange={handleCategoriesChange}
                            allowClear
                            disabled={loadingCategories || errorCaterogies}
                        />
                    </div>
                </form>
            </section>
            <section className='StaySearch__stays-container'>
                <div className='StaySearch__search-info'>
                    <p>{stays ? stays.totalElements : 0} alojamientos encontrados.</p>
                    <Popover
                        content={
                            <Select
                                placeholder='Tipo de alojamiento'
                                id='categorias'
                                className='form__element'
                                options={options}
                                mode='multiple'
                                value={selectedCategories}
                                onChange={handleCategoriesChange}
                                allowClear
                                disabled={loadingCategories || errorCaterogies}
                            />
                        }
                    >
                        <button className='button button--primary' >Filtros</button>
                    </Popover>
                </div>
                <section className='StaySearch__search'>
                    {loadingStays && <p>Cargando alojamientos...</p>}
                    {error && <p>Error al cargar alojamientos</p>}
                    {stays?.data && stays.data?.map(stay => <StayCard stay={stay} />)}
                </section>
            </section>
        </main>
    )
}
