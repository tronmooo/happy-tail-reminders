
import React, { createContext, useContext, useState, useEffect } from "react";
import { Pet, Reminder, HealthLog, FeedingSchedule, TrainingSession, Vaccination, MedicalRecord, Medication } from "../types";
import { mockPets, mockReminders } from "../data";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/use-toast";

interface PetContextType {
  pets: Pet[];
  reminders: Reminder[];
  healthLogs: HealthLog[];
  feedingSchedules: FeedingSchedule[];
  trainingSessions: TrainingSession[];
  
  // Pet CRUD operations
  addPet: (pet: Omit<Pet, "id">) => void;
  updatePet: (pet: Pet) => void;
  deletePet: (id: string) => void;
  getPet: (id: string) => Pet | undefined;
  
  // Reminder operations
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  updateReminder: (reminder: Reminder) => void;
  deleteReminder: (id: string) => void;
  toggleReminderComplete: (id: string) => void;
  getPetReminders: (petId: string) => Reminder[];
  getAllReminders: () => Reminder[];
  getTodayReminders: () => Reminder[];
  getUpcomingReminders: (days: number) => Reminder[];
  
  // Health tracking
  addHealthLog: (log: Omit<HealthLog, "id">) => void;
  getPetHealthLogs: (petId: string) => HealthLog[];
  
  // Feeding schedule
  addFeedingSchedule: (schedule: Omit<FeedingSchedule, "id">) => void;
  updateFeedingSchedule: (schedule: FeedingSchedule) => void;
  deleteFeedingSchedule: (id: string) => void;
  getPetFeedingSchedules: (petId: string) => FeedingSchedule[];
  
  // Training
  addTrainingSession: (session: Omit<TrainingSession, "id">) => void;
  updateTrainingSession: (session: TrainingSession) => void;
  getPetTrainingSessions: (petId: string) => TrainingSession[];
  
  // Medical Records
  addVaccination: (petId: string, vaccination: Omit<Vaccination, "id">) => void;
  addMedication: (petId: string, medication: Omit<Medication, "id">) => void;
  addMedicalRecord: (petId: string, record: Omit<MedicalRecord, "id">) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>([]);
  const [feedingSchedules, setFeedingSchedules] = useState<FeedingSchedule[]>([]);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([]);

  // Initialize with mock data
  useEffect(() => {
    const storedPets = localStorage.getItem("pets");
    const storedReminders = localStorage.getItem("reminders");
    const storedHealthLogs = localStorage.getItem("healthLogs");
    const storedFeedingSchedules = localStorage.getItem("feedingSchedules");
    const storedTrainingSessions = localStorage.getItem("trainingSessions");

    if (storedPets) {
      const parsedPets = JSON.parse(storedPets);
      // Convert date strings to Date objects
      parsedPets.forEach((pet: Pet) => {
        if (pet.lastVetVisit) {
          pet.lastVetVisit = new Date(pet.lastVetVisit);
        }
        if (pet.nextVetVisit) {
          pet.nextVetVisit = new Date(pet.nextVetVisit);
        }
      });
      setPets(parsedPets);
    } else {
      setPets(mockPets);
    }
    
    if (storedReminders) {
      // Parse dates in reminders
      const parsedReminders = JSON.parse(storedReminders);
      parsedReminders.forEach((reminder: Reminder) => {
        if (reminder.date) {
          reminder.date = new Date(reminder.date);
        }
      });
      setReminders(parsedReminders);
    } else {
      setReminders(mockReminders);
    }
    
    if (storedHealthLogs) {
      const parsedLogs = JSON.parse(storedHealthLogs);
      parsedLogs.forEach((log: HealthLog) => {
        log.date = new Date(log.date);
      });
      setHealthLogs(parsedLogs);
    } else {
      setHealthLogs([]);
    }
    
    if (storedFeedingSchedules) {
      setFeedingSchedules(JSON.parse(storedFeedingSchedules));
    } else {
      setFeedingSchedules([]);
    }
    
    if (storedTrainingSessions) {
      const parsedSessions = JSON.parse(storedTrainingSessions);
      parsedSessions.forEach((session: TrainingSession) => {
        session.date = new Date(session.date);
      });
      setTrainingSessions(parsedSessions);
    } else {
      setTrainingSessions([]);
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
    if (healthLogs.length > 0) {
      localStorage.setItem("healthLogs", JSON.stringify(healthLogs));
    }
    if (feedingSchedules.length > 0) {
      localStorage.setItem("feedingSchedules", JSON.stringify(feedingSchedules));
    }
    if (trainingSessions.length > 0) {
      localStorage.setItem("trainingSessions", JSON.stringify(trainingSessions));
    }
  }, [pets, reminders, healthLogs, feedingSchedules, trainingSessions]);

  // Pet CRUD Operations
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
    // Also delete all reminders and logs associated with this pet
    setReminders(reminders.filter(reminder => reminder.petId !== id));
    setHealthLogs(healthLogs.filter(log => log.petId !== id));
    setFeedingSchedules(feedingSchedules.filter(schedule => schedule.petId !== id));
    setTrainingSessions(trainingSessions.filter(session => session.petId !== id));
    
    if (petToDelete) {
      toast({
        title: "Pet Removed",
        description: `${petToDelete.name} has been removed from your pets.`,
      });
    }
  };

