import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Download, Share2, FileText } from 'lucide-react'
import html2pdf from 'html2pdf.js'

const Footer: React.FC = () => {
  const { portfolioData } = usePortfolio()

  const exportPortfolio = () => {
    
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
          .skills { display: flex; flex-wrap: wrap; gap: 6px; }
          .skill { display: inline-block; padding: 0 6px; color: #374151; background: transparent; border-radius: 0; font-size: 12px; line-height: 1.2; }
          .contact-line { margin: 4px 0; }
          .project-skills { display:flex; flex-wrap:wrap; gap:6px; margin-top:6px; }
          .project-skills .skill { padding: 3px 8px; border-radius: 12px; font-size: 12px; }
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
                <li style="margin-bottom: 8px;">
                  <strong>${project.name}</strong> ${project.startMonth || project.startYear || project.endMonth || project.endYear ? ` - <small>${[project.startMonth, project.startYear].filter(Boolean).join(' ')} ${project.startMonth || project.startYear ? '-' : ''} ${[project.endMonth, project.endYear].filter(Boolean).join(' ')}</small>` : ''}
                  <div>${project.description || ''}</div>
                  ${project.skills && project.skills.length ? `<div class="project-skills">${project.skills.map(s => `<span class="skill">${s}</span>`).join('')}</div>` : ''}
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
                <span style="font-size: 14px; color: #6b7280;">${[exp.startMonth, exp.startYear].filter(Boolean).join(' ')} ${exp.startMonth || exp.startYear ? '-' : ''} ${[exp.endMonth, exp.endYear].filter(Boolean).join(' ')} ${exp.duration ? exp.duration : ''}</span>
                ${exp.description ? `<div style="margin-top:6px;">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
          <div class="section">
            <h3>Educación</h3>
            ${portfolioData.education && portfolioData.education.length ? portfolioData.education.map(ed => `
              <div style="margin-bottom:10px;">
                <strong>${ed.institution}</strong> - ${ed.degree}
                <br>
                <span style="font-size:14px;color:#6b7280;">${[ed.startMonth, ed.startYear].filter(Boolean).join(' ')} ${ed.startMonth || ed.startYear ? '-' : ''} ${[ed.endMonth, ed.endYear].filter(Boolean).join(' ')}</span>
                ${ed.description ? `<div style="margin-top:6px;">${ed.description}</div>` : ''}
              </div>
            `).join('') : '<p>No hay educación agregada.</p>'}
          </div>
          ${portfolioData.skills && portfolioData.skills.length ? `
          <div class="section">
            <h3>Habilidades</h3>
            <div class="skills">
              ${portfolioData.skills.map(skill => `
                <span class="skill">${skill}</span>
              `).join('')}
            </div>
          </div>
          ` : ''}
          <div class="section">
            <h3>Contacto</h3>
            ${portfolioData.contact?.email ? `<div class="contact-line"><a href="mailto:${portfolioData.contact.email}" style="color: #374151; text-decoration: underline;">${portfolioData.contact.email}</a></div>` : ''}
            ${portfolioData.contact?.phone ? `<div class="contact-line"><span style="color: #374151;">${portfolioData.contact.phone}</span></div>` : ''}
            ${portfolioData.contact?.address ? `<div class="contact-line"><span style="color: #374151;">${portfolioData.contact.address}</span></div>` : ''}
            ${portfolioData.contact?.website ? `<div class="contact-line"><a href="${portfolioData.contact.website.startsWith('http') ? portfolioData.contact.website : `https://${portfolioData.contact.website}` }" style="color:#374151;text-decoration:underline;" target="_blank" rel="noreferrer">${portfolioData.contact.website}</a></div>` : ''}
            ${portfolioData.contact?.linkedin ? `<div class="contact-line"><a href="${portfolioData.contact.linkedin.startsWith('http') ? portfolioData.contact.linkedin : `https://${portfolioData.contact.linkedin}` }" style="color:#374151;text-decoration:underline;" target="_blank" rel="noreferrer">${portfolioData.contact.linkedin}</a></div>` : ''}
          </div>

          ${portfolioData.languages && portfolioData.languages.length ? `
          <div class="section">
            <h3>Idiomas</h3>
            ${portfolioData.languages.map(l => `<div><strong>${l.name}</strong>${l.level ? ` - <small>${l.level}</small>` : ''}</div>`).join('')}
          </div>
          ` : ''}
        </div>
      `

      html2pdf().set(opt).from(content).save()
    } else {
      console.error('No se encontró el contenido del portafolio para exportar a PDF')
    }
  }

  const sharePortfolio = () => {
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