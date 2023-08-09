import { getEpisodes, getSingleEpisodes,getSingleCharacter} from "./utils/API.js";
window.addEventListener("load", init);
const episodeList = document.querySelector("#containerEpisodes");
const containerDisplay = document.querySelector("#containerDisplay");

export async function init() {   
    getAllEpisodes(countPage);
}

let countPage = 1;
async function getAllEpisodes(countPage:number) {
    const episodes = await getEpisodes(countPage);
    episodes.forEach ((episode) => {
        createEpisodeLink(episode);
    });
}

//PENDIENTE
const btnLoadMore = document.querySelector("#btnLoadMore");
btnLoadMore!.addEventListener("click", () => {
    if(countPage === 3) alert("pendiente eliminar");
    else {
        countPage++;
        getAllEpisodes(countPage);
    }
});

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

    const containerCharacter = document.createElement("div");
    containerCharacter.classList.add("outline");

    const containerCharacterSingle = document.createElement("div");
    containerCharacterSingle.classList.add("extra");

    const miputaMadre = document.createElement("img");
    miputaMadre.classList.add("card-img-top");
    miputaMadre.src = char.image;
    miputaMadre.alt = `${char.name} Image`;

    const miputoPadre = document.createElement("h6");
    miputoPadre.classList.add("letter");
    miputoPadre.innerText = char.name;

    const statusCharacter = document.createElement("h6");
    statusCharacter.textContent = `Status: ${char.status}`;

    const specieCharacter = document.createElement("h6");
    specieCharacter.textContent = `Species: ${char.species}`;

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
    containerCharacterSingle.appendChild(miputoPadre);
    containerCharacterSingle.appendChild(statusCharacter);
    containerCharacterSingle.appendChild(specieCharacter);
    containerCharacter.appendChild(card);
    containerCharacter.appendChild(containerCharacterSingle);
    containerDisplay?.appendChild(containerCharacter);
}

async function showModal(char:Character) {
    const modalBody = document.querySelector("#characterModalBody");
    modalBody!.replaceChildren();

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-info");

    const modalContentDescription = document.createElement("div");
    modalContentDescription.classList.add("modalContentDescription")

    const characterImg = document.createElement("img");
    characterImg.src = char.image;
    characterImg.alt = char.name;
    characterImg.classList.add("img-fluid", "mb-3");
    modalContentDescription.appendChild(characterImg);

    const characterName = document.createElement("h6");
    characterName.classList.add("mb-2");
    characterName.textContent = char.name;
    modalContentDescription.appendChild(characterName);

    const statusParagraph = document.createElement("p");
    statusParagraph.textContent = `Status: ${char.status}`;
    modalContentDescription.appendChild(statusParagraph);

    const speciesParagraph = document.createElement("p");
    speciesParagraph.textContent = `Species: ${char.species}`;
    modalContentDescription.appendChild(speciesParagraph);

    const genderParagraph = document.createElement("p");
    genderParagraph.textContent = `Gender: ${char.gender}`;

    modalContentDescription.appendChild(genderParagraph);
    modalContent.appendChild(modalContentDescription);  
    // Assembler general
    modalBody!.appendChild(modalContent);

    // Elemento para poner la LISTA
    const modalListEpisodes = document.querySelector("#characterModalListEpisodes");
    modalListEpisodes!.classList.add("list-unstyled");

    const TEST = char.episode;
    //console.log(char.episode);  // Array de string**
    TEST.forEach(async element => { // para separar Array
        const PRUEBA = await getEpisodesTitle(element);
        const PRUEBA2 = await getEpisodesCode(element); 

        const containerEpisodes = document.querySelector('#containerListEpisodes');
        //containerEpisodes?.replaceChildren(); // vaciarlo
        const LALALA = document.createElement('li');
        LALALA.textContent = PRUEBA; 
        LALALA.setAttribute("data-bs-dismiss", "modal");
        LALALA.addEventListener("click",() => {
            showEpisodeContent(element);
        });

        containerEpisodes?.appendChild(LALALA);
        //modalListEpisodes(PRUEBA, PRUEBA2);
    });
}

// Funcion para coger Name
async function getEpisodesTitle(element:string): Promise<string> {
    const episodesTitle = await getSingleEpisodes(element);
    const episodesName = episodesTitle.name // title
    return episodesName;
}

// Funcion coger el CODE
async function getEpisodesCode(element:string): Promise<string> {
    const episodesCode = await getSingleEpisodes(element);
    const episodesId = episodesCode.episode // ID
    return episodesId;
}