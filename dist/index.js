var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodes, getSingleEpisodes, getSingleCharacter } from "./utils/API.js";
window.addEventListener("load", init);
const episodeList = document.querySelector("#containerListEpisodes");
const containerDisplay = document.querySelector("#containerDisplay");
export function init() {
    return __awaiter(this, void 0, void 0, function* () {
        getAllEpisodes(countPage);
    });
}
let countPage = 1;
function getAllEpisodes(countPage) {
    return __awaiter(this, void 0, void 0, function* () {
        const episodes = yield getEpisodes(countPage);
        episodes.forEach((episode) => {
            createEpisodeLink(episode);
        });
    });
}
const btnLoadMore = document.querySelector("#btnLoadMore");
btnLoadMore.addEventListener("click", () => {
    if (countPage === 3)
        alert("pendiente eliminar");
    else {
        countPage++;
        getAllEpisodes(countPage);
    }
});
function createEpisodeLink(episode) {
    const containerList = document.createElement("li");
    containerList.className = "nav-item nav-link";
    containerList.id = "containerList";
    const linkEpisodes = document.createElement("a");
    linkEpisodes.classList.add("nav-link");
    linkEpisodes.id = episode.id;
    const titleEpisode = document.createElement("h5");
    titleEpisode.innerText = `${episode.episode} - ${episode.name}`;
    const spaceEpisode = document.createElement("hr");
    spaceEpisode.style.width = "30vw";
    containerList.appendChild(linkEpisodes);
    linkEpisodes.appendChild(titleEpisode);
    episodeList.appendChild(containerList);
    episodeList.appendChild(spaceEpisode);
    const urlEpisode = episode.url;
    containerList.addEventListener("click", () => {
        showEpisodeContent(urlEpisode);
    });
}
function showEpisodeContent(url) {
    return __awaiter(this, void 0, void 0, function* () {
        containerDisplay.replaceChildren();
        const episode = yield getSingleEpisodes(url);
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
        containerDisplay === null || containerDisplay === void 0 ? void 0 : containerDisplay.appendChild(containerTitle);
        containerTitle.appendChild(episodeTitle);
        containerDisplay === null || containerDisplay === void 0 ? void 0 : containerDisplay.appendChild(containerSubTitle);
        containerSubTitle.appendChild(airDateEpisode);
        containerSubTitle.appendChild(codeEpisode);
        const characters = episode.characters;
        characters.forEach((charUrl) => {
            const url = charUrl.toString();
            createCardCharacter(url);
        });
    });
}
function createCardCharacter(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const char = yield getSingleCharacter(url);
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
        card.style.height = "20em";
        card.setAttribute("data-bs-toggle", "modal");
        card.setAttribute("data-bs-target", "#characterModal");
        card.addEventListener("click", () => {
            showModal(char);
        });
        card.appendChild(miputaMadre);
        containerCharacterSingle.appendChild(miputoPadre);
        containerCharacterSingle.appendChild(statusCharacter);
        containerCharacterSingle.appendChild(specieCharacter);
        containerCharacter.appendChild(card);
        containerCharacter.appendChild(containerCharacterSingle);
        containerDisplay === null || containerDisplay === void 0 ? void 0 : containerDisplay.appendChild(containerCharacter);
    });
}
function showModal(char) {
    return __awaiter(this, void 0, void 0, function* () {
        const modalBody = document.querySelector("#characterModalBody");
        modalBody.replaceChildren();
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-info");
        const modalContentDescription = document.createElement("div");
        modalContentDescription.classList.add("modalContentDescription");
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
        modalBody.appendChild(modalContent);
        const modalListEpisodes = document.querySelector("#characterModalListEpisodes");
        modalListEpisodes.classList.add("list-unstyled");
        const TEST = char.episode;
        TEST.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            const PRUEBA = yield getEpisodesTitle(element);
            const PRUEBA2 = yield getEpisodesCode(element);
            const containerListEpisodes = document.querySelector('#containerEpisodes');
            const LALALA = document.createElement('li');
            LALALA.textContent = PRUEBA;
            LALALA.setAttribute("data-bs-dismiss", "modal");
            LALALA.addEventListener("click", () => {
                showEpisodeContent(element);
            });
            containerListEpisodes.appendChild(LALALA);
        }));
    });
}
function getEpisodesTitle(element) {
    return __awaiter(this, void 0, void 0, function* () {
        const episodesTitle = yield getSingleEpisodes(element);
        const episodesName = episodesTitle.name;
        return episodesName;
    });
}
function getEpisodesCode(element) {
    return __awaiter(this, void 0, void 0, function* () {
        const episodesCode = yield getSingleEpisodes(element);
        const episodesId = episodesCode.episode;
        return episodesId;
    });
}
//# sourceMappingURL=index.js.map