  // Reminder Operations
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

  // Health Log Operations
  const addHealthLog = (log: Omit<HealthLog, "id">) => {
    const newLog = {
      ...log,
      id: uuidv4()
    };
    setHealthLogs([...healthLogs, newLog]);
    toast({
      title: "Health Log Added",
      description: `A new health log has been added for your pet.`,
    });
  };

  // Feeding Schedule Operations
  const addFeedingSchedule = (schedule: Omit<FeedingSchedule, "id">) => {
    const newSchedule = {
      ...schedule,
      id: uuidv4()
    };
    setFeedingSchedules([...feedingSchedules, newSchedule]);
    toast({
      title: "Feeding Schedule Added",
      description: `A new feeding schedule has been added.`,
    });
  };

  const updateFeedingSchedule = (updatedSchedule: FeedingSchedule) => {
    setFeedingSchedules(feedingSchedules.map(schedule => 
      schedule.id === updatedSchedule.id ? updatedSchedule : schedule
    ));
    toast({
      title: "Feeding Schedule Updated",
      description: `The feeding schedule has been updated.`,
    });
  };

  const deleteFeedingSchedule = (id: string) => {
    setFeedingSchedules(feedingSchedules.filter(schedule => schedule.id !== id));
    toast({
      title: "Feeding Schedule Removed",
      description: `The feeding schedule has been removed.`,
    });
  };

  // Training Session Operations
  const addTrainingSession = (session: Omit<TrainingSession, "id">) => {
    const newSession = {
      ...session,
      id: uuidv4()
    };
    setTrainingSessions([...trainingSessions, newSession]);
    toast({
      title: "Training Session Added",
      description: `A new training session has been added.`,
    });
  };

  const updateTrainingSession = (updatedSession: TrainingSession) => {
    setTrainingSessions(trainingSessions.map(session => 
      session.id === updatedSession.id ? updatedSession : session
    ));
    toast({
      title: "Training Session Updated",
      description: `The training session has been updated.`,
    });
  };

  // Medical Record Operations
  const addVaccination = (petId: string, vaccination: Omit<Vaccination, "id">) => {
    const newVaccination = {
      ...vaccination,
      id: uuidv4()
    };
    
    setPets(pets.map(pet => {
      if (pet.id === petId) {
        const vaccinations = pet.vaccinations || [];
        return {
          ...pet,
          vaccinations: [...vaccinations, newVaccination]
        };
      }
      return pet;
    }));
    
    toast({
      title: "Vaccination Added",
      description: `A new vaccination record has been added.`,
    });
  };

  const addMedication = (petId: string, medication: Omit<Medication, "id">) => {
    const newMedication = {
      ...medication,
      id: uuidv4()
    };
    
    setPets(pets.map(pet => {
      if (pet.id === petId) {
        const medications = pet.medications || [];
        return {
          ...pet,
          medications: [...medications, newMedication]
        };
      }
      return pet;
    }));
    
    toast({
      title: "Medication Added",
      description: `A new medication record has been added.`,
    });
  };

  const addMedicalRecord = (petId: string, record: Omit<MedicalRecord, "id">) => {
    const newRecord = {
      ...record,
      id: uuidv4()
    };
    
    setPets(pets.map(pet => {
      if (pet.id === petId) {
        const medicalHistory = pet.medicalHistory || [];
        return {
          ...pet,
          medicalHistory: [...medicalHistory, newRecord]
        };
      }
      return pet;
    }));
    
    toast({
      title: "Medical Record Added",
      description: `A new medical record has been added.`,
    });
  };

  // Getters
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

  const getPetHealthLogs = (petId: string) => {
    return healthLogs.filter(log => log.petId === petId);
  };

  const getPetFeedingSchedules = (petId: string) => {
    return feedingSchedules.filter(schedule => schedule.petId === petId);
  };

  const getPetTrainingSessions = (petId: string) => {
    return trainingSessions.filter(session => session.petId === petId);
  };

  const value = {
    pets,
    reminders,
    healthLogs,
    feedingSchedules,
    trainingSessions,
    
    // Pet CRUD
    addPet,
    updatePet,
    deletePet,
    getPet,
    
    // Reminder operations
    addReminder,
    updateReminder,
    deleteReminder,
    toggleReminderComplete,
    getPetReminders,
    getAllReminders,
    getTodayReminders,
    getUpcomingReminders,
    
    // Health tracking
    addHealthLog,
    getPetHealthLogs,
    
    // Feeding
    addFeedingSchedule,
    updateFeedingSchedule,
    deleteFeedingSchedule,
    getPetFeedingSchedules,
    
    // Training
    addTrainingSession,
    updateTrainingSession,
    getPetTrainingSessions,
    
    // Medical
    addVaccination,
    addMedication,
    addMedicalRecord
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
