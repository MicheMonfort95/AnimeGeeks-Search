const base_url = "https://api.jikan.moe/v4";

function searchAnime(event) {
  event.preventDefault();

  const form = new FormData(this);
  const query = form.get("search");

  //console.log(query);

  fetch(`${base_url}/anime?q=${query}&page=1`)
    .then((res) => res.json())

    //.then((data) => console.log(data))

    .then(updateDom)

    .catch((err) => console.warn(err.message));

  function updateDom(data) {
    const searchResults = document.getElementById("search-results");

    searchResults.innerHTML = data.data

      .sort((a, b) => a.title - b.title)
      .map((anime) => {
        return ` 
        
          <div class="card">
            <div class="card-image">
              <img src="${anime.images.jpg.large_image_url}">
              
              
            </div>
            <div class="card-content">
             <span class="card-title">${anime.title}</span>
              <p>${anime.synopsis}</p>
            </div>
            <div class="card-action">
              <a href="${anime.url}">More info</a>
            </div>
          </div>
        
           `;
      })
      .join("");
  }
}

function pageloaded() {
  const form = document.getElementById("search-form");
  form.addEventListener("submit", searchAnime);
}

window.addEventListener("load", pageloaded);
