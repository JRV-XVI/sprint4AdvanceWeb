import React from 'react';
import { useSearchObserver } from '../../context/SearchObserver';
import { CardFactory } from '../../components/CardFactory';

function Home() {
  const { data, loading, error, currentGenre, changeGenre } = useSearchObserver();

  const handleGenreChange = (e) => {
    changeGenre(e.target.value);
  };

  return (
    <div>
      <h1>Minecraft Wiki - Items (GraphQL)</h1>
      <p style={{ marginTop: '10px', fontSize: '14px', lineHeight: '1.6' }}>
        <strong>Observer:</strong> React Context + Custom Hooks (`useSearchObserver`). 
        Al cambiar un filtro, el Contexto realiza un fetch automático a `/graphql`. <br/>
        <strong>Factory Method:</strong> Cada item de la base de datos pasa por `CardFactory`, el cual produce componentes específicos (`BlockCard`, `WeaponCard`, `FoodCard`) dependiendo de su categoría.
      </p>

      <div style={{ margin: '20px 0', display: 'flex', gap: '10px', alignItems: 'center', background: '#f8f9fa', border: '1px solid #a2a9b1', padding: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', borderBottom: 'none' }}>Category Filter:</h3>
        <select 
          id="genre-select" 
          value={currentGenre} 
          onChange={handleGenreChange}
        >
          <option value="ALL">All Items</option>
          <option value="BLOCK">Blocks</option>
          <option value="WEAPON">Weapons & Tools</option>
          <option value="FOOD">Food & Potions</option>
        </select>
      </div>

      <div style={{ padding: '10px 0' }}>
        {loading && <h3 style={{ fontSize: '16px', color: '#54595d', borderBottom: 'none' }}>Loading...</h3>}
        {error && <h3 style={{ color: '#d33', fontSize: '16px', borderBottom: 'none' }}>Error: {error}</h3>}
        
        {!loading && !error && data && data.length === 0 && (
          <h3 style={{ fontSize: '16px', color: '#54595d', borderBottom: 'none' }}>No items found.</h3>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {data?.map(item => (
            <CardFactory key={item.id} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;