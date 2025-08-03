import React from 'react'
import { useNavigate } from 'react-router-dom'
import ContactPageComponent from '../components/ContactPage'

const ContactPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <ContactPageComponent onBack={handleBack} />
      </div>
    </div>
  )
}

export default ContactPage 