import { TopMenu, Footer } from '../../components';

export const UserLayout = ({ children }) => {
    return (
        <>
            <TopMenu />
            {children}
            <Footer />
        </>
    )
}
