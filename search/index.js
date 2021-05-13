//@ts-check

import { buildUrl, extractJsonBody } from '../constants.js'

/**
 * @typedef SearchType
 * @property {string} name
 * @property {string} url
 * @property {string} displayName
 */

/**
 * @type {Object.<string, HTMLElement>}
 */
const elements = {}


/**
 * 
 * @param {[string, string]} param0 
 * @returns SearchType
 */
function SearchType([name, displayName]){
    return {
        name,
        url: `search/${name}`,
        displayName
    }
}

/**
 * @type [string, string][]]
 */
const searchTypes_ = [
    ['person', 'People'],
    ['tv', 'TV Shows'],
    ['movie', 'Movies'],
    ['company', 'Companies'],
    ['keyword', 'Keywords'],
    ['collection', 'Collections'],
]

const searchTypes = searchTypes_.map(SearchType)

/**
 * 
 * @param {SearchType} type 
 * @returns 
 */
function searcher(type){
    /**
     * 
     * @param {string} searchTerms 
     */
    function _(searchTerms){
        const url = buildUrl(type.url, {query: searchTerms})
        fetch(url)
        .then(extractJsonBody)
        .then(console.log)
    }
    return _
}

/**
 * 
 * @param {SearchType} type 
 * @returns 
 */
function makeCategoryLinks(type){
    const listItem = document.createElement('li')
    listItem.setAttribute('id', type.name)
    listItem.innerText = type.displayName
    return listItem
}

function populateElements(){
    elements.errorBox = document.getElementById('nosearchterms')
    elements.errorBox.style.display = 'none'
    elements.resultsCategories = document.getElementById('resultsCategories')
}

function populateListItems(){
    const listItems = searchTypes.map(makeCategoryLinks)
    listItems.forEach( item => elements.resultsCategories.appendChild(item) )
}

function getSearchParams(documentEl){
    return (new URL(documentEl.location.toString())).searchParams
}

window.onload = function(){
    populateElements()
    populateListItems()
    const params = getSearchParams(document)
    const searchTerms = params.get('searchBox')
    if(searchTerms){
        console.log('trying API call with search params')
        getSearchResults(searchTerms)
    }else{
        elements.errorBox.style.display = 'block'
        console.error('no search terms')
    }
}

function getSearchResults(searchTerms){
    const searchChannels = searchTypes.map(searcher)
    searchChannels.forEach(f => f(searchTerms))
}