import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchGraphQL } from '../graphql/client';
import { GET_POSTS_BY_GENRE, GET_ALL_POSTS } from '../graphql/queries';

// 1. Creación del contexto (Subject u Observable central)
const SearchObserverContext = createContext();

// 2. Provider que actuará como manejador del estado de consultas
export const SearchObserverProvider = ({ children }) => {
  // Estado que guardará la data traída
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado de la consulta activa
  const [currentGenre, setCurrentGenre] = useState('ALL');

  /**
   * Función central de notificación: 
   * Cada vez que se cambia el filtro (currentGenre), se desencadena este efecto
   * notificando (actualizando) la data y a todos los componentes que escuchan.
   */
  useEffect(() => {
    let isMounted = true; 
    const notifyObservers = async () => {
      setLoading(true);
      try {
        let responseData;
        if (currentGenre === 'ALL') {
          responseData = await fetchGraphQL(GET_ALL_POSTS);
          if (isMounted) setData(responseData.getAllPosts);
        } else {
          responseData = await fetchGraphQL(GET_POSTS_BY_GENRE, { genre: currentGenre });
          if (isMounted) setData(responseData.getPostsByGenre);
        }
        if (isMounted) setError(null);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    notifyObservers();

    return () => { isMounted = false; };
  }, [currentGenre]);

  return (
    <SearchObserverContext.Provider 
      value={{ 
        data, 
        loading, 
        error, 
        currentGenre, 
        changeGenre: setCurrentGenre // Metodo para que los componentes lancen un cambio
      }}
    >
      {children}
    </SearchObserverContext.Provider>
  );
};

// 3. Hook personalizado como Observador
// Cualquier componente que use este hook "observará" y será notificado cuando "data" cambie
export const useSearchObserver = () => {
  const context = useContext(SearchObserverContext);
  if (!context) {
    throw new Error('useSearchObserver debe ser usado dentro de un SearchObserverProvider');
  }
  return context;
};
