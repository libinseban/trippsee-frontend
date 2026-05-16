import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import { AuthProvider } from './controllers/AuthProvider.jsx'
import { SellerAuthProvider } from './controllers/sellerAuthContext.jsx'
import { StrictMode } from 'react'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SellerAuthProvider>
        <RouterProvider router={router} future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }} />
      </SellerAuthProvider>
    </AuthProvider>
  </StrictMode>,
)
