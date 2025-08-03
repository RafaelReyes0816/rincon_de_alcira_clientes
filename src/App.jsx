import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import FormPage from './pages/FormPage'
import ContactPage from './pages/ContactPage'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
          <Header />
          
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/productos" element={<Navigate to="/" replace />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/formulario" element={<FormPage />} />
            <Route path="/contactos" element={<ContactPage />} />
            
            {/* Redirigir cualquier ruta no encontrada a la página principal */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
