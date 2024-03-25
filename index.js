const searchBtn = document.getElementById('search-btn')
const searchField = document.getElementById('search-field')
const searchList = document.getElementById('search-list')

let searchedMovies = []
let myMovies = []

searchBtn.addEventListener('click', handleSearchClick)

// Fetches data from the open movie database API, performing another
// fetch within the first one to get specific data needed for design.
async function handleSearchClick() {
    const response = await fetch(`${APIKEY}=${searchField.value}&type=movie`)
    const data = await response.json()
    console.log(data)
    if (data.Search) {
        searchList.innerHTML = ``
        for (let movie of data.Search) {
            const response = await fetch(`${APIKEY}=${movie.imdbID}&type=movie`)
            const data = await response.json()
            searchedMovies.push(data)
            searchList.innerHTML += `
            <div class="movie-container">
                <img class="poster" src="${data.Poster === 'N/A' ? './assets/not-found.png' : 
                data.Poster}" alt="${data.Title}"/>
                <div class="info-container">
                    <div class="info1">
                        <h4 class="movie-title">${data.Title}</h4>
                        <p class="rating">
                            <img src="./assets/star.png" class="star-icon"> ${data.imdbRating}
                        </p>  
                    </div>
                    <div class="info2">
                        <p class="run-time">${data.Runtime}</p>
                        <p class="genre">${data.Genre}</p>
                        <button id="add-watchlist-${data.imdbID}" data-add="${data.imdbID}"> 
                            <img src="./assets/add.png" class="add-icon"> Watch
                        </button>
                    </div>
                    <p class="plot">${data.Plot}</p>
                </div>
            </div>
            `
        }
    } else {
        searchList.innerHTML = `
        <p class="unsuccessful">
            Unable to find what you're looking for. Please try another search.
        </p>
        `
    }
    
}

// Event listener for the add-button
document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    }
})

// Associates each movie object with its add button.
// Clicking add button pushes the movie object to
// myMovies array and saves the array to local storage. 
// Add button is disabled after click (no duplicates allowed). 
function handleAddClick(movieID) {
    const movieObj = searchedMovies.filter((movie) => {
        return movie.imdbID == movieID
    })[0]
    const addBtn = document.getElementById(`add-watchlist-${movieID}`)
    addBtn.disabled = true
    let storedMovies = JSON.parse(localStorage.getItem("myMovies"))
    if (storedMovies) {
        myMovies = storedMovies
    }
    if (myMovies.some(movieObj => movieObj.imdbID == movieID)) {
        addBtn.disabled = true
    } else {
        myMovies.push(movieObj)
        localStorage.setItem("myMovies", JSON.stringify(myMovies))
    }
}




    