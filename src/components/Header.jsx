"use client";

import React, { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark"); // Para compatibilidad con Tailwind y estilos directos .dark
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.classList.remove("dark"); // Para compatibilidad con Tailwind y estilos directos .dark
    }
    // Guardar la preferencia en localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]); // Se ejecuta cuando darkMode cambia y también al montar si darkMode se inicializa desde localStorage

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Determinar el color de los iconos basado en el tema, usando variables CSS si es posible,
  // o manteniendo una lógica simple si las clases directas de Tailwind son más claras aquí.
  // Las clases text-foreground o text-primary-foreground podrían ser opciones.
  // Por ahora, text-gray-900 dark:text-gray-100 es bastante explícito y funciona bien.
  // Si quisiéramos usar variables CSS: text-foreground o similar.
  // const iconColorClass = darkMode ? "text-primary" : "text-primary"; // o text-foreground

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Time Blocking Hector</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-muted transition-colors" // Usar bg-muted para hover
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="text-foreground" size={20} /> // Usar text-foreground para el icono
          ) : (
            <Moon className="text-foreground" size={20} /> // Usar text-foreground para el icono
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
