
export type Diet = {
  id: string;
  foodName: string;
  kgPerDay: number;
  price: number;
};

export type Pet = {
  id: string;
  name: string;
  type: "dog" | "cat";
  birthdate: string;
  weight: number;
  diets?: Diet[];
};

//TODO: sustituir mock por datos persistentes con backend
let pets: Pet[] = [
  { id: "1", name: "Luna", type: "dog", birthdate: "2022-01-01", weight: 12, diets: [] },
];

export function getDietsForPet(petId: string): Diet[] {
  const pet = getPetById(petId);
  return pet?.diets || [];
}

export function addDietToPet(petId: string, diet: Omit<Diet, "id">): Diet | null {
  const pet = getPetById(petId);
  if (!pet) return null;
  const newDiet: Diet = { ...diet, id: String(Date.now()) };
  if (!pet.diets) pet.diets = [];
  pet.diets.push(newDiet);
  return newDiet;
}

export function deleteDietFromPet(petId: string, dietId: string): boolean {
  const pet = getPetById(petId);
  if (!pet || !pet.diets) return false;
  const before = pet.diets.length;
  pet.diets = pet.diets.filter((d) => d.id !== dietId);
  return pet.diets.length < before;
}


export function getPets(): Pet[] {
  return pets;
}


export function getPetById(id: string): Pet | undefined {
  return pets.find((p) => p.id === id);
}


export function addPet(pet: Omit<Pet, "id">): Pet {
  const newPet: Pet = { ...pet, id: String(Date.now()) };
  pets.push(newPet);
  return newPet;
}


export function updatePet(id: string, updates: Partial<Pet>): Pet | null {
  const index = pets.findIndex((p) => p.id === id);
  if (index === -1) return null;
  pets[index] = { ...pets[index], ...updates };
  return pets[index];
}


export function deletePet(id: string): boolean {
  const before = pets.length;
  pets = pets.filter((p) => p.id !== id);
  return pets.length < before;
}
