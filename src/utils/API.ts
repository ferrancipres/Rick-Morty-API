const urlBase= "https://rickandmortyapi.com/api";
const urlEpisodes = `${urlBase}/episode`;
const urlCharacters = `${urlBase}/character`;
const urlLocation = `${urlBase}/location`;

export async function getEpisodes(countPage:number): Promise<Episodes[]> {
    const response = await fetch(urlEpisodes + `?page=${countPage}`);
    const data = await response.json();
    return data.results;
}

export async function getSingleEpisodes(url:string): Promise<Episodes> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getSingleCharacter(url:string): Promise<Character> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
