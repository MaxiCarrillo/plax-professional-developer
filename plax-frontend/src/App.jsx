import { AuthProvider } from "./modules/auth/context/AuthContext"
import { NotificationProvider } from "./modules/core/context/notificationContext"
import { Navigation } from "./modules/core/routes/Navigation"

function App() {

  return (
    <AuthProvider>
      <NotificationProvider>
        <Navigation />
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
