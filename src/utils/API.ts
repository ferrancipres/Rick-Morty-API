const urlBase= "https://rickandmortyapi.com/api";
const urlEpisodes = `${urlBase}/episode`;
const urlCharacters = `${urlBase}/character`;
const urlLocation = `${urlBase}/location`;

export async function getEpisodes(countPage:number): Promise<Episodes[]> {
    try {
        const response = await fetch(urlEpisodes + `?page=${countPage}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw new Error ("Something went wrong");
    }
}

export async function getSingleEpisodes(url:string): Promise<Episodes> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error ("Something went wront");
    }
}

export async function getSingleCharacter(url:string): Promise<Character> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error ("Something went wront");
    }
}

export async function getLocation(url:string): Promise<Location> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error ("Something went wront");
    }
}