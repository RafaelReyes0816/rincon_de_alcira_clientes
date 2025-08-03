import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomerForm from '../components/CustomerForm'
import { useCart } from '../context/CartContext'

const FormPage = () => {
  const navigate = useNavigate()
  const { customerInfo, setCustomerInfo, getCartItemCount } = useCart()

  const handleSubmit = (customerData) => {
    setCustomerInfo(customerData)
    navigate('/carrito')
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <CustomerForm 
          onSubmit={handleSubmit}
          onBack={handleBack}
          cartItemCount={getCartItemCount()}
          initialData={customerInfo}
        />
      </div>
    </div>
  )
}

export default FormPage 