import { HelmetProvider } from "react-helmet-async"
import { AuthProvider } from "./modules/auth/context/AuthContext"
import { NotificationProvider } from "./modules/core/context/notificationContext"
import { Navigation } from "./modules/core/routes/Navigation"

function App() {

  return (
    <AuthProvider>
      <HelmetProvider>
        <NotificationProvider>
          <Navigation />
        </NotificationProvider>
      </HelmetProvider>
    </AuthProvider>
  )
}

export default App
