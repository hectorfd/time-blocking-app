"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import TodoList from "./components/TodoList"
import DailyPlans from "./components/DailyPlans"
import TopPriorities from "./components/TopPriorities"
import DontForget from "./components/DontForget"

function App() {
  // Estado para los proyectos (Todo List)
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects")
    return saved ? JSON.parse(saved) : []
  })

  // Estado para las tareas diarias
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  // Estado para el modo oscuro
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode === "true"
  })

  // Guardar en localStorage cuando cambian los estados
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  // Función para añadir un nuevo proyecto
  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now(), tasks: [] }])
  }

  // Añadir esta función después de la función addProject
  const deleteProject = (projectId) => {
    // Eliminar el proyecto
    setProjects(projects.filter((project) => project.id !== projectId))

    // También eliminar todas las tareas asociadas a ese proyecto
    setTasks(tasks.filter((task) => task.projectId !== projectId))
  }

  // Función para añadir una nueva tarea
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), priority: false, dontForget: false }])
  }

  // Función para eliminar una tarea
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  // Función para actualizar una tarea
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  // Función para marcar/desmarcar una tarea como prioridad
  const togglePriority = (taskId) => {
    // Contar cuántas prioridades ya tenemos
    const priorityCount = tasks.filter((task) => task.priority).length

    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          // Si ya es prioridad, simplemente la quitamos
          if (task.priority) {
            return { ...task, priority: false }
          }
          // Si no es prioridad y ya tenemos 3, no hacemos nada
          else if (priorityCount >= 3) {
            alert("Solo puedes tener 3 prioridades. Elimina una antes de añadir otra.")
            return task
          }
          // Si no es prioridad y tenemos menos de 3, la añadimos
          else {
            return { ...task, priority: true }
          }
        }
        return task
      }),
    )
  }

  // Función para marcar/desmarcar una tarea como "no olvidar"
  const toggleDontForget = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, dontForget: !task.dontForget } : task)))
  }

  // Obtener las tareas prioritarias (máximo 3)
  const priorityTasks = tasks.filter((task) => task.priority)

  // Obtener las tareas "no olvidar"
  const dontForgetTasks = tasks.filter((task) => task.dontForget)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TodoList projects={projects} addProject={addProject} deleteProject={deleteProject} />
            <DailyPlans
              tasks={tasks}
              projects={projects}
              addTask={addTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              togglePriority={togglePriority}
              toggleDontForget={toggleDontForget}
            />
          </div>
          <div className="space-y-6">
            <TopPriorities priorityTasks={priorityTasks} togglePriority={togglePriority} />
            <DontForget dontForgetTasks={dontForgetTasks} toggleDontForget={toggleDontForget} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
