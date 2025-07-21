
import { createRoot } from 'react-dom/client'
import './index.css'
import ApplyIqProvider from './Context/ApplyIqProvider.jsx'
import { RouterProvider } from 'react-router'
import router from './Router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <ApplyIqProvider>
    <RouterProvider router={router} />
  </ApplyIqProvider>
)
