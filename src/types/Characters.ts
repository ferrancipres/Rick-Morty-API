// Definir la interface Character
interface Character {
    id: number;
    name: string;
    status: CharacterStatus; //Enum (Es un string con 3 strings dentro)
    species: number;
    type: string;
    gender: CharacterGender; //Enum (Es un string con 3 strings dentro)
    origin: Location; // Objeto
    location: Location; // Objeto
    image: string;
    episode: string[];
    url: string;
    created: string;
}

//Crear una interfaz con los campos que yo quiero
interface Location {
    name: string;
    url: string;
}

//Crear un "enum" => CharacterStatus
enum CharacterStatus {
    "Alive",
    "Dead",
    "unknown",
}

//Crear un "enum" => CharacterGender
enum CharacterGender {
    "Female",
    "Male",
    "Genderless",
    "unknown",
}

