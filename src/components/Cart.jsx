import React from 'react'

const Cart = ({ 
  cart, 
  customerInfo, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  onBack, 
  onSendWhatsApp, 
  total,
  onEditCustomerInfo
}) => {
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-6">
            Agrega algunos productos deliciosos para continuar
          </p>
          <button
            onClick={onBack}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium"
          >
            ← Volver a Productos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">🛒 Tu Carrito</h2>
              <p className="text-pink-100">
                {cart.length} producto{cart.length !== 1 ? 's' : ''} seleccionado{cart.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={onClearCart}
              className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              🗑️ Vaciar Carrito
            </button>
          </div>
        </div>

        {/* Customer Info */}
        {customerInfo ? (
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">👤 Información del Cliente</h3>
              <button
                onClick={onEditCustomerInfo}
                className="text-pink-600 hover:text-pink-700 text-sm font-medium"
              >
                ✏️ Editar Datos
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Nombre:</span>
                <span className="ml-2 text-gray-800">{customerInfo.nombre} {customerInfo.apellido}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Celular:</span>
                <span className="ml-2 text-gray-800">{customerInfo.telefono}</span>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-600">Dirección:</span>
                <span className="ml-2 text-gray-800">{customerInfo.direccion}</span>
              </div>
              {customerInfo.notas && (
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-600">Notas:</span>
                  <span className="ml-2 text-gray-800">{customerInfo.notas}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-yellow-50 border-b border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="text-yellow-600 text-xl">⚠️</div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">Datos del Cliente Requeridos</h3>
                <p className="text-yellow-700 text-sm">
                  Necesitas completar tus datos antes de enviar el pedido
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="p-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">🍰</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.nombre}</h4>
                    <p className="text-sm text-gray-600">
                      Bs. {item.precio_base} por unidad
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                                     <div className="text-right">
                     <div className="font-semibold text-gray-800">
                       Bs. {(item.precio_base * item.quantity).toFixed(2)}
                     </div>
                   </div>
                  
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total and Actions */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-semibold text-gray-800">Total del Pedido:</span>
            <span className="text-3xl font-bold text-pink-600">Bs. {total.toFixed(2)}</span>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              ← Seguir Comprando
            </button>
            
            {customerInfo ? (
              <button
                onClick={onSendWhatsApp}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>📱</span>
                <span>Enviar Pedido por WhatsApp</span>
              </button>
            ) : (
              <button
                onClick={onEditCustomerInfo}
                className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>📋</span>
                <span>Completar Datos del Cliente</span>
              </button>
            )}
          </div>
          
          <div className="mt-4 text-center">
            {customerInfo ? (
              <p className="text-sm text-gray-600">
                Al hacer clic en "Enviar Pedido por WhatsApp" se abrirá una conversación 
                con todos los detalles de tu pedido para que puedas confirmarlo.
              </p>
            ) : (
              <p className="text-sm text-yellow-600">
                Primero debes completar tus datos personales antes de enviar el pedido.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart 