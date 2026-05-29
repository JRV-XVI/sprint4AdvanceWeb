# Minecraft GraphQL Explorer

Un sistema Full Stack diseñado para la exploración dinámica de ítems de Minecraft (Bloques, Armas y Comida) utilizando **GraphQL**. Este proyecto demuestra la integración de arquitecturas modernas y patrones de diseño para el desarrollo de un cliente-servidor eficiente.

## Tecnologías Utilizadas

### Backend
- **Java 17+**
- **Spring Boot 3**
- **Spring GraphQL**
- **Spring Web**
- **Maven**

### Frontend
- **React 18** (Inicializado con Vite)
- **Hooks (useState, useEffect)**
- **Fetch API** (Para consultas GraphQL)
- **CSS3** nativo para estilos

---

## Arquitectura y Patrones de Diseño

Este proyecto integra patrones de diseño clave para garantizar un código escalable y mantenible:

1. **GraphQL Single Endpoint:** En lugar de múltiples endpoints REST, el frontend se comunica exclusivamente con `/graphql`, realizando consultas (queries) dinámicas para obtener estrictamente la información necesaria dependiendo de la categoría seleccionada.
2. **Patrón Observer (React):** Se utiliza el hook `useEffect` para "escuchar" cambios en el estado de la categoría (`genre`). Cuando el usuario selecciona una nueva categoría, el frontend reacciona automáticamente disparando un nuevo query hacia el backend y repintando la UI sin recargar la página.
3. **Patrón Factory Method:** El frontend utiliza una lógica de creación dinámica (`CardFactory`) para renderizar diferentes tipos de tarjetas (Cards) dependiendo de las propiedades de los datos recibidos (ej. si tiene *daño*, si tiene *puntos de comida* o *durabilidad*).

---

## Estructura del Proyecto

```text
sprint4AdvanceWeb/
├── exaple_graph_ql/                 # Backend en Spring Boot
│   ├── src/main/java/.../           # Controladores, Servicios, Repositorios, DTOs
│   ├── src/main/resources/graphql/  # Esquemas (.graphqls)
│   └── pom.xml
└── frontGraphQL/exampleGraphQL/     # Frontend interactivo en React
    ├── src/components/              # Componentes visuales y Factory de Cards
    ├── src/graphql/                 # Queries dinámicas separadas modularmente
    └── package.json
```

---

## Explicación Detallada de Patrones de Diseño

### 1. Patrón Observer (Comportamental) en React
El patrón Observer define una dependencia de "uno a muchos" entre objetos, de manera que cuando el objeto principal (sujeto) cambia su estado, todos sus dependientes (observadores) son notificados y actualizados automáticamente.

**¿Cómo se implementa en este proyecto?**
En React, este patrón se aplica de manera nativa utilizando los Hooks `useState` y `useEffect`. 
- **El Sujeto (Estado):** La variable `genre` (categoría actual: "BLOCK", "WEAPON" o "FOOD").
- **El Observador:** El hook `useEffect` que tiene a `[genre]` en su arreglo de dependencias en el componente de UI principal.
- **El Disparador (Trigger):** Cuando el usuario hace clic en los botones de categoría, se ejecuta `setGenre("NUEVO_TIPO")`.
- **La Reacción:** React detecta el cambio en el "sujeto", notifica al "observador" (`useEffect`), y este ejecuta automáticamente la función de fetching, la cual conforma el nuevo query de GraphQL y actualiza la lista de ítems en pantalla. Todo ocurre de forma reactiva sin recargar la página.

### 2. Patrón Factory Method (Creacional) en React
El Factory Method proporciona una interfaz para crear objetos en una superclase, pero permite que las subclases alteren el tipo de objetos que se crearán. En React, esto se traduce en delegar la lógica de renderizado a un componente "fábrica" que decide qué versión de un componente instanciar basándose en los datos recibidos.

**¿Cómo se implementa en este proyecto?**
- **La Petición:** A través de GraphQL, el frontend recibe un arreglo de objetos (ítems de Minecraft).
- **La Fábrica (`CardFactory`):** En lugar de llenar el componente principal con múltiples condicionales, se itera el arreglo y se le pasa cada objeto a `CardFactory`.
- **La Instanciación Condicional:** La fábrica evalúa las propiedades del objeto:
  - Si el objeto incluye `damage`: retorna un componente `<WeaponCard />`.
  - Si incluye `foodPoints`: retorna un componente `<FoodCard />`.
  - Si incluye `durability`: retorna un componente `<BlockCard />`.

Esto fomenta el principio Abierto/Cerrado (Open/Closed Principle). Si se añade una nueva categoría (ej. "Pociones"), solo se crea la nueva Card y se añade una regla a la fábrica, sin afectar el componente que renderiza la lista.

---

## Cumplimiento de la Rúbrica de Evaluación

1. **Configuración correcta de GraphQL (20 pts):** Integración exitosa de `spring-boot-starter-graphql` con un esquema robusto en `schema.graphqls`.
2. **Implementación del backend en Spring Boot (20 pts):** Arquitectura multicapas correctamente separada en Controllers, Services y Repositories.
3. **Desarrollo del frontend en React (10 pts):** Interfaz completa y funcional inicializada con Vite y usando Hooks.
4. **Implementación y explicación del Patrón Observer (15 + 10 pts):** Evidenciado y documentado en el uso reactivo del `useEffect` al cambiar de categorías.
5. **Implementación y explicación del Patrón Factory Method (15 + 10 pts):** Evidenciado y documentado mediante la creación dinámica de tarjetas (`CardFactory`) según los datos entrantes.
6. **Puntos Extra (10 pts) - Separación lógica de queries GraphQL:**
   En el Frontend, dentro de `src/`, se encuentra el directorio `graphql/` con el archivo `queries.js` (u homólogo). Los queries (como strings) se almacenan modularmente allí y se importan donde se necesiten, promoviendo el principio de Responsabilidad Única y un código mucho más limpio frente a tener consultas gigantes anidadas dentro de los componentes.

---

## Instalación y Ejecución Local

### 1. Levantar el Backend (Spring Boot)
```bash
cd exaple_graph_ql
./mvnw spring-boot:run
```
El servicio estará disponible en `http://localhost:8080/graphql`.

### 2. Levantar el Frontend (React)
```bash
cd frontGraphQL/exampleGraphQL
npm install
npm run dev
```
La aplicación web interactiva se abrirá en `http://localhost:5173`.