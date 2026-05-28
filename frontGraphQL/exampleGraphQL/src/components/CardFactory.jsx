import React from 'react';

const cardStyle = {
  border: '1px solid #a2a9b1',
  backgroundColor: '#f8f9fa',
  padding: '12px',
  margin: '8px 0',
  fontFamily: 'sans-serif',
  color: '#202122',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const titleStyle = {
  margin: '0 0 8px 0',
  borderBottom: '1px solid #a2a9b1',
  paddingBottom: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#000'
};

const imageStyle = {
  width: 64,
  height: 64,
  objectFit: 'contain',
  alignSelf: 'center',
  marginBottom: '8px'
};

const textStyle = {
  margin: '2px 0',
  fontSize: '14px'
};

const BlockCard = ({ post }) => (
  <div style={cardStyle}>
    <div style={titleStyle}>{post.title}</div>
    {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={imageStyle} />}
    <p style={textStyle}><strong>Type:</strong> Block</p>
    <p style={textStyle}><strong>Material:</strong> {post.material || 'N/A'}</p>
    <p style={textStyle}><strong>Durability:</strong> {post.durability}</p>
  </div>
);

const WeaponCard = ({ post }) => (
  <div style={cardStyle}>
    <div style={titleStyle}>{post.title}</div>
    {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={imageStyle} />}
    <p style={textStyle}><strong>Type:</strong> Weapon/Tool</p>
    <p style={textStyle}><strong>Damage:</strong> {post.damage}</p>
    <p style={textStyle}><strong>Enchantment:</strong> {post.enchantment || 'None'}</p>
  </div>
);

const FoodCard = ({ post }) => (
  <div style={cardStyle}>
    <div style={titleStyle}>{post.title}</div>
    {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={imageStyle} />}
    <p style={textStyle}><strong>Type:</strong> Food</p>
    <p style={textStyle}><strong>Restores:</strong> {post.foodPoints}</p>
    <p style={textStyle}><strong>Effects:</strong> {post.effect || 'None'}</p>
  </div>
);

const DefaultCard = ({ post }) => (
  <div style={cardStyle}>
    <div style={titleStyle}>{post.title}</div>
    <p style={textStyle}><strong>Type:</strong> {post.genre}</p>
    <p style={textStyle}>{post.content || 'Unidentified item.'}</p>
  </div>
);

/**
 * Patrón creacional Factory Method.
 * Resuelve la instanciación de un componente basándose en la categoría provista (BLOCK, WEAPON, FOOD).
 */
export const CardFactory = ({ post }) => {
  if (!post) return null;

  switch (post.genre?.toUpperCase()) {
    case 'BLOCK':
      return <BlockCard post={post} />;
    case 'WEAPON':
      return <WeaponCard post={post} />;
    case 'FOOD':
      return <FoodCard post={post} />;
    default:
      return <DefaultCard post={post} />;
  }
};
