import { getEpisodes, getSingleEpisodes,getSingleCharacter, getLocation} from "./utils/API.js";

window.addEventListener("load", init);
let countPage = 1;
const episodeList = document.querySelector("#containerListEpisodes");
const containerDisplay = document.querySelector("#containerDisplay");
const btnLoadMore = document.querySelector("#btnLoadMore");

export async function init() {   
    getAllEpisodes(countPage);
}

async function getAllEpisodes(countPage:number) {
    const episodes = await getEpisodes(countPage);
    episodes.forEach ((episode) => {
        createEpisodeLink(episode);
    });
}

btnLoadMore!.addEventListener("click", () => {
    countPage++;
    getAllEpisodes(countPage);
    console.log(countPage);
    if(countPage === 3) {
        btnLoadMore!.classList.add("display");
    } 
});

function createEpisodeLink(episode:Episodes) {
    const containerList = document.createElement("li");
    containerList.className = "nav-item nav-link";
    containerList.classList.add("cursor-pointer", "bounce-effect");

    const linkEpisodes = document.createElement("a");
    linkEpisodes.classList.add("nav-link")
    linkEpisodes.setAttribute("href", "#containerDisplay")
    containerList.appendChild(linkEpisodes);

    const titleEpisode = document.createElement("h5");
    titleEpisode.innerText = `${episode.episode} - ${episode.name}`;
    linkEpisodes.appendChild(titleEpisode);

    const spaceEpisode = document.createElement("hr");
    episodeList!.appendChild(spaceEpisode); 
    //spaceEpisode.style.width = "30vw";
   
    episodeList!.appendChild(containerList); 

    const urlEpisode = episode.url;
    containerList.addEventListener("click", () => {
        showEpisodeContent(urlEpisode);
    })

}

async function showEpisodeContent(url:string) {
    containerDisplay!.replaceChildren();
    const episode = await getSingleEpisodes(url);
    
    const containerTitle = document.createElement("div");
    containerTitle.classList.add("container-title");

    const episodeTitle = document.createElement("h3");
    episodeTitle.classList.add("title-episode");
    episodeTitle.innerText = episode.name;
    containerTitle.appendChild(episodeTitle);

    const containerDescription = document.createElement("div");
    containerDescription.classList.add("container-description");

    const airDateEpisode = document.createElement("h3");
    airDateEpisode.classList.add("description-episode");
    airDateEpisode.innerText = `Air-date: ${episode.air_date}`;
    containerDescription.appendChild(airDateEpisode);

    const codeEpisode = document.createElement("h3");
    codeEpisode.classList.add("description-episode");
    codeEpisode.innerText = `Episode: ${episode.episode}`;
    containerDescription.appendChild(codeEpisode);

    containerDisplay!.appendChild(containerTitle);
    containerDisplay?.appendChild(containerDescription);

    const characters = episode.characters;
    characters.forEach ((charUrl) => {
        const url = charUrl.toString();
        createCardCharacter(url);
    }); 
}

async function createCardCharacter(url:string) {
    const char = await getSingleCharacter(url);

    const containerCharacter = document.createElement("div");
    containerCharacter.classList.add("display-card");
    containerCharacter.classList.add("bounce-effect");

    const containerCharacterSingle = document.createElement("div");
    containerCharacterSingle.classList.add("display-card-information");

    const imgagenCharacter = document.createElement("img");
    imgagenCharacter.classList.add("card-img-top");
    imgagenCharacter.src = char.image;
    imgagenCharacter.alt = `${char.name} Image`;

    const nameCharacter = document.createElement("h5");
    nameCharacter.innerText = char.name;
    containerCharacterSingle.appendChild(nameCharacter);

    const statusCharacter = document.createElement("h5");
    statusCharacter.textContent = `Status: ${char.status}`;
    containerCharacterSingle.appendChild(statusCharacter);

    const specieCharacter = document.createElement("h5");
    specieCharacter.textContent = `Species: ${char.species}`;
    containerCharacterSingle.appendChild(specieCharacter);

    const card = document.createElement("button");
    card.classList.add("card", "card-style");
    card.setAttribute("data-bs-toggle", "modal");
    card.setAttribute("data-bs-target", "#characterModal");
    card.addEventListener("click", () => {
        showModal(char)
    });

    card.appendChild(imgagenCharacter);
    containerCharacter.appendChild(card);
    containerCharacter.appendChild(containerCharacterSingle);
    containerDisplay!.appendChild(containerCharacter);
}

