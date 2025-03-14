"use client";

import { useState } from "react";
import { BookmarkCheck, ChevronDown, ChevronUp, Clock } from "lucide-react";

const DontForget = ({ dontForgetTasks, toggleDontForget }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow border border-gray-200 dark:border-gray-700 p-4 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 focus:outline-none"
            aria-label={isExpanded ? "Contraer sección" : "Expandir sección"}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          Don't Forget
          <BookmarkCheck size={18} className="ml-2 text-blue-500" fill="currentColor" />
        </h2>
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {dontForgetTasks.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 my-4">
              No hay elementos. Marca tareas con el icono de marcador.
            </p>
          ) : (
            dontForgetTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center gap-2 ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <div className="flex-grow">
                  <div className={`${task.completed ? "line-through" : ""}`}>{task.title}</div>
                  {task.timeEstimate && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="mr-1" />
                      {task.timeEstimate}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleDontForget(task.id)}
                  className="p-1 rounded-full text-blue-500"
                  aria-label="Quitar recordatorio"
                >
                  <BookmarkCheck size={18} fill="currentColor" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DontForget;
