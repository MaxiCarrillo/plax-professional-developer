import { notification } from 'antd';
import { createContext } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [toaster, contextHolder] = notification.useNotification();

    return (
        <NotificationContext.Provider value={{toaster}}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    )
}