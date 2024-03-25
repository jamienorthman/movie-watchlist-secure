const watchList = document.getElementById('watch-list')
let storedMovies = JSON.parse(localStorage.getItem('myMovies')) // Gets myMovies array from local storage so it can be used.
let watchListArray = []

// Removes a movie on click:    
document.addEventListener('click', (e) => {
    if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
})

// Don't start the watchListArray unless movies in local storage exist:
if (storedMovies) {
    watchListArray = storedMovies
}

// If watchListArray exists, populate the HTML of 
// watchList div with its data from local storage.
// If it doesn't exist, display the default message.
function updateWatchlist() {
    if (watchListArray) {
        watchList.innerHTML = ``
        for (let movie of watchListArray) {
            watchList.innerHTML += `
            <div class="movie-container">
                <img class="poster" src="${movie.Poster}" />
                <div class="info-container">
                    <div class="info1">
                        <h4 class="movie-title">${movie.Title}</h4>
                        <p class="rating">
                            <img src="./assets/star.png" class="star-icon">${movie.imdbRating}
                        </p>  
                    </div>
                    <div class="info2">
                        <p class="run-time">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        <button id="remove-btn" data-remove="${movie.imdbID}">
                            <img src="./assets/remove.png" class="remove-icon"> Remove
                        </button>
                    </div>
                    <p class="plot">${movie.Plot}</p>
                </div>
            </div>
            ` 
        }
    } else {
        watchList.innerHTML += `
        <div class="empty-list">
            <p class="unsuccessful">
                Your watchlist is looking a little empty...
            </p>
            <button>
                <a href="index.html>
                    <img src="./assets/add.png"> Let's add some movies!
                </a>
            </button>
        </div>
        `
    }
}

// Removes movie object from the watchlist and sets local storage again.
// Calls updateWatchlist to display updated list in HTML.
function handleRemoveClick(movieID) {
    const filteredMovies = watchListArray.filter((movie) => {
        return movie.imdbID !== movieID
    })
    watchListArray = filteredMovies
    localStorage.setItem('myMovies', JSON.stringify(watchListArray))
    updateWatchlist()
}

// Call the function outside to always display the watchlist:
updateWatchlist()