async function showModal(char:Character) {
    const modalBody = document.querySelector("#characterModalBody");
    modalBody!.replaceChildren();

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-info");

    const modalContentDescription = document.createElement("div");
    modalContentDescription.classList.add("modal-content-description")

    const characterImg = document.createElement("img");
    characterImg.src = char.image;
    characterImg.alt = char.name;
    characterImg.classList.add("img-fluid", "mb-3");
    modalContentDescription.appendChild(characterImg);

    const characterName = document.createElement("h4");
    characterName.classList.add("mb-2");
    characterName.textContent = char.name;
    modalContentDescription.appendChild(characterName);

    const statusParagraph = document.createElement("h5");
    statusParagraph.textContent = `Status: ${char.status}`;
    modalContentDescription.appendChild(statusParagraph);

    const speciesParagraph = document.createElement("h5");
    speciesParagraph.textContent = `Species: ${char.species}`;
    modalContentDescription.appendChild(speciesParagraph);

    const genderParagraph = document.createElement("h5");
    genderParagraph.textContent = `Gender: ${char.gender}`;
    modalContentDescription.appendChild(genderParagraph);

    const locationInformation = document.createElement("h5");
    locationInformation.classList.add("list-episode-location-style")
    locationInformation.textContent = `Location: ${char.location.name}`;
    modalContentDescription.appendChild(locationInformation);
    locationInformation.setAttribute("data-bs-dismiss", "modal");

    locationInformation.addEventListener("click", () => {
        const urlLocation = char.location.url;
        showLocation(urlLocation);
    });
   
    modalContent.appendChild(modalContentDescription);  
    modalBody!.appendChild(modalContent);

    const modalListEpisodes = document.querySelector("#characterModalListEpisodes");
    modalListEpisodes!.classList.add("list-unstyled");

    const CharEpisodeList = char.episode;
    CharEpisodeList.forEach(async element => { 
        const EpisodeListTitle = await getEpisodesTitle(element);
        const EpisodeListCode = await getEpisodesCode(element); 

        const containerListEpisodes = document.querySelector('#containerEpisodes');
        const elementListEpisode = document.createElement('li');
        elementListEpisode.classList.add("list-episode-style");
        elementListEpisode.textContent = `${EpisodeListCode} - ${EpisodeListTitle}`; 
        elementListEpisode.setAttribute("data-bs-dismiss", "modal");
        elementListEpisode.addEventListener("click",() => {
            showEpisodeContent(element);
        });
        containerListEpisodes!.appendChild(elementListEpisode);
    });
}

async function showLocation(url:string) {
    containerDisplay!.replaceChildren();
    const locateInformation = await getLocation(url); 

    const containerLocationTitle = document.createElement("div");
    containerLocationTitle.classList.add("container-title");

    const episodeTitleLocation = document.createElement("h3");
    episodeTitleLocation.classList.add("title-episode");
    episodeTitleLocation.innerText = locateInformation.name;
    containerLocationTitle.appendChild(episodeTitleLocation);

    const containerLocationDescription = document.createElement("div");
    containerLocationDescription.classList.add("container-description");

    const episodeDimensionLocation = document.createElement("h3");
    episodeDimensionLocation.classList.add("description-episode");
    episodeDimensionLocation.innerText = `Dimension: ${locateInformation.dimension}`;
    containerLocationDescription.appendChild(episodeDimensionLocation);

    const episodeDimensionType = document.createElement("h3");
    episodeDimensionType.classList.add("description-episode");
    episodeDimensionType.innerText = `Episode: ${locateInformation.type}`;
    containerLocationDescription.appendChild(episodeDimensionType);

    const episodeResidents = document.createElement("h3");
    episodeResidents.classList.add("description-episode");
    episodeDimensionType.innerText = "Residents: ";
    containerLocationDescription.appendChild(episodeDimensionType);

    const locationResidents = locateInformation.residents;
    locationResidents.forEach((resident) => {
        const urlResident = resident;
        createCardCharacter(urlResident);
    });

    containerDisplay!.appendChild(containerLocationTitle);
    containerDisplay!.appendChild(containerLocationDescription);
}

async function getEpisodesTitle(element:string): Promise<string> {
    const episodesTitle = await getSingleEpisodes(element);
    const episodesName = episodesTitle.name
    return episodesName;
}

async function getEpisodesCode(element:string): Promise<string> {
    const episodesCode = await getSingleEpisodes(element);
    const episodesId = episodesCode.episode 
    return episodesId;
}