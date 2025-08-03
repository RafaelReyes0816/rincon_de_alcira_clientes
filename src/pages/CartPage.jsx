import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cart from '../components/Cart'
import { useCart } from '../context/CartContext'

const CartPage = () => {
  const navigate = useNavigate()
  const { 
    cart, 
    customerInfo, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal
  } = useCart()

  const generateWhatsAppMessage = () => {
    if (!customerInfo || cart.length === 0) return ''

    const items = cart.map(item => 
      `• ${item.nombre} - Cantidad: ${item.quantity} - Bs. ${item.precio_base * item.quantity}`
    ).join('\n')

    const total = getCartTotal()
    
    const message = `🍰 *PEDIDO - El Rincón de Alcira* 🍰

👤 *Cliente:* ${customerInfo.nombre} ${customerInfo.apellido}
📍 *Dirección:* ${customerInfo.direccion}
📱 *Teléfono:* ${customerInfo.telefono}

🛒 *Productos:*
${items}

💰 *Total: Bs. ${total}*

📝 *Notas:* ${customerInfo.notas || 'Sin notas adicionales'}

¡Gracias por tu pedido! 🎉`

    return encodeURIComponent(message)
  }

  const sendWhatsAppOrder = () => {
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/59179275835?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleEditCustomerInfo = () => {
    navigate('/formulario')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Cart 
          cart={cart}
          customerInfo={customerInfo}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onBack={handleBack}
          onSendWhatsApp={sendWhatsAppOrder}
          total={getCartTotal()}
          onEditCustomerInfo={handleEditCustomerInfo}
        />
      </div>
    </div>
  )
}

export default CartPage 