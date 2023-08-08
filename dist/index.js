var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodes, getSingleEpisodes } from "./utils/API.js";
window.addEventListener("load", init);
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
const episodeList = document.querySelector("#containerEpisodes");
function createEpisodeLink(episode) {
    const containerList = document.createElement("li");
    containerList.className = "nav-item";
    containerList.id = "containerList";
    const linkEpisodes = document.createElement("a");
    linkEpisodes.id = episode.id;
    const titleEpisode = document.createElement("h6");
    const titleEpisodeTxt = document.createTextNode(episode.name);
    const spaceEpisode = document.createElement("hr");
    spaceEpisode.style.width = "30vw";
    containerList.appendChild(linkEpisodes);
    linkEpisodes.appendChild(titleEpisodeTxt);
    episodeList.appendChild(containerList);
    episodeList.appendChild(spaceEpisode);
    const urlEpisode = episode.url;
    containerList.addEventListener("click", () => {
        showEpisodeContent(urlEpisode);
    });
}
const containerCard = document.querySelector("#containerCard");
function showEpisodeContent(url) {
    return __awaiter(this, void 0, void 0, function* () {
        containerCard === null || containerCard === void 0 ? void 0 : containerCard.replaceChildren();
        const episode = yield getSingleEpisodes(url);
        const div1 = document.createElement("div");
        const h1 = document.createElement("h1");
        h1.innerText = episode.name;
        div1.appendChild(h1);
        containerCard === null || containerCard === void 0 ? void 0 : containerCard.appendChild(div1);
        const characters = episode.characters;
        characters.forEach((char) => {
            createCardCharacter(char);
        });
    });
}
function createCardCharacter(char) {
    console.log(char);
}
//# sourceMappingURL=index.js.map