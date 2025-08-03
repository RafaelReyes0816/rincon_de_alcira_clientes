import React from 'react'

const ContactPage = ({ onBack }) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola! Me gustaría hacer un pedido')
    const whatsappUrl = `https://wa.me/59170012345?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleCallClick = () => {
    window.open('tel:+59170012345', '_blank')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 text-center">
          <div className="text-5xl mb-4">📞</div>
          <h1 className="text-3xl font-bold mb-2">Contáctanos</h1>
          <p className="text-pink-100 text-lg">
            Estamos aquí para atenderte y hacer tus pedidos especiales
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Información de Contacto */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <p className="text-gray-600">+591 792 758 35</p>
                    <button
                      onClick={handleWhatsAppClick}
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      Chatear por WhatsApp
                    </button>
                  </div>
                </div>

                                 <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                   <div className="text-2xl">📞</div>
                   <div>
                     <h3 className="font-semibold text-gray-800">Teléfono</h3>
                     <p className="text-gray-600">+591 700 123 45</p>
                    <button
                      onClick={handleCallClick}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Llamar Ahora
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Ubicación</h3>
                    <p className="text-gray-600">Tarija, Yacuiba Bolivia</p>
                    <p className="text-gray-500 text-sm">Calle Comercio entre Sucre y Crevaux</p>
                    <p className="text-gray-500 text-sm">Frente a la joyería Panamá</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">🕒</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Horarios de Atención</h3>
                    <p className="text-gray-600">Lunes a Sábado</p>
                    <p className="text-gray-600">8:00 AM - 8:00 PM</p>
                    <p className="text-gray-500 text-sm">Domingos: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sobre Nosotros</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h3 className="font-semibold text-pink-800 mb-2">🍰 El Rincón de Alcira</h3>
                  <p className="text-pink-700 text-sm">
                    Somos una repostería artesanal especializada en pasteles, dulces y postres 
                    hechos con ingredientes frescos y de la mejor calidad.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">🎂 Nuestros Servicios</h3>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Pasteles personalizados</li>
                    <li>• Dulces artesanales</li>
                    <li>• Postres especiales</li>
                    <li>• Pedidos a domicilio</li>
                    <li>• Eventos y celebraciones</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">💡 Consejos para Pedidos</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Realiza tu pedido con anticipación</li>
                    <li>• Especifica sabores y decoraciones</li>
                    <li>• Incluye fecha y hora de entrega</li>
                    <li>• Menciona si es para alguna ocasión especial</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de Volver */}
          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
            >
              ← Volver a Productos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage 