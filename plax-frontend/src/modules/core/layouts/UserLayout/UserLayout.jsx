import { Footer, TopMenu } from '../../components';
import { FormModalProvider } from '../../context';

export const UserLayout = ({ children }) => {
    return (
        <main>
            <TopMenu />
            <FormModalProvider>
                {children}
            </FormModalProvider>
            <Footer />
        </main>
    )
}
