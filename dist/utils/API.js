var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlBase = "https://rickandmortyapi.com/api";
const urlEpisodes = `${urlBase}/episode`;
let pageEpisode = 1;
const urlEpisodesPage = `${urlBase}/episode/?page=${pageEpisode}`;
export function getEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(urlEpisodesPage);
        const data = yield response.json();
        return data.results;
    });
}
export function btnLoadMore() {
    return __awaiter(this, void 0, void 0, function* () {
        pageEpisode++;
        console.log(pageEpisode);
        getEpisodes();
        console.log(getEpisodes());
    });
}
//# sourceMappingURL=API.js.map