
import { Pet, Reminder } from "./types";
import { v4 as uuidv4 } from "uuid";

export const mockPets: Pet[] = [
  {
    id: uuidv4(),
    name: "Buddy",
    type: "dog",
    breed: "Golden Retriever",
    age: 3,
    weight: 65,
    imageUrl: "/placeholder.svg",
    notes: "Loves to play fetch and swim",
    lastVetVisit: new Date("2023-11-15"),
    nextVetVisit: new Date("2024-05-15")
  },
  {
    id: uuidv4(),
    name: "Whiskers",
    type: "cat",
    breed: "Maine Coon",
    age: 5,
    weight: 12,
    imageUrl: "/placeholder.svg",
    notes: "Prefers wet food, loves to nap in sunbeams",
    lastVetVisit: new Date("2024-01-10"),
    nextVetVisit: new Date("2024-07-10")
  }
];

export const mockReminders: Reminder[] = [
  {
    id: uuidv4(),
    petId: mockPets[0].id,
    title: "Morning Feed",
    type: "feeding",
    frequency: "daily",
    time: "08:00",
    notes: "1 cup of dry food",
    isComplete: false
  },
  {
    id: uuidv4(),
    petId: mockPets[0].id,
    title: "Evening Walk",
    type: "walking",
    frequency: "daily",
    time: "18:00",
    notes: "At least 30 minutes",
    isComplete: false
  },
  {
    id: uuidv4(),
    petId: mockPets[0].id,
    title: "Heartworm Medication",
    type: "medication",
    frequency: "monthly",
    time: "09:00",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    notes: "Give with food",
    isComplete: false
  },
  {
    id: uuidv4(),
    petId: mockPets[1].id,
    title: "Morning Feed",
    type: "feeding",
    frequency: "daily",
    time: "07:30",
    notes: "Half a can of wet food",
    isComplete: false
  },
  {
    id: uuidv4(),
    petId: mockPets[1].id,
    title: "Evening Feed",
    type: "feeding",
    frequency: "daily",
    time: "19:30",
    notes: "Half a can of wet food",
    isComplete: false
  },
  {
    id: uuidv4(),
    petId: mockPets[1].id,
    title: "Grooming Session",
    type: "grooming",
    frequency: "weekly",
    time: "14:00",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    notes: "Brush fur thoroughly",
    isComplete: false
  }
];
