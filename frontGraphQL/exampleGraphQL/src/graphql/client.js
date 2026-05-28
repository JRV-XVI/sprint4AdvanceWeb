/**
 * Cliente ligero para hacer peticiones a GraphQL sin necesidad de instalar dependencias pesadas
 */
const GRAPHQL_ENDPOINT = 'http://localhost:8080/graphql';

export const fetchGraphQL = async (query, variables = {}) => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(result.errors.map((e) => e.message).join(', '));
    }

    return result.data;
  } catch (error) {
    console.error('Fetch GraphQL Error:', error);
    throw error;
  }
};
