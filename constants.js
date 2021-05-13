const API_KEY = '591f3ac1c92989d4575b0210e0b8bbb8'
const API_ROOT = 'https://api.themoviedb.org/3/'
const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTFmM2FjMWM5Mjk4OWQ0NTc1YjAyMTBlMGI4YmJiOCIsInN1YiI6IjVlMjU4NGI4YmZlYjhiMDAxM2Q1YTY2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6o773hUdCqc5qdeQdRDE3kTFiSEPW4DFi0DNnSX0BC8'
const IMG_ROOT = 'https://www.themoviedb.org/t/p/w220_and_h330_face/'

function buildUrl(path, extraParams){
    const defaultParams = { api_key: API_KEY }
    const params = Object.assign({}, defaultParams, extraParams)
    const paramString = Object.entries(params).map( (paramPair, i) => {
        const [ key, value ] = paramPair
        const sep = i ? '&' : '?'
        return `${sep}${key}=${encodeURIComponent(value)}`
    }).join('')
    return new URL(path+paramString, API_ROOT).href
}

function extractJsonBody(response){
    return response.json()
}

export {
    IMG_ROOT,
    API_KEY,
    API_ROOT,
    API_ACCESS_TOKEN,
    buildUrl,
    extractJsonBody,
}
