import { AutoComplete, DatePicker, Empty, Skeleton } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../../../categories/components';
import { useCategory } from '../../../categories/hooks/useCategory';
import { StayCard, StaySkeleton } from '../../../stays/components/';
import { useStay } from '../../../stays/hooks/useStay';
import placesOptions from '../../../stays/pages/StaysSearch/options';
import { NotificationContext } from '../../context/notificationContext';
import './Home.css';
import { SearchOutlined } from '@ant-design/icons';

export const Home = () => {
    const [options] = useState(placesOptions);
    const { toaster } = useContext(NotificationContext);
    const { categories, getAllCategories, loading: loadingCategories, error: errorCategories, success: successCategories } = useCategory();
    const { stays, getRandomStays, loading: loadingStays, error: errorStays, success: successStays } = useStay();
    const [dateRange, setDateRange] = useState([]);
    const [place, setPlace] = useState('');
    const navigate = useNavigate();

    const { RangePicker } = DatePicker;

    const handleDateRangeOnChange = (dateString) => {
        setDateRange(dateString);
    }

    const handleSearch = (newValue) => {
        setPlace(newValue);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (place === '' && (dateRange === null || dateRange.length === 0)) {
            toaster['error']({
                message: 'Debe elegir al menos un lugar.',
                description:
                    'Por favor, seleccione un lugar.',
                duration: 3
            });
            return;
        }
        let url = '/search?';
        place && (url += `place=${place}&`);
        (dateRange && dateRange.length > 0) && (url += `checkIn=${dateRange[0].format('YYYY-MM-DD')}&checkOut=${dateRange[1].format('YYYY-MM-DD')}`);
        navigate(url);
    }

    useEffect(() => {
        getAllCategories();
        getRandomStays();
    }, [])

    return (
        <main className='home__main'>
            <section className='home__mainSection'>
                <div>
                    <h1>Encontrá tu próxima estancia</h1>
                    <form className='mainSection__form' onSubmit={handleOnSubmit}>
                        <label htmlFor="place">
                            <AutoComplete
                                id='place'
                                allowClear
                                className='form__multiple-select'
                                onChange={handleSearch}
                                options={options}
                                filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                placeholder='Por favor seleccione un lugar'
                                listHeight={128}
                            />
                        </label>
                        <label htmlFor="date">
                            <RangePicker
                                id="date"
                                className='form__date-rage-picker'
                                onChange={handleDateRangeOnChange}
                                format={'DD/MM/YYYY'}
                                placeholder={['Fecha de Entrada', 'Fecha de Salida']}
                                locale={locale}
                                disabledDate={(current) => current && current < new Date()}
                            />
                        </label>
                        <button className='button button--base'>
                            <SearchOutlined />
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
                {
                    loadingCategories ? <div className='categorySection__container'>
                        <Skeleton
                            active
                            title={{ width: '100%', style: { height: "200px" } }}
                            paragraph={{ rows: 0 }}
                        />
                    </div> :
                        errorCategories ? <Empty description="Ha ocurrido un error obteniendo todas las categorias." /> :
                            (successCategories && categories.length > 0) ?
                                <div className='categorySection__container'>
                                    {categories?.map(category => <CategoryCard key={category.id} category={category} />)}
                                </div>
                                :
                                <Empty description="No hay categorias disponibles." />
                }
            </section>
            <section className='home__recommendationsSection'>
                <h2>Nuestras recomendaciones</h2>
                {
                    loadingStays ? <div className='recommendationsSection__container'>
                        <StaySkeleton />
                        <StaySkeleton />
                        <StaySkeleton />
                        <StaySkeleton />
                    </div>
                        :
                        errorStays ? <Empty description="Ha ocurrido un error obteniendo las estancias." /> :
                            (successStays && stays.length > 0) ?
                                <div className='recommendationsSection__container'>
                                    {stays.map(stay => <StayCard key={stay.id} stay={stay} />)}
                                </div> :
                                <Empty description="No hay estancias disponibles." />
                }
            </section>
        </main >
    )
}
