import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Download, Share2, FileText } from 'lucide-react'
import html2pdf from 'html2pdf.js'

const Footer: React.FC = () => {
  const { portfolioData } = usePortfolio()

  const exportPortfolio = () => {
    // ... (sin cambios en la función exportPortfolio) ...
  }

  const exportPDF = () => {
    const element = document.querySelector('.preview-content')
    if (element) {
      const opt = {
        margin: [10, 10],
        filename: 'mi-portafolio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      }

      const content = `
        <style>
          body {
            font-family: 'Helvetica', sans-serif;
            color: ${portfolioData.theme.primaryColor};
            line-height: 1.6;
          }
          h1 { font-size: 24px; margin-bottom: 10px; }
          h2 { font-size: 20px; margin-bottom: 8px; }
          h3 { font-size: 18px; margin-bottom: 6px; }
          p { margin-bottom: 10px; }
          .section { margin-bottom: 20px; }
          .profile-image { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }
          .skills { display: flex; flex-wrap: wrap; gap: 5px; }
          .skill { background-color: #e0e7ff; color: #3b82f6; padding: 3px 8px; border-radius: 15px; font-size: 12px; }
        </style>
        <div>
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            ${portfolioData.photo ? `<img src="${portfolioData.photo}" alt="${portfolioData.name}" class="profile-image" style="margin-right: 20px;">` : ''}
            <div>
              <h1>${portfolioData.name}</h1>
              <h2 style="color: #4b5563;">${portfolioData.title}</h2>
            </div>
          </div>
          <div class="section">
            <h3>Acerca de mí</h3>
            <p>${portfolioData.about}</p>
          </div>
          <div class="section">
            <h3>Proyectos</h3>
            <ul>
              ${portfolioData.projects.map(project => `
                <li>
                  <strong>${project.name}</strong> - ${project.description}
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="section">
            <h3>Experiencia</h3>
            ${portfolioData.experience.map(exp => `
              <div style="margin-bottom: 10px;">
                <strong>${exp.company}</strong> - ${exp.position}
                <br>
                <span style="font-size: 14px; color: #6b7280;">${exp.duration}</span>
              </div>
            `).join('')}
          </div>
          <div class="section">
            <h3>Habilidades</h3>
            <div class="skills">
              ${portfolioData.skills.map(skill => `
                <span class="skill">${skill}</span>
              `).join('')}
            </div>
          </div>
          <div class="section">
            <h3>Contacto</h3>
            <p>Email: ${portfolioData.contact.email}</p>
            <p>Teléfono: ${portfolioData.contact.phone}</p>
            <p>LinkedIn: <a href="${portfolioData.contact.linkedin}" style="color: #3b82f6;">${portfolioData.contact.linkedin}</a></p>
          </div>
        </div>
      `

      html2pdf().set(opt).from(content).save()
    } else {
      console.error('No se encontró el contenido del portafolio para exportar a PDF')
    }
  }

  const sharePortfolio = () => {
    // Aquí implementarías la lógica para compartir en redes sociales
    alert('Función de compartir en desarrollo')
  }

  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2024 Mi Portafolio. Todos los derechos reservados.</p>
        <div className="space-x-4">
          <button
            onClick={exportPortfolio}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Download className="mr-2" />
            Exportar HTML
          </button>
          <button
            onClick={exportPDF}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FileText className="mr-2" />
            Exportar PDF
          </button>
          <button
            onClick={sharePortfolio}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Share2 className="mr-2" />
            Compartir
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer