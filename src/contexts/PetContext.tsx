
import React, { createContext, useContext, useState, useEffect } from "react";
import { Pet, Reminder } from "../types";
import { mockPets, mockReminders } from "../data";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/use-toast";

interface PetContextType {
  pets: Pet[];
  reminders: Reminder[];
  addPet: (pet: Omit<Pet, "id">) => void;
  updatePet: (pet: Pet) => void;
  deletePet: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  updateReminder: (reminder: Reminder) => void;
  deleteReminder: (id: string) => void;
  toggleReminderComplete: (id: string) => void;
  getPet: (id: string) => Pet | undefined;
  getPetReminders: (petId: string) => Reminder[];
  getAllReminders: () => Reminder[];
  getTodayReminders: () => Reminder[];
  getUpcomingReminders: (days: number) => Reminder[];
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Initialize with mock data
  useEffect(() => {
    const storedPets = localStorage.getItem("pets");
    const storedReminders = localStorage.getItem("reminders");

    if (storedPets && storedReminders) {
      setPets(JSON.parse(storedPets));
      
      // Parse dates in reminders
      const parsedReminders = JSON.parse(storedReminders);
      parsedReminders.forEach((reminder: Reminder) => {
        if (reminder.date) {
          reminder.date = new Date(reminder.date);
        }
      });
      setReminders(parsedReminders);
    } else {
      setPets(mockPets);
      setReminders(mockReminders);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (pets.length > 0) {
      localStorage.setItem("pets", JSON.stringify(pets));
    }
    if (reminders.length > 0) {
      localStorage.setItem("reminders", JSON.stringify(reminders));
    }
  }, [pets, reminders]);

  const addPet = (pet: Omit<Pet, "id">) => {
    const newPet = {
      ...pet,
      id: uuidv4()
    };
    setPets([...pets, newPet]);
    toast({
      title: "Pet Added",
      description: `${pet.name} has been added to your pets.`,
    });
  };

  const updatePet = (updatedPet: Pet) => {
    setPets(pets.map(pet => pet.id === updatedPet.id ? updatedPet : pet));
    toast({
      title: "Pet Updated",
      description: `${updatedPet.name}'s information has been updated.`,
    });
  };

  const deletePet = (id: string) => {
    const petToDelete = pets.find(pet => pet.id === id);
    setPets(pets.filter(pet => pet.id !== id));
    // Also delete all reminders associated with this pet
    setReminders(reminders.filter(reminder => reminder.petId !== id));
    if (petToDelete) {
      toast({
        title: "Pet Removed",
        description: `${petToDelete.name} has been removed from your pets.`,
      });
    }
  };

  const addReminder = (reminder: Omit<Reminder, "id">) => {
    const newReminder = {
      ...reminder,
      id: uuidv4()
    };
    setReminders([...reminders, newReminder]);
    toast({
      title: "Reminder Added",
      description: `A new reminder for ${reminder.title} has been added.`,
    });
  };

  const updateReminder = (updatedReminder: Reminder) => {
    setReminders(reminders.map(reminder => 
      reminder.id === updatedReminder.id ? updatedReminder : reminder
    ));
    toast({
      title: "Reminder Updated",
      description: `The reminder for ${updatedReminder.title} has been updated.`,
    });
  };

  const deleteReminder = (id: string) => {
    const reminderToDelete = reminders.find(r => r.id === id);
    setReminders(reminders.filter(reminder => reminder.id !== id));
    if (reminderToDelete) {
      toast({
        title: "Reminder Removed",
        description: `The reminder for ${reminderToDelete.title} has been removed.`,
      });
    }
  };

  const toggleReminderComplete = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, isComplete: !reminder.isComplete } 
        : reminder
    ));
  };

  const getPet = (id: string) => {
    return pets.find(pet => pet.id === id);
  };

  const getPetReminders = (petId: string) => {
    return reminders.filter(reminder => reminder.petId === petId);
  };

  const getAllReminders = () => {
    return reminders;
  };

  const getTodayReminders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reminders.filter(reminder => {
      // Daily reminders always show up
      if (reminder.frequency === 'daily') return true;

      // For weekly or monthly reminders, check if today is the day
      if (reminder.date) {
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0, 0, 0, 0);
        return reminderDate.getTime() === today.getTime();
      }
      
      return false;
    }).sort((a, b) => {
      // Sort by time
      return a.time.localeCompare(b.time);
    });
  };

  const getUpcomingReminders = (days: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + days);
    
    return reminders.filter(reminder => {
      // For daily reminders, include all
      if (reminder.frequency === 'daily') return true;
      
      // For other frequencies, check if they fall within the range
      if (reminder.date) {
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0, 0, 0, 0);
        return reminderDate >= today && reminderDate <= endDate;
      }
      
      return false;
    });
  };

  const value = {
    pets,
    reminders,
    addPet,
    updatePet,
    deletePet,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleReminderComplete,
    getPet,
    getPetReminders,
    getAllReminders,
    getTodayReminders,
    getUpcomingReminders
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePet() {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error("usePet must be used within a PetProvider");
  }
  return context;
}
