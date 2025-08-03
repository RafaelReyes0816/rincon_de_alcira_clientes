import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        }
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      }

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.productId)
        }
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        customerInfo: null
      }

    case 'SET_CUSTOMER_INFO':
      return {
        ...state,
        customerInfo: action.payload
      }

    case 'LOAD_CART_FROM_STORAGE':
      return {
        ...state,
        cart: action.payload.cart || [],
        customerInfo: action.payload.customerInfo || null
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
    customerInfo: null
  })

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('reposteria-cart')
    const savedCustomerInfo = localStorage.getItem('reposteria-customer-info')
    
    if (savedCart || savedCustomerInfo) {
      dispatch({
        type: 'LOAD_CART_FROM_STORAGE',
        payload: {
          cart: savedCart ? JSON.parse(savedCart) : [],
          customerInfo: savedCustomerInfo ? JSON.parse(savedCustomerInfo) : null
        }
      })
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('reposteria-cart', JSON.stringify(state.cart))
  }, [state.cart])

  // Guardar información del cliente en localStorage cuando cambie
  useEffect(() => {
    if (state.customerInfo) {
      localStorage.setItem('reposteria-customer-info', JSON.stringify(state.customerInfo))
    } else {
      localStorage.removeItem('reposteria-customer-info')
    }
  }, [state.customerInfo])

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const setCustomerInfo = (customerInfo) => {
    dispatch({ type: 'SET_CUSTOMER_INFO', payload: customerInfo })
  }

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.precio_base * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cart: state.cart,
    customerInfo: state.customerInfo,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCustomerInfo,
    getCartTotal,
    getCartItemCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 