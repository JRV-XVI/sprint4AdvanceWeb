import { useEffect, useState } from "react";

export default function Example() {

    /*
    ==================================================
    SUBJECT (ESTADO OBSERVADO)
    ==================================================

    React observará cambios en "genre".

    Cuando "genre" cambie:
    - React notificará componentes
    - useEffect reaccionará automáticamente
    - GraphQL cambiará el query

    Esto representa el patrón Observer.
    */
    const [genre, setGenre] = useState("BLOCK");



    /*
    ==================================================
    ESTADO DE ITEMS
    ==================================================

    Guarda la información obtenida desde GraphQL.
    */
    const [items, setItems] = useState([]);



    /*
    ==================================================
    ESTADO DE ERRORES
    ==================================================
    */
    const [error, setError] = useState(null);



    /*
    ==================================================
    QUERIES DINÁMICOS
    ==================================================

    Cada categoría solicita información distinta,
    simulando cómo la UI puede requerir campos
    diferentes para un Bloque, Arma, o Comida.
    */
    const queries = {

        BLOCK: `
            query {
                getPostsByGenre(genre:"BLOCK") {
                    id
                    title
                    material
                    durability
                }
            }
        `,

        WEAPON: `
            query {
                getPostsByGenre(genre:"WEAPON") {
                    id
                    title
                    damage
                    enchantment
                }
            }
        `,

        FOOD: `
            query {
                getPostsByGenre(genre:"FOOD") {
                    id
                    title
                    foodPoints
                    effect
                }
            }
        `
    };



    /*
    ==================================================
    OBSERVER
    ==================================================

    useEffect está OBSERVANDO "genre".

    El arreglo [genre] funciona como:
    - lista de dependencias
    - suscripción
    - observer

    Cuando genre cambia:
    - React detecta el cambio
    - ejecuta automáticamente getItems()

    Esto es comportamiento Observer.
    */
    useEffect(() => {

        getItems();

    }, [genre]);



    /*
    ==================================================
    FETCH GRAPHQL
    ==================================================
    */
    const getItems = async () => {

        try {

            /*
            ==========================================
            QUERY DINÁMICO
            ==========================================

            Dependiendo del género seleccionado,
            se obtiene un query diferente.
            */
            const query = queries[genre];



            const res = await fetch(
                "http://localhost:8080/graphql",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({ query })
                }
            );



            const data = await res.json();

            console.log(data);



            /*
            ==========================================
            MANEJO DE ERRORES
            ==========================================
            */
            if (data.errors) {

                setError(data.errors[0]?.message);

                setItems([]);

                return;
            }



            /*
            ==========================================
            ACTUALIZACIÓN REACTIVA
            ==========================================

            React actualizará automáticamente la UI
            cuando items cambie.
            */
            setItems(
                data?.data?.getPostsByGenre ?? []
            );



            setError(null);

        } catch (err) {

            console.log(err);

            setError("Error de conexión");

            setItems([]);
        }
    };



    return (

        <div>

            <h1>Minecraft Items Dynamic GraphQL (Observer)</h1>

            <p style={{ marginTop: '10px', fontSize: '14px', lineHeight: '1.6' }}>
                Categoría actual:
                <strong>
                    {" "}
                    {genre}
                </strong>
            </p>



            {/* ======================================
                BOTONES
            ======================================

            Cuando se hace click:
            - cambia genre
            - React detecta cambio
            - useEffect reacciona
            - GraphQL cambia query
            - UI cambia automáticamente

            Flujo completo Observer.
            ====================================== */}
            <div className="genres" style={{ margin: '20px 0', border: '1px solid #a2a9b1', padding: '10px', background: '#f8f9fa', display: 'flex', gap: '10px'}}>

                <button onClick={() => setGenre("BLOCK")}>Blocks</button>
                <button onClick={() => setGenre("WEAPON")}>Weapons</button>
                <button onClick={() => setGenre("FOOD")}>Food</button>

            </div>



            <br />



            {error && (

                <p style={{ color: "red" }}>
                    {error}
                </p>

            )}



            {/* ======================================
                RENDERIZADO REACTIVO
            ======================================

            Cuando items cambie:
            React vuelve a renderizar automáticamente.
            */}
            <div className="movies-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>

                {
                    items.map((movie) => (

                        <div
                            className="movie-card"
                            style={{ border: '1px solid #a2a9b1', backgroundColor: '#f8f9fa', padding: '12px' }}
                            key={movie.id}
                        >

                            <h3 style={{ borderBottom: '1px solid #a2a9b1', paddingBottom: '4px', fontSize: '16px', margin: '0 0 10px 0', color: '#000'}}>
                                {movie.title}
                            </h3>



                            {/* BLOCK */}
                            {movie.material && (

                                <p style={{ fontSize: '14px', margin: '2px 0'}}>
                                    <strong>Material:</strong>
                                    {" "}
                                    {movie.material}
                                </p>

                            )}



                            {movie.durability && (

                                <p style={{ fontSize: '14px', margin: '2px 0'}}>
                                    <strong>Durability:</strong>
                                    {" "}
                                    {movie.durability}
                                </p>

                            )}



                            {/* WEAPON */}
                            {movie.damage && (

                                <p style={{ fontSize: '14px', margin: '2px 0'}}>
                                    <strong>Damage:</strong>
                                    {" "}
                                    {movie.damage}
                                </p>

                            )}



                            {/* FOOD */}
                            {movie.foodPoints && (

                                <p style={{ fontSize: '14px', margin: '2px 0'}}>
                                    <strong>Food Points:</strong>
                                    {" "}
                                    {movie.foodPoints}
                                </p>

                            )}

                        </div>
                    ))
                }

            </div>

        </div>
    );
}