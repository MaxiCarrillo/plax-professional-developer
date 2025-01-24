import { useDebounce } from '@uidotdev/usehooks';
import { AutoComplete, DatePicker, Empty, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrayParam, StringParam, useQueryParams } from 'use-query-params';
import { useCategory } from '../../../categories/hooks/useCategory';
import { Popover } from '../../../core/components/Popover/Popover';
import { StayCard, StaySkeleton } from '../../components';
import { useStay } from '../../hooks/useStay';
import placesOptions from './options';
import './StaysSearch.css';

export const StaysSearch = () => {
    const { RangePicker } = DatePicker;
    const [query, setQuery] = useQueryParams({ checkIn: StringParam, checkOut: StringParam, place: StringParam, categories: ArrayParam });
    const { categories, getAllCategories, loading: loadingCategories, error: errorCaterogies } = useCategory();
    const { stays, searchStays, loading: loadingStays, totalPages, error } = useStay();
    const [options, setOptions] = useState([]);
    const [optionsPlace] = useState(placesOptions);
    const [place, setPlace] = useState(query.place ? query.place : null);

    const debouncedPlace = useDebounce(place, 500);

    useEffect(() => {
        setQuery((prev) => {
            return { ...prev }
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

    useEffect(() => {
        if (!debouncedPlace) {
            setQuery((prev) => {
                return { ...prev, place: undefined }
            });
            return;
        }
        setQuery((prev) => {
            return { ...prev, place: debouncedPlace }
        })
    }, [debouncedPlace]);

    const handlePlaceChange = (value) => {
        setPlace(value);
    }

    const handleDateRangeOnChange = (dateRange) => {
        if (!dateRange) {
            setQuery((prev) => {
                return { ...prev, checkIn: undefined, checkOut: undefined }
            });
            return;
        }

        const [start, end] = dateRange;

        setQuery((prev) => ({
            ...prev,
            checkIn: start.format('YYYY-MM-DD'),
            checkOut: end.format('YYYY-MM-DD'),
        }));
    }

    useEffect(() => {
        searchStays(query.categories, query.place, query.checkIn, query.checkOut);
    }, [query])

    return (
        <main className='StaySearch__container'>
            <Helmet>
                <title>Buscar alojamiento | Plax</title>
                <meta name='description' content='Busca tu alojamiento ideal' />
            </Helmet>
            <section className='StaySearch__filters'>
                <p>Filtrar por:</p>
                <form>
                    <div className='StaySearch__form-container'>
                        <div>
                            <label htmlFor="place">Lugar</label>
                            <AutoComplete
                                id='place'
                                allowClear
                                className='form__element'
                                onChange={handlePlaceChange}
                                options={optionsPlace}
                                filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                placeholder='Por favor seleccione un lugar'
                                listHeight={128}
                                value={place}
                            />
                        </div>
                        <div>
                            <label htmlFor='categorias'>Categorias</label>
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
                            <label htmlFor='date'>Fechas disponibles</label>
                            <RangePicker
                                id="date"
                                className='form__date-rage-picker form__element'
                                onChange={handleDateRangeOnChange}
                                value={[query.checkIn && dayjs(query.checkIn), query.checkOut && dayjs(query.checkOut)]}
                                format={'DD/MM/YYYY'}
                                placeholder={['Fecha de Entrada', 'Fecha de Salida']}
                                locale={locale}
                                disabledDate={(current) => current && current < new Date()}
                            />
                        </div>
                    </div>
                </form>
            </section>
            <section className='StaySearch__stays-container'>
                <div className='StaySearch__search-info'>
                    {
                        (stays && stays.totalElements > 0) &&
                        <p>{stays.totalElements} alojamientos encontrados.</p>
                    }
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
                    {
                        loadingStays
                            ?
                            <>
                                <StaySkeleton />
                                <StaySkeleton />
                                <StaySkeleton />
                            </>
                            :
                            error
                                ?
                                <p>Error al cargar alojamientos</p>
                                :
                                (stays?.data && stays.data.length > 0)
                                    ? stays.data.map(stay => <StayCard key={stay.id} stay={stay} />) :
                                    <Empty
                                        description="No encontramos estancias que coincidan con tus parámetros de búsqueda."
                                    />
                    }
                </section>
            </section>
        </main>
    )
}
