//import
import { getEpisodes } from "./utils/API.js";
import { btnLoadMore } from "./utils/API.js";

//K pasa al iniciar 
window.addEventListener("load", init);

//Que queremos que haga la funcion "init" => al iniciar
async function init() {   
    const episodeList = document.querySelector("#containerEpisodes");
    const episodes = await getEpisodes();
    episodes.forEach ((episode) => {
        //Contenedor "li"
        const containerList = document.createElement("li");
        containerList.className = "nav-item";
        containerList.id = "containerList" // No lo entiendo

        //Contenedor "a" Enlace
        const linkEpisodes = document.createElement("a");
        linkEpisodes.id = episode.id;  // asignar un "id"

        // Contenedor "nombre"
        const titleEpisode = document.createElement("h6");
        const titleEpisodeTxt = document.createTextNode(episode.name);

        // Contenedor "hr"
        const spaceEpisode = document.createElement("hr");
        spaceEpisode.style.width = "30vw";

        //Asamblar todo dentro del "li"
        containerList.appendChild(linkEpisodes);
        linkEpisodes.appendChild(titleEpisodeTxt);
        
        // Assamblar todo en episodeList
        episodeList!.appendChild(containerList); 
        episodeList!.appendChild(spaceEpisode); 
    });
}

//containerList.addEventListener("click",getCharacter);  OK OK OK 
const LoadMore = document.querySelector("#btnLoadMore");
LoadMore!.addEventListener('click',btnLoadMore);



 