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
const episodeList = document.querySelector("#containerEpisodes");
const containerDisplay = document.querySelector("#containerDisplay");
export function init() {
    return __awaiter(this, void 0, void 0, function* () {
        getAllEpisodes();
    });
}
function getAllEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i <= 3; ++i) {
            const episodes = yield getEpisodes(i);
            episodes.forEach((episode) => {
                createEpisodeLink(episode);
            });
        }
        ;
    });
}
function createEpisodeLink(episode) {
    const containerList = document.createElement("li");
    containerList.className = "nav-item nav-link";
    containerList.id = "containerList";
    const linkEpisodes = document.createElement("a");
    linkEpisodes.classList.add("nav-link");
    linkEpisodes.id = episode.id;
    const titleEpisode = document.createElement("h6");
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
        console.log(char);
        const containerCharacter = document.createElement("div");
        containerCharacter.classList.add("outline");
        const miputaMadre = document.createElement("img");
        miputaMadre.classList.add("card-img-top");
        miputaMadre.src = char.image;
        miputaMadre.alt = `${char.name} Image`;
        const miputoPadre = document.createElement("h6");
        miputoPadre.classList.add("letter");
        miputoPadre.innerText = char.name;
        const statusCharacter = document.createElement("h6");
        console.log(char.status);
        const specieCharacter = document.createElement("h6");
        console.log(char.species);
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
        card.appendChild(miputoPadre);
        containerCharacter.appendChild(card);
        containerDisplay === null || containerDisplay === void 0 ? void 0 : containerDisplay.appendChild(containerCharacter);
    });
}
function showModal(char) {
}
//# sourceMappingURL=index.js.map