import { Footer, TopMenu } from '../../components';
import { FormModalProvider } from '../../context';
import './UserLayout.css';

export const UserLayout = ({ children }) => {
    return (
        <main className='UserLayout__container'>
            <TopMenu />
            <FormModalProvider>
                {children}
            </FormModalProvider>
            <Footer />
        </main>
    )
}
