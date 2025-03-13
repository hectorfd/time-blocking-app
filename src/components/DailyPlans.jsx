"use client"

import { useState } from "react"
import { Plus, Trash2, Star, BookmarkCheck, ChevronDown, ChevronUp, Clock } from "lucide-react"

const DailyPlans = ({ tasks, projects, addTask, deleteTask, updateTask, togglePriority, toggleDontForget }) => {
  const [newTask, setNewTask] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [timeEstimate, setTimeEstimate] = useState("")
  const [isExpanded, setIsExpanded] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      addTask({
        title: newTask.trim(),
        projectId: selectedProject || null,
        timeEstimate: timeEstimate || "30min",
        completed: false,
      })
      setNewTask("")
      setTimeEstimate("")
    }
  }

  const handleToggleComplete = (task) => {
    updateTask({ ...task, completed: !task.completed })
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
          Daily Plans
        </h2>
      </div>

      {isExpanded && (
        <>
          <form onSubmit={handleSubmit} className="space-y-3 mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                className="input flex-grow"
                placeholder="Nueva tarea..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-icon" aria-label="Add task">
                <Plus size={20} />
              </button>
            </div>

            <div className="flex gap-2">
              <select className="input" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                <option value="">Sin proyecto</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>

              <div className="relative flex items-center">
                <Clock size={16} className="absolute left-2 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  className="input pl-8"
                  placeholder="30min"
                  value={timeEstimate}
                  onChange={(e) => setTimeEstimate(e.target.value)}
                />
              </div>
            </div>
          </form>

          <div className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 my-4">No hay tareas. ¡Añade una!</p>
            ) : (
              tasks.map((task) => {
                const project = projects.find((p) => p.id === task.projectId)

                return (
                  <div
                    key={task.id}
                    className={`p-3 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center gap-2 ${
                      task.completed ? "opacity-60" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      className="h-5 w-5 rounded border-gray-300 dark:border-gray-600"
                    />

                    <div className="flex-grow">
                      <div className={`${task.completed ? "line-through" : ""}`}>{task.title}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        {project && <span>{project.name}</span>}
                        {task.timeEstimate && (
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {task.timeEstimate}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => togglePriority(task.id)}
                        className={`p-1 rounded-full ${task.priority ? "text-yellow-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
                        aria-label={task.priority ? "Remove from priorities" : "Add to priorities"}
                      >
                        <Star size={18} fill={task.priority ? "currentColor" : "none"} />
                      </button>

                      <button
                        onClick={() => toggleDontForget(task.id)}
                        className={`p-1 rounded-full ${task.dontForget ? "text-[rgb(var(--color-primary))]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
                        aria-label={task.dontForget ? "Remove from don't forget" : "Add to don't forget"}
                      >
                        <BookmarkCheck size={18} fill={task.dontForget ? "currentColor" : "none"} />
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 rounded-full text-gray-400 hover:text-[rgb(var(--color-danger))]"
                        aria-label="Delete task"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default DailyPlans

