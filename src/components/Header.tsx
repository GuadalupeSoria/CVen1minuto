import React from 'react'
import { Briefcase } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Briefcase className="mr-2" />
          <h1 className="text-2xl font-bold">Mi Portafolio</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200">Inicio</a></li>
            <li><a href="#" className="hover:text-blue-200">Acerca de</a></li>
            <li><a href="#" className="hover:text-blue-200">Proyectos</a></li>
            <li><a href="#" className="hover:text-blue-200">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header