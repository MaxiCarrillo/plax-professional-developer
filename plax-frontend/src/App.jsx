import { Navigation } from "./modules/core/routes/Navigation"
import { NotificationProvider } from "./modules/core/context/notificationContext"



function App() {

  return (
    <NotificationProvider>
      <Navigation />
    </NotificationProvider>
  )
}

export default App
