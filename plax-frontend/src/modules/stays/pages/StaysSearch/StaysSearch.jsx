import { DatePicker, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import { useEffect, useState } from 'react';
import { ArrayParam, DateParam, StringParam, useQueryParams } from 'use-query-params';
import { useCategory } from '../../../categories/hooks/useCategory';
import { Popover } from '../../../core/components/Popover/Popover';
import { StayCard } from '../../components';
import { useStay } from '../../hooks/useStay';
import './StaysSearch.css';
import moment from 'moment';

export const StaysSearch = () => {
    const { RangePicker } = DatePicker;
    const [query, setQuery] = useQueryParams({ checkIn: StringParam, checkOut: StringParam, place: ArrayParam, categories: ArrayParam });
    const { categories, getAllCategories, loading: loadingCategories, error: errorCaterogies } = useCategory();
    const { stays, searchStays, loading: loadingStays, totalPages, error } = useStay();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setQuery((prev) => {
            return { ...prev, checkIn: undefined, checkOut: undefined }
        });
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
        setQuery((prev) => {
            return { ...prev, categories: values }
        })
    }

    const handleDateRangeOnChange = (dateRange) => {
        if (!dateRange) {
            setQuery((prev) => {
                return { ...prev, checkIn: undefined, checkOut: undefined }
            });
            return;
        }

        const [start, end] = dateRange;
        console.log(end);


        setQuery((prev) => ({
            ...prev,
            checkIn: start.format('DD-MM-YYYY'),
            checkOut: end.format('DD-MM-YYYY'),
        }));
    }

    const initialDateRange = query.checkIn && query.checkOut
        ? [moment(query.checkIn, 'DD-MM-yyyy'), moment(query.checkOut, 'DD-MM-yyyy')]
        : null;

    useEffect(() => {
        console.log(query)
        searchStays(query.categories);
    }, [query])

    return (
        <main className='StaySearch__container'>
            <section className='StaySearch__filters'>
                <p>Filtrar por:</p>
                <form>
                    <div className='StaySearch__form-container'>
                        <div>
                            <label htmlFor='categorias'>Categorias:</label>
                            <Select
                                placeholder='Tipo de alojamiento'
                                id='categorias'
                                className='form__element'
                                options={options}
                                mode='multiple'
                                value={query.categories}
                                onChange={handleCategoriesChange}
                                allowClear
                                disabled={loadingCategories || errorCaterogies}
                            />
                        </div>
                        <div>
                            <label htmlFor='date'>Fechas disponibles:</label>
                            <RangePicker
                                id="date"
                                className='form__date-rage-picker form__element'
                                onChange={handleDateRangeOnChange}
                                format={'DD/MM/YYYY'}
                                placeholder={['Fecha de Entrada', 'Fecha de Salida']}
                                locale={locale}
                            />
                        </div>
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
                                value={query.categories}
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
                    {stays?.data && stays.data?.map(stay => <StayCard key={stay.id} stay={stay} />)}
                </section>
            </section>
        </main>
    )
}
