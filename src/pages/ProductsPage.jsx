import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import ProductList from '../components/ProductList'

import { useNavigate } from 'react-router-dom'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('productos_publicos')
        .select('*')
        .order('nombre')

      if (error) {
        console.error('Error fetching products:', error)
      } else {
        setProducts(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = () => {
    navigate('/formulario')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🍰 El Rincón de Alcira 🍰
          </h1>
          <p className="text-gray-600 text-lg">
            Los mejores pasteles y dulces artesanales
          </p>
        </div>

        <ProductList 
          products={products} 
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  )
}

export default ProductsPage 