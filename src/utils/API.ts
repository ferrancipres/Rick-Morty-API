// Seccion : Colocar todas las funciones para trabajar con la API

// Que queremos que haga la función 
    // fetch para recoger datos de episodios de pagina en pagina..CUIDADO

const urlBase= "https://rickandmortyapi.com/api";
const urlEpisodes = `${urlBase}/episode`;

let pageEpisode = 1;
const urlEpisodesPage = `${urlBase}/episode/?page=${pageEpisode}`;

//Fetch de datos 
export async function getEpisodes(): Promise<Episodes[]> {
    const response = await fetch(urlEpisodesPage);  // tengo que decir que lo que devuelve esta tipado..(type: chracter)
    const data = await response.json();
    return data.results;
}

// Function LoadMore
export async function btnLoadMore() {
    pageEpisode++;
    console.log(pageEpisode);
    //const episodeList = document.querySelector("#containerEpisodes");
    //if(episodeList) {episodeList.innerHTML = ""}
    getEpisodes();
    console.log(getEpisodes());
}