import React, { useState, useMemo } from 'react'
import { useCart } from '../context/CartContext'

const ProductList = ({ products, onCheckout }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6
  const { addToCart, getCartItemCount } = useCart()

  // Filtrar productos por búsqueda
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products
    
    return products.filter(product =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [products, searchTerm])

  // Calcular productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Resetear página cuando cambia la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍰</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No hay productos disponibles</h2>
        <p className="text-gray-600">Pronto tendremos nuevos productos para ti</p>
      </div>
    )
  }

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
          
          {searchTerm && (
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                {filteredProducts.length !== products.length && (
                  <span> de {products.length} total</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
              <div className="text-6xl">🍰</div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.nombre}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {product.descripcion || 'Delicioso producto artesanal'}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-pink-600">
                  Bs. {product.precio_base}
                </span>
                <span className="text-sm text-gray-500">
                  Precio por unidad
                </span>
              </div>
              
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>🛒</span>
                <span>Agregar al Carrito</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botón "Cargar más" o paginación */}
      {filteredProducts.length > productsPerPage && (
        <div className="text-center mb-8">
          {currentPage < totalPages ? (
            <button
              onClick={handleLoadMore}
              className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Cargar más productos ({filteredProducts.length - currentProducts.length} restantes)
            </button>
          ) : (
            <div className="text-gray-600">
              <p>Has visto todos los productos disponibles</p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setCurrentPage(1)
                  }}
                  className="mt-2 text-pink-600 hover:text-pink-700 underline"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sin resultados de búsqueda */}
      {searchTerm && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600 mb-4">
            No hay productos que coincidan con "{searchTerm}"
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setCurrentPage(1)
            }}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium"
          >
            Ver todos los productos
          </button>
        </div>
      )}
      
      {/* Botón de checkout */}
      {getCartItemCount() > 0 && (
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-2xl">🛒</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Tienes {getCartItemCount()} producto{getCartItemCount() !== 1 ? 's' : ''} en tu carrito
                </h3>
                <p className="text-gray-600 text-sm">
                  Completa tu pedido llenando tus datos
                </p>
              </div>
            </div>
            
            <button
              onClick={onCheckout}
              className="bg-purple-600 text-white py-4 px-8 rounded-lg hover:bg-purple-700 transition-colors font-bold text-lg flex items-center space-x-2 mx-auto"
            >
              <span>📋</span>
              <span>Completar Pedido</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList 