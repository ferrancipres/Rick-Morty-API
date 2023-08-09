import { getEpisodes, getSingleEpisodes,getSingleCharacter} from "./utils/API.js";
window.addEventListener("load", init);
const episodeList = document.querySelector("#containerEpisodes");
const containerDisplay = document.querySelector("#containerDisplay");

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

function createEpisodeLink(episode:Episodes) {
    const containerList = document.createElement("li");
    containerList.className = "nav-item nav-link";
    containerList.id = "containerList" 

    const linkEpisodes = document.createElement("a");
    linkEpisodes.classList.add("nav-link")
    linkEpisodes.id = episode.id;  // asignar un "id"

    const titleEpisode = document.createElement("h6");
    titleEpisode.innerText = `${episode.episode} - ${episode.name}`;

    // Contenedor "hr"
    const spaceEpisode = document.createElement("hr");
    spaceEpisode.style.width = "30vw";

    //Asamblar todo dentro del "li"
    containerList.appendChild(linkEpisodes);
    linkEpisodes.appendChild(titleEpisode);
        
    // Assamblar todo en episodeList
    episodeList!.appendChild(containerList); 
    episodeList!.appendChild(spaceEpisode); 

    const urlEpisode = episode.url;
    containerList.addEventListener("click", () => {
        showEpisodeContent(urlEpisode);
    })

}

async function showEpisodeContent(url:string) {
    containerDisplay!.replaceChildren();

    const episode = await getSingleEpisodes(url);
    
    //div Title
    const containerTitle = document.createElement("div");
    containerTitle.classList.add("basic-container");
    const episodeTitle = document.createElement("h3");
    episodeTitle.classList.add("title-episode");
    episodeTitle.innerText = episode.name;

    const containerSubTitle = document.createElement("div");
    containerSubTitle.classList.add("basic-subcontainer");

    const airDateEpisode = document.createElement("h4");
    airDateEpisode.classList.add("subtitle-episode");
    airDateEpisode.innerText = episode.air_date;

    const codeEpisode = document.createElement("h4");
    codeEpisode.classList.add("subtitle-episode");
    codeEpisode.innerText = episode.episode;

    //Ensamblaje
    containerDisplay?.appendChild(containerTitle);
    containerTitle.appendChild(episodeTitle);

    containerDisplay?.appendChild(containerSubTitle);
    containerSubTitle.appendChild(airDateEpisode);
    containerSubTitle.appendChild(codeEpisode);
    
    // Crear constante characters
    const characters = episode.characters;
    characters.forEach ((charUrl) => {
        // No entiendo esta linea
        const url = charUrl.toString();
        createCardCharacter(url);
    }); 
}

async function createCardCharacter(url:string) {
    const char = await getSingleCharacter(url);
    console.log(char)

    const containerCharacter = document.createElement("div");
    containerCharacter.classList.add("outline");

    const miputaMadre = document.createElement("img");
    miputaMadre.classList.add("card-img-top");
    miputaMadre.src = char.image;
    miputaMadre.alt = `${char.name} Image`;

    const miputoPadre = document.createElement("h6");
    miputoPadre.classList.add("letter");
    miputoPadre.innerText = char.name;

    // ERROR
    const statusCharacter = document.createElement("h6");
    console.log(char.status);

    //ERROR
    const specieCharacter = document.createElement("h6");
    console.log(char.species);

    const card = document.createElement("button");
    card.classList.add("card");
    card.style.width = "20em";
    card.style.height= "20em";
    card.setAttribute("data-bs-toggle", "modal");
    card.setAttribute("data-bs-target", "#characterModal");
    card.addEventListener("click", () => {
        showModal(char)
    });

    card.appendChild(miputaMadre);
    card.appendChild(miputoPadre);
    containerCharacter.appendChild(card);
    containerDisplay?.appendChild(containerCharacter);
}

function showModal(char:Character) {
    // que quieres que aparezca en el modal
    // parametro que le pasamos ???
}
