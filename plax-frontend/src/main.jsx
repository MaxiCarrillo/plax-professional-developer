import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Select: {
            activeBorderColor: '#ff8e3d',
            hoverBorderColor: '#ff8e3d',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
