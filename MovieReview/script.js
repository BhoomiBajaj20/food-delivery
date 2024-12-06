const searchForm =  document.querySelector("form");
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');
// const moviePoster = document.querySelector('.movie-poster');
// const movieDetails = document.querySelector('.movie-details');


//Function to fetch movie details using OMDB API
async function getMovieInfo(movie){

    try{
    const apiKey = "dbf81278";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;
    // console.log(url);

    const response = await fetch(url);

    if(!response.ok){
        throw new Error('Error Fetching Movie Details');
    }
    const data = await response.json();
    // console.log(data);

    showMovieDate(data);
    }
    catch(error){
        showError("No Movie Found");
        movieContainer.classList.add('noBackground')
    }
}


//Function to show movie data on screen
const showMovieDate = (data)=>{
    movieContainer.innerHTML= '';
    movieContainer.classList.remove('noBackground');
    //Use Destructuring Assignment to extract properties from data object
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                             <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element =>{
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released: </strong>${Released}</p>
                             <p><strong>Duration: </strong>${Runtime}</p>
                             <p><strong>Cast: </strong>${Actors}</p>
                             <p><strong>Plot: </strong>${Plot}</p>`;


    //creating a div  for movie poster
    const moviePoster = document.createElement('div');
    moviePoster.classList.add("movie-poster");
    moviePoster.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePoster);                            
    movieContainer.appendChild(movieElement);
}

//Function to display error message

const showError = (msg)=>{
    movieContainer.innerHTML = `<h2>${msg}</h2`;
    movieContainer.classList.add('noBackground');
}



//Adding event listener to search form
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    // console.log(inputBox.value);
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showError('Fetching Movie Information..')
        getMovieInfo(movieName);
    }
    else{
        showError("Enter a movie name to get the information");
        // movieContainer.innerHTML = `<h2>Enter Movie Name to get movie Information</h2>`;
        // movieContainer.classList.add('noBackground');
    }
})

