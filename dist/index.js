var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodes } from "./utils/API.js";
import { btnLoadMore } from "./utils/API.js";
window.addEventListener("load", init);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const episodeList = document.querySelector("#containerEpisodes");
        const episodes = yield getEpisodes();
        episodes.forEach((episode) => {
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
        });
    });
}
const LoadMore = document.querySelector("#btnLoadMore");
LoadMore.addEventListener('click', btnLoadMore);
//# sourceMappingURL=index.js.map