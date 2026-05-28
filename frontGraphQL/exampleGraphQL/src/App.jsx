//Router:	Envuelve la aplicación y gestiona la navegación.
//Routes:	Agrupa múltiples rutas y muestra solo la primera coincidencia.
//Route:	Define una URL específica y qué componente renderizar.

//Instala lo siguiente
//npm install react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menus from "./pages/mainpages/Menus";
import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/mainpages/Home";

import { SearchObserverProvider } from "./context/SearchObserver";

function App() {
  return (
    <SearchObserverProvider>
      <Router>
        <div className="app">
          {/* Barra de navegación */}
          <Navbar />
          {/* Contenido de la página */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menus" element={<Menus />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </div>
        </div>
      </Router>
    </SearchObserverProvider>
  );
}

export default App;