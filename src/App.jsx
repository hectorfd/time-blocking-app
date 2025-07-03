"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import DailyPlans from "./components/DailyPlans";
import TopPriorities from "./components/TopPriorities";
import DontForget from "./components/DontForget";
import Swal from "sweetalert2";

function App() {
  // Estado para los proyectos (Todo List)
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  // Estado para las tareas diarias
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cuando cambian los estados
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Función para añadir un nuevo proyecto
  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now(), tasks: [] }]);
  };

  // **Nueva función para eliminar proyectos**
  const deleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  // Función para añadir una nueva tarea
  const addTask = (task) => {
    setTasks([
      ...tasks,
      { ...task, id: Date.now(), priority: false, dontForget: false },
    ]);
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Función para actualizar una tarea
  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Función para marcar/desmarcar una tarea como prioridad
  const togglePriority = (taskId) => {
    const priorityCount = tasks.filter((task) => task.priority).length;
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          if (task.priority) {
            return { ...task, priority: false };
          } else if (priorityCount >= 3) {
            Swal.fire({
              title: "Too many priorities!",
              text: "You can only have 3 priorities. Remove one before adding another.",
              icon: "warning",
              confirmButtonText: "Ok",
            });
            return task;
          } else {
            return { ...task, priority: true };
          }
        }
        return task;
      })
    );
  };

  // Función para marcar/desmarcar una tarea como "no olvidar"
  const toggleDontForget = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, dontForget: !task.dontForget }
          : task
      )
    );
  };

  // Obtener las tareas prioritarias (máximo 3)
  const priorityTasks = tasks.filter((task) => task.priority);
  // Obtener las tareas "no olvidar"
  const dontForgetTasks = tasks.filter((task) => task.dontForget);

  return (
    <div className="min-h-screen bg-background text-foreground"> {/* Usar variables de tema */}
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            
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
          <TodoList
              projects={projects}
              addProject={addProject}
              deleteProject={deleteProject}
            />
            <TopPriorities
              priorityTasks={priorityTasks}
              togglePriority={togglePriority}
            />
            <DontForget
              dontForgetTasks={dontForgetTasks}
              toggleDontForget={toggleDontForget}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
