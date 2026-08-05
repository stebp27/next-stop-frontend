# NextStop 🌍📍

[English](#english) | [Español](#español)

---

<a name="english"></a>

## English

### Overview

NextStop is a web application designed for travel enthusiasts to discover new global destinations, save locations they plan to visit, and mark countries they have already explored.

### Features

- Destination Discovery: Explore countries and detailed destination cards.
- Country Details Popup (`CountryPopup`): Displays detailed country information and capital images.
- Capital Image & Data Caching: Implements an in-memory/state caching mechanism to prevent redundant API queries when searching for country data or fetching capital images upon opening the `CountryPopup`.
- Personal Lists: Save destinations as "To Visit" or "Visited".
- Mock Authentication: Includes Login and Register flows powered by MockAPI.io (simulating authentication responses).
- Local Storage Integration: Persists user choices, visited/saved destinations, and user session state directly in the browser.

### Tech Stack

- Frontend: React (JSX/JS)
- Build Tool: Vite
- Styling: CSS3
- HTTP Client: Axios / Fetch API
- Mock API: MockAPI.io
- Storage & Caching: Browser `localStorage` & Client-side Caching State

### Upcoming Features

- Backend Integration: Implementation of a full-fledged 100% functional custom backend.
- Enhanced Authentication: Secure backend-driven authentication system replacing mock endpoints.

### Quick Start

1. Clone the repository:
   git clone https://github.com/stebp27/next-stop-frontend.git
   cd next-stop-frontend

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

---

<a name="español"></a>

## Español

### Descripción General

NextStop es una aplicación web diseñada para amantes de los viajes que permite descubrir nuevos destinos globales, guardarlos para visitar o marcarlos como ya visitados.

### Características Principales

- Descubrimiento de Destinos: Explora países y tarjetas detalladas de cada destino.
- Ventana Emergente de País (`CountryPopup`): Muestra información detallada del país e imágenes de su capital.
- Sistema de Caché para Imágenes y Búsquedas: Utiliza una caché en el cliente para evitar realizar peticiones repetitivas de búsqueda de países o de imágenes de la capital cada vez que se abre el `CountryPopup`.
- Listas Personalizadas: Guarda lugares en las listas de "Por visitar" o "Visitados".
- Autenticación Mock: Incluye flujos de Iniciar Sesión (Login) y Registro (Register) alimentados por MockAPI.io.
- Almacenamiento Local: Utiliza `localStorage` para guardar el estado del usuario y la lista de países interactuados de forma persistente.

### Tecnologías Utilizadas

- Frontend: React (JSX/JS)
- Herramienta de Construcción: Vite
- Estilos: CSS3
- Cliente HTTP: Axios / Fetch API
- Mock API: MockAPI.io
- Almacenamiento y Caché: `localStorage` del navegador y Estado de Caché local

### Próximas Funcionalidades

- Aplicar un sistema de login y registro y un backend 100% funcional.

### Instalación y Ejecución

1. Clonar el repositorio:
   git clone https://github.com/stebp27/next-stop-frontend.git
   cd next-stop-frontend

2. Instalar dependencias:
   npm install

3. Iniciar el servidor de desarrollo:
   npm run dev
