export const GET_ALL_POSTS = `
  query {
    getAllPosts {
      id
      title
      genre
      author
      content
      imageUrl
      material
      durability
      enchantment
      damage
      biome
      foodPoints
      effect
    }
  }
`;

export const GET_POSTS_BY_GENRE = `
  query GetPostsByGenre($genre: String!) {
    getPostsByGenre(genre: $genre) {
      id
      title
      genre
      author
      content
      imageUrl
      material
      durability
      enchantment
      damage
      biome
      foodPoints
      effect
    }
  }
`;
