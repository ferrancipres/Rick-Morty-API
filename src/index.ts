import { getEpisodes, getSingleEpisodes} from "./utils/API.js";

//K pasa al iniciar 
window.addEventListener("load", init);

export async function init() {   
    getAllEpisodes();
}

async function getAllEpisodes() {
    for(let i=1; i <= 3; ++i) {
        const episodes = await getEpisodes(i);
        episodes.forEach ((episode) => {
            createEpisodeLink(episode);
        });

    };
}

const episodeList = document.querySelector("#containerEpisodes");

function createEpisodeLink(episode:Episodes) {
    const containerList = document.createElement("li");
    containerList.className = "nav-item";
    containerList.id = "containerList" 

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

    const urlEpisode = episode.url;
    //constante URL
    containerList.addEventListener("click", () => {
        showEpisodeContent(urlEpisode);
    })

}

const containerCard = document.querySelector("#containerCard");

async function showEpisodeContent(url:string) {
    containerCard?.replaceChildren();

    const episode = await getSingleEpisodes(url);
    const div1 = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerText = episode.name;
    div1.appendChild(h1);
    containerCard?.appendChild(div1);
    // PENDIENTE
    // Pendiente container..incluye todas las carts 

    const characters = episode.characters;
    characters.forEach ((char) => {
        createCardCharacter(char);
    });
    
}

function createCardCharacter(char:string) {
    console.log(char);
    //Pendiente fetch
    //const..value = fet(char)
}



