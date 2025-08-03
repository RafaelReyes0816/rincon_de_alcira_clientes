import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Header = () => {
  const navigate = useNavigate()
  const { getCartItemCount } = useCart()

  return (
    <header className="bg-white shadow-lg border-b-4 border-pink-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="text-3xl">🍰</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">El Rincón de Alcira</h1>
              <p className="text-sm text-gray-600">Repostería Artesanal - Bolivia</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              Productos
            </Link>
            
            <Link
              to="/contactos"
              className="px-4 py-2 text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              Contactos
            </Link>
            
            <button
              onClick={() => navigate('/carrito')}
              className="relative px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium flex items-center space-x-2"
            >
              <span>🛒</span>
              <span>Carrito</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 