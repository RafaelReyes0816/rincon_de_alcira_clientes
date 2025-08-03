import React, { useState, useEffect } from 'react'
import Modal from './Modal'

const CustomerForm = ({ onSubmit, onBack, cartItemCount, initialData = null }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    notas: ''
  })
  const [errors, setErrors] = useState({})
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // Pre-fill form if editing existing data
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }
    
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido'
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El celular es requerido'
    } else if (!/^\d{8}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Ingresa un número de celular válido (8 dígitos)'
    }
    
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setShowConfirmModal(true)
    }
  }

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false)
    onSubmit(formData)
  }

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {initialData ? 'Editar Información' : 'Información del Cliente'}
            </h2>
            <p className="text-gray-600 mb-4">
              {initialData ? 'Modifica tus datos si es necesario' : 'Completa tus datos para procesar tu pedido'}
            </p>
            
            {/* Cart Summary */}
            <div className="bg-pink-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-pink-600 text-lg">🛒</span>
                <span className="text-pink-800 font-medium">
                  {cartItemCount} producto{cartItemCount !== 1 ? 's' : ''} en tu carrito
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido *
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.apellido ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu apellido"
                />
                {errors.apellido && (
                  <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
                )}
              </div>
            </div>

            <div>
                          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
              Celular *
            </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.telefono ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: 70012345"
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
              )}
            </div>

            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                Dirección de Entrega *
              </label>
              <textarea
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.direccion ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Dirección completa para la entrega"
              />
              {errors.direccion && (
                <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
              )}
            </div>

            <div>
              <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-2">
                Notas Adicionales (Opcional)
              </label>
              <textarea
                id="notas"
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Instrucciones especiales, horarios de entrega, etc."
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                ← {initialData ? 'Volver al Carrito' : 'Volver a Productos'}
              </button>
              
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
              >
                {initialData ? 'Actualizar Datos' : 'Revisar Pedido'} →
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Datos del Cliente"
        onConfirm={handleConfirmSubmit}
        confirmText="Confirmar Datos"
        cancelText="Editar"
      >
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-gray-600">
              Por favor, revisa que tus datos estén correctos antes de continuar:
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div>
              <span className="font-medium text-gray-700">Nombre completo:</span>
              <p className="text-gray-800">{formData.nombre} {formData.apellido}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Teléfono:</span>
              <p className="text-gray-800">{formData.telefono}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Dirección:</span>
              <p className="text-gray-800">{formData.direccion}</p>
            </div>
            
            {formData.notas && (
              <div>
                <span className="font-medium text-gray-700">Notas adicionales:</span>
                <p className="text-gray-800">{formData.notas}</p>
              </div>
            )}
          </div>
          
          <div className="bg-pink-50 rounded-lg p-3">
            <p className="text-sm text-pink-800 text-center">
              🛒 {cartItemCount} producto{cartItemCount !== 1 ? 's' : ''} en tu carrito
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CustomerForm 