"use client"

import { useState } from "react"
import { Star, ChevronDown, ChevronUp, Clock } from "lucide-react"

const TopPriorities = ({ priorityTasks, togglePriority }) => {
  const [isExpanded, setIsExpanded] = useState(true)

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
          Top 3 Priorities
          <Star size={18} className="ml-2 text-yellow-500" fill="currentColor" />
        </h2>
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {priorityTasks.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 my-4">
              No hay prioridades. Marca tareas con estrella.
            </p>
          ) : (
            priorityTasks.map((task) => (
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
                  onClick={() => togglePriority(task.id)}
                  className="p-1 rounded-full text-yellow-500"
                  aria-label="Remove from priorities"
                >
                  <Star size={18} fill="currentColor" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default TopPriorities

