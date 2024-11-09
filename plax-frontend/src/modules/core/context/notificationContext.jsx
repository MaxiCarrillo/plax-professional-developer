import { notification } from 'antd';
import { createContext } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    return (
        <NotificationContext.Provider value={{api}}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    )
}