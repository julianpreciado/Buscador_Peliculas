// obtengo el elemento html del boton y le hago escucha click desde js al nombre ingresado por medio de la funcion callback searchMovies
document.getElementById('searchButton').addEventListener('click', searchMovies)

let api_key = 'dc050b2f01c81dd7353082188d47527c' // https://www.themoviedb.org/settings/api/new/form?type=developer
let urlBase = 'https://api.themoviedb.org/3/search/movie' // https://developer.themoviedb.org/docs/search-and-query-for-details

let resultContainer = document.getElementById('results') // obtengo todo el listado de peliculas que coincidan con el nombre (no va el .value pues es array)

function searchMovies() { // obtiene el elemento del nombre de la peli ingresada
    resultContainer.innerHTML = 'Cargando...' // mientras busca saca ese aviso
    let searchInput = document.getElementById('searchInput').value

    // aca llamo a la API (https://developer.themoviedb.org/reference/intro/getting-started) para buscar a peli con el nombre que ya tenemos
    // busco la seccion de api's (https://www.themoviedb.org/settings/api/new/form?type=developer)

    fetch(`${urlBase}?query=${searchInput}&api_key=${api_key}`) // el ejemplo sale de: https://developer.themoviedb.org/docs/search-and-query-for-details
        .then(response => response.json())
        .then(response => displayMovies(response.results)) // el response sale del dom, network > preview > array
}

function displayMovies(movies) {
    resultContainer.innerHTML = '' // una vez obtenido el elemento de results, lo deja vacio en el html

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p> No se encontraron resultados para tu busqueda </p>'
        return // para que salga de la funcion
    }

    movies.forEach(movie => { // for que recorre todos los resultados de las coincidencias encontradas 
        let movieDiv = document.createElement('div') // crea un div que ira uno bajo el otro, con toda la info de cada pelicula (tittle, poster etc)
        movieDiv.classList.add('movie') // llamo la clase CSS de movie para tener sus atributos   

        let title = document.createElement('h2') // creamos otro elemento con titulo h2
        title.textContent = movie.title // title sale el elemento donde esta titulo en el dom

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'la fecha de lanzamiento fue ' + movie.release_date // release_date sale el elemento donde esta release_date en el dom

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = 'https://image.tmdb.org/t/p/w500' + movie.poster_path // https://developer.themoviedb.org/docs/image-basics
        let poster = document.createElement('img')
        poster.src = posterPath // posterPath trae una imagen .jpg del dom, y la variable poster crea un elemento tipo imagen, que guarda esa imagen del dom 

        movieDiv.appendChild(poster) // mostramos con appenchild los elementos ya creados 
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        resultContainer.appendChild(movieDiv) // muestro todo el resultado de peliculas que coincidan ya con los filtros de poster, title etc 
    });
}

