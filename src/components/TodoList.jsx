"use client"

import { useState } from "react"
import { Plus, ChevronDown, ChevronUp, Trash2 } from "lucide-react"

const TodoList = ({ projects, addProject, deleteProject }) => {
  const [newProject, setNewProject] = useState("")
  const [isExpanded, setIsExpanded] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newProject.trim()) {
      addProject({ name: newProject.trim() })
      setNewProject("")
    }
  }

  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 focus:outline-none"
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          Todo List (Proyectos)
        </h2>
      </div>

      {isExpanded && (
        <>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              className="input flex-grow"
              placeholder="Nuevo proyecto..."
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-icon" aria-label="Add project">
              <Plus size={20} />
            </button>
          </form>

          <div className="space-y-2">
            {projects.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 my-4">No hay proyectos. ¡Añade uno!</p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md flex justify-between items-center"
                >
                  <span>{project.name}</span>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-1 rounded-full text-gray-400 hover:text-[rgb(var(--color-danger))]"
                    aria-label="Delete project"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default TodoList