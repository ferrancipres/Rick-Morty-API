interface Character {
    id: number;
    name: string;
    status: CharacterStatus; 
    species: number;
    type: string;
    gender: CharacterGender; 
    origin: Location; 
    location: Location; 
    image: string;
    episode: string[];
    url: string;
    created: string;
}

interface Location {
    name: string;
    url: string;
}

enum CharacterStatus {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}

enum CharacterGender {
    Female = "Female",
    Male = "Male",
    Gender = "Genderless",
    Unknown = "unknown",
}

