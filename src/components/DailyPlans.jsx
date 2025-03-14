"use client";

import { useState } from "react";
import { Plus, Trash2, Star, BookmarkCheck, ChevronDown, ChevronUp, Clock } from "lucide-react";
import TimerComponent from "./TimerComponent";

const DailyPlans = ({ tasks, projects, addTask, deleteTask, updateTask, togglePriority, toggleDontForget }) => {
  const [newTask, setNewTask] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask({
        title: newTask.trim(),
        projectId: selectedProject || null,
        timeEstimate: timeEstimate || "30m",
        completed: false,
      });
      setNewTask("");
      setTimeEstimate("");
    }
  };

  const handleToggleComplete = (task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow border border-gray-200 dark:border-gray-700 p-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <span>Daily Plans</span>
        </h2>
      </div>

      {isExpanded && (
        <>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="flex gap-3">
              {/* Input de nueva tarea */}
              <input
                type="text"
                className="flex-grow border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Nueva tarea..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              {/* Botón de agregar */}
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors"
                aria-label="Agregar tarea"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="flex gap-3">
              {/* Select de proyectos */}
              <select
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Sin proyecto</option>
                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {project.name}
                  </option>
                ))}
              </select>

              {/* Input de estimación de tiempo */}
              <div className="relative flex items-center">
                <Clock size={16} className="absolute left-3 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  className="pl-8 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="30min"
                  value={timeEstimate}
                  onChange={(e) => setTimeEstimate(e.target.value)}
                />
              </div>
            </div>
          </form>

          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No hay tareas. ¡Añade una!
              </p>
            ) : (
              tasks.map((task) => {
                const project = projects.find((p) => p.id === task.projectId);
                return (
                  <div
                    key={task.id}
                    className={`p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-opacity ${
                      task.completed ? "opacity-60" : "opacity-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600"
                      />

                      <div className="flex-grow min-w-0">
                        <div className={`text-gray-800 dark:text-gray-200 ${task.completed ? "line-through" : ""}`}>
                          {task.title}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {project && <span>{project.name}</span>}
                          {task.timeEstimate && (
                            <span className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {task.timeEstimate}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => togglePriority(task.id)}
                          className={`p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                            task.priority ? "text-yellow-500" : "text-gray-500"
                          }`}
                          aria-label="Marcar como prioridad"
                        >
                          <Star size={18} fill={task.priority ? "currentColor" : "none"} />
                        </button>

                        <button
                          onClick={() => toggleDontForget(task.id)}
                          className={`p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                            task.dontForget ? "text-blue-500" : "text-gray-500"
                          }`}
                          aria-label="Marcar como recordatorio"
                        >
                          <BookmarkCheck size={18} fill={task.dontForget ? "currentColor" : "none"} />
                        </button>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1.5 rounded-md text-gray-500 hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-600 transition-colors"
                          aria-label="Eliminar tarea"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {!task.completed && task.timeEstimate && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <TimerComponent timeEstimate={task.timeEstimate} taskTitle={task.title} />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DailyPlans;
