import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorBorder: '#a8aebd',
          },
        },
        token: {
          colorPrimary: '#ff8e3d',
        }
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
