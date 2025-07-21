
import { createRoot } from 'react-dom/client'
import './index.css'
import ApplyIqProvider from './Context/ApplyIqProvider.jsx'
import { RouterProvider } from 'react-router'
import router from './Router/Router.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ApplyIqProvider>
      <RouterProvider router={router} />
    </ApplyIqProvider>
 
  </QueryClientProvider>
)
