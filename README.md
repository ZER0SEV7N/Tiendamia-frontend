# 🛒 Tiendamia Clone - Front End Web

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

Este repositorio contiene el código fuente del **Front End** para el clon de la plataforma de e-commerce Tiendamia. Está diseñado para ofrecer una experiencia de usuario (UX) fluida e interactiva, consumiendo de manera eficiente los recursos de nuestra API RESTful en Spring Boot.

## 🎯 Objetivo del Proyecto
El propósito de esta capa cliente es replicar el flujo de navegación y compra de un e-commerce moderno. Permite a los usuarios explorar el catálogo de productos, gestionar su carrito de compras y completar el proceso de simulación de órdenes, garantizando una interfaz responsiva y un rendimiento optimizado en el navegador.

## 🏗️ Arquitectura y Separación de Lógica
Para asegurar que el código sea lo más accesible, mantenible y legible posible a medida que el proyecto escala, se ha implementado una estricta separación de responsabilidades en el árbol de directorios:

* **`components/`**: Contiene los bloques de construcción visuales de la interfaz (botones, tarjetas de productos, modales). Son reutilizables y agnósticos al contexto global.
* **`hooks/`**: Encapsula la lógica de estado complejo y los efectos secundarios, manteniendo a los componentes limpios y enfocados únicamente en el renderizado de la vista.
* **`services/`**: Capa dedicada exclusivamente a las peticiones HTTP hacia el Back End. Centraliza la comunicación con la API, de modo que si un endpoint cambia, solo se actualiza este archivo.
* **`json/` (y utilidades):** Archivos estáticos de configuración y datos simulados (mocks) que permiten agilizar el maquetado sin depender de respuestas en tiempo real del servidor.

## 🤝 Colaboración y Gestión (Git + Jira)
El equipo de desarrollo mantiene una trazabilidad completa y un flujo de trabajo ordenado, sincronizado con el Back End:

* La planificación de *features* visuales y flujos de usuario se administra en **Jira** mediante Sprints.
* Cada desarrollador utiliza **ramas independientes** para maquetar interfaces o integrar endpoints sin afectar el trabajo del resto.
* La rama **`scrum`** actúa como el entorno de prueba general (Staging). Aquí se resuelven los conflictos de UI y se realizan pruebas de integración antes de fusionar el código final en **`master`**.
* Cada *commit* incluye la referencia al ticket de Jira para documentar el motivo técnico o de negocio detrás del cambio.

## 🚀 Requisitos e Instalación

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/ZER0SEV7N/Tiendamia-frontend.git](https://github.com/ZER0SEV7N/Tiendamia-frontend.git)
   ```

2. Instalar las dependencias del ecosistema de Node:
 ```bash
 npm install
 ```
3. Configurar las variables de entorno. Crea un archivo .env en la raíz del proyecto para definir la URL base del backend (ej. VITE_API_URL=http://localhost:8080).

4. Levantar el servidor de desarrollo local:
```bash
npm run dev
```
5. La aplicación estará disponible en tu navegador local (usualmente en el puerto 3000 o 5173).