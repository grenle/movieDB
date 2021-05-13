import { API_KEY, API_ROOT, IMG_ROOT } from './constants.js'

let elements = {}

window.onload = function(){
    elements.popular = document.getElementById('popular')
    elements.popularMovies = document.getElementById('popularMovies')
    getPopularMovies()
}

function getPopularMovies(){
    console.log('getting popular movies')
    const fetchOptions = {
        method: 'GET',
    }
    const url = `${API_ROOT}movie/popular?api_key=${API_KEY}`
    fetch(url, fetchOptions)
    .then(function(response){
        response.json()
        .then(res => populatePopularMovies(res.results))
    })
    .catch(function(error){
        console.error('Could not get popular movies')
        console.error('error')
    })
}

function populatePopularMovies(movies){
    const movieElements = movies.map(createMovieBox)
    movieElements.forEach( function(movieElement){
        elements.popularMovies.append(movieElement)
    })
}

function createMovieBox(movie){
    const movieBox = document.createElement('div')
    movieBox.className = "movieBox"
    const image = document.createElement('img')
    image.setAttribute('src', `${IMG_ROOT}${movie.poster_path}`)
    const title = document.createElement('h3')
    const releaseDate = document.createElement('p')
    title.innerText = movie.title
    releaseDate.innerText = movie.release_date
    movieBox.append(image)
    movieBox.append(title)
    movieBox.append(releaseDate)
    return movieBox
}