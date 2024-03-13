const omdbApiKey = '176f1929';

let searchQuery = ''; 


function performSearch() {
  searchQuery = document.getElementById('searchInput').value;
  fetchData();
  
}

async function fetchData() {
  const omdbUrl = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${omdbApiKey}`;
  try {
    const response = await fetch(omdbUrl);

    if (response.ok) {
      const result = await response.json();
      console.log(result);

      const data = result.Search;
      displayMovies(data);
    } else {
      console.error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}


function displayMovies(data) {
  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = '';

  if(data){
    data.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const image = document.createElement('img');
      image.src = movie.Poster;
      image.alt = 'Movie Poster';
  
      const content = document.createElement('div');
      content.classList.add('card-content');
  
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = movie.Title;
  
      const release = document.createElement('div');
      release.classList.add('release');
      release.textContent = `Release Year: ${movie.Year}`;
  
      // const credits = document.createElement('div');
      // credits.classList.add('credits');
      // credits.textContent = `Type: ${movie.Type}`;
  
      content.appendChild(title);
      content.appendChild(release);
      // content.appendChild(credits);
  
      card.appendChild(image);
      card.appendChild(content);
  
      moviesContainer.appendChild(card);
    });
  }
  else{
    moviesContainer.innerHTML = 'No results found';
  }
  }
 



