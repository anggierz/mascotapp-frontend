export type Pet = {
  id: string;
  name: string;
  type: "dog" | "cat";
  birthdate: string;
  weight: number;
};

// Mocks
let pets: Pet[] = [
  { id: "1", name: "Luna", type: "dog", birthdate: "2022-01-01", weight: 12 },
];

// Listar mascotas
export function getPets(): Pet[] {
  return pets;
}

// Obtener mascota por ID
export function getPetById(id: string): Pet | undefined {
  return pets.find((p) => p.id === id);
}

// Crear mascota
export function addPet(pet: Omit<Pet, "id">): Pet {
  const newPet: Pet = { ...pet, id: String(Date.now()) };
  pets.push(newPet);
  return newPet;
}

// Actualizar mascota
export function updatePet(id: string, updates: Partial<Pet>): Pet | null {
  const index = pets.findIndex((p) => p.id === id);
  if (index === -1) return null;
  pets[index] = { ...pets[index], ...updates };
  return pets[index];
}

// Eliminar mascota
export function deletePet(id: string): boolean {
  const before = pets.length;
  pets = pets.filter((p) => p.id !== id);
  return pets.length < before;
}
