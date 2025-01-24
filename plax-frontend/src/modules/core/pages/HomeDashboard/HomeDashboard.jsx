import { ApartmentOutlined, AppstoreAddOutlined, CalendarOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Empty, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/context/AuthContext';
import api from '../../api';
import './HomeDashboard.css';

export const HomeDashboard = () => {

    const { user, token } = useAuth();
    const [info, setInfo] = useState({
        loading: null,
        data: null,
        error: null
    });

    useEffect(() => {
        const getInfo = async () => {
            setInfo((prev) => ({ ...prev, loading: true }));
            try {
                const response = await api.get('/users/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setInfo((prev) => ({ ...prev, loading: false, data: response.data }));
            }
            catch (error) {
                setInfo((prev) => ({ ...prev, loading: false, error: 'No se pudo obtener la información' }));
            }
        }
        getInfo();
    }, []);

    return (
        <main className='homeDashboard__main'>
            <section className='homeDashboard__mainSection'>
                <article className='homeDashboard__mainSectionArticle'>
                    <p>Plax</p>
                    <h1>Bienvenido al panel de administación</h1>
                </article>
                {
                    info.loading ? <Skeleton
                        active
                        title={{ width: '100%', style: { height: "320px", marginTop: "1rem" } }}
                        paragraph={{ rows: 0 }}
                    /> :
                        info.error ? <Empty description={info.error} /> :
                            info.data && <div className='homeDashboard__cardContainer'>
                                <CardDash
                                    title='Usuarios'
                                    total={info.data?.totalUsers}
                                    Icon={<UserOutlined />}
                                />
                                <CardDash
                                    title='Estancias'
                                    total={info.data?.totalStays}
                                    Icon={<HomeOutlined />}
                                />
                                <CardDash
                                    title='Características'
                                    total={info.data?.totalFeatures}
                                    Icon={<AppstoreAddOutlined />}
                                />
                                <CardDash
                                    title='Categorías'
                                    total={info.data?.totalCategories}
                                    Icon={<ApartmentOutlined />}
                                />
                                <CardDash
                                    title='Reservas'
                                    total={info.data?.totalReservations}
                                    Icon={<CalendarOutlined />}
                                />
                            </div>
                }

            </section>
            <section className='homeDashboard__userSection'>
                <div className='homeDashboard__userAvatar'>
                    {user.firstname[0]}{user.lastname[0]}
                </div>
                <p className='profile__name'>{user.firstname} {user.lastname}</p>
                <p>{user.email}</p>
            </section>
        </main>
    )
}


const CardDash = ({ title, total, Icon }) => {
    return (
        <article className='card-dashboard__container'>
            <div className='card-dashboard__icon'>
                {Icon}
                {/* <UserOutlined /> */}
            </div>
            <div className='card-dashboard__content'>
                <p>{title}</p>
                <p>{total}</p>
            </div>
        </article>
    )
}
