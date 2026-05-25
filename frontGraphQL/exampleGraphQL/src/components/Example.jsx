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
    const [genre, setGenre] = useState("ACTION");



    /*
    ==================================================
    ESTADO DE PELÍCULAS
    ==================================================

    Guarda la información obtenida desde GraphQL.
    */
    const [movies, setMovies] = useState([]);



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

    Cada género solicita información distinta.

    Esto simula cómo Netflix solicita
    diferentes datos dependiendo de la vista.
    */
    const queries = {

        ACTION: `
            query {
                getPostsByGenre(genre:"ACTION") {
                    id
                    title
                    weapon
                    explosions
                }
            }
        `,

        COMEDY: `
            query {
                getPostsByGenre(genre:"COMEDY") {
                    id
                    title
                    typeOfComedy
                    memeCount
                }
            }
        `,

        HORROR: `
            query {
                getPostsByGenre(genre:"HORROR") {
                    id
                    title
                    monster
                    goreLevel
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
    - ejecuta automáticamente getMovies()

    Esto es comportamiento Observer.
    */
    useEffect(() => {

        getMovies();

    }, [genre]);



    /*
    ==================================================
    FETCH GRAPHQL
    ==================================================
    */
    const getMovies = async () => {

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

                setMovies([]);

                return;
            }



            /*
            ==========================================
            ACTUALIZACIÓN REACTIVA
            ==========================================

            React actualizará automáticamente la UI
            cuando movies cambie.
            */
            setMovies(
                data?.data?.getPostsByGenre ?? []
            );



            setError(null);

        } catch (err) {

            console.log(err);

            setError("Error de conexión");

            setMovies([]);
        }
    };



    return (

        <div>

            <h1>Netflix Dynamic GraphQL</h1>

            <p>
                Género actual:
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
            <div className="genres">

                <button
                    onClick={() => setGenre("ACTION")}
                >
                    Acción
                </button>



                <button
                    onClick={() => setGenre("COMEDY")}
                >
                    Comedia
                </button>



                <button
                    onClick={() => setGenre("HORROR")}
                >
                    Terror
                </button>

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

            Cuando movies cambia:
            React vuelve a renderizar automáticamente.
            */}
            <div className="movies-container">

                {
                    movies.map((movie) => (

                        <div
                            className="movie-card"
                            key={movie.id}
                        >

                            <h3>
                                {movie.title}
                            </h3>



                            {/* ACTION */}
                            {movie.weapon && (

                                <p>
                                    Weapon:
                                    {" "}
                                    {movie.weapon}
                                </p>

                            )}



                            {movie.explosions && (

                                <p>
                                    Explosions:
                                    {" "}
                                    {movie.explosions}
                                </p>

                            )}



                            {/* COMEDY */}
                            {movie.typeOfComedy && (

                                <p>
                                    Comedy:
                                    {" "}
                                    {movie.typeOfComedy}
                                </p>

                            )}



                            {movie.memeCount && (

                                <p>
                                    Meme Count:
                                    {" "}
                                    {movie.memeCount}
                                </p>

                            )}



                            {/* HORROR */}
                            {movie.monster && (

                                <p>
                                    Monster:
                                    {" "}
                                    {movie.monster}
                                </p>

                            )}



                            {movie.goreLevel && (

                                <p>
                                    Gore Level:
                                    {" "}
                                    {movie.goreLevel}
                                </p>

                            )}

                        </div>
                    ))
                }

            </div>

        </div>
    );
}