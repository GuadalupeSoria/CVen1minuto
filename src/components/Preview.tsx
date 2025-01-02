import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { FileText } from 'lucide-react'
import html2pdf from 'html2pdf.js'

const Preview: React.FC = () => {
  const { portfolioData } = usePortfolio()

  const exportPDF = () => {
    const element = document.querySelector('.preview-content')
    if (element) {
      const opt = {
        margin: [10, 10],
        filename: 'mi-portafolio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      html2pdf().set(opt).from(element).save()
    }
  }

  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <FileText size={20} />
            Exportar PDF
          </button>
        </div>

        <div className="preview-content bg-white p-8 rounded-xl shadow-lg" style={{ color: portfolioData.theme.primaryColor }}>
          <div className="flex items-center gap-8 mb-12">
            {portfolioData.photo && (
              <img
                src={portfolioData.photo}
                alt={portfolioData.name}
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{portfolioData.name}</h1>
              <h2 className="text-2xl text-gray-600">{portfolioData.title}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Sobre mí</h3>
                <p className="text-gray-700 leading-relaxed">{portfolioData.about}</p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Experiencia</h3>
                <div className="space-y-4">
                  {portfolioData.experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: portfolioData.theme.primaryColor }}>
                      <h4 className="font-semibold">{exp.position}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div>
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Proyectos</h3>
                <div className="space-y-4">
                  {portfolioData.projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{project.name}</h4>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: `${portfolioData.theme.primaryColor}15`,
                        color: portfolioData.theme.primaryColor
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview