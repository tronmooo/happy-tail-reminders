
export type PetType = "dog" | "cat" | "bird" | "fish" | "rabbit" | "other";

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed?: string;
  age?: number;
  weight?: number;
  imageUrl?: string;
  notes?: string;
  lastVetVisit?: Date;
  nextVetVisit?: Date;
  gender?: "male" | "female" | "unknown";
  allergies?: string[];
  dietaryRestrictions?: string[];
  medications?: Medication[];
  vaccinations?: Vaccination[];
  medicalHistory?: MedicalRecord[];
  documents?: PetDocument[];
}

export type ReminderType = 
  | "feeding" 
  | "walking" 
  | "grooming" 
  | "medication" 
  | "veterinary" 
  | "training"
  | "playtime"
  | "dental"
  | "other";

export interface Reminder {
  id: string;
  petId: string;
  title: string;
  type: ReminderType;
  frequency: "once" | "daily" | "weekly" | "monthly";
  time: string;
  date?: Date;
  notes?: string;
  isComplete?: boolean;
}

export interface DayWithReminders {
  date: Date;
  reminders: Reminder[];
  isToday: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
}

export interface Vaccination {
  id: string;
  name: string;
  dateAdministered: Date;
  expiryDate?: Date;
  provider?: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  date: Date;
  type: "checkup" | "illness" | "surgery" | "emergency" | "other";
  description: string;
  veterinarian?: string;
  clinic?: string;
  cost?: number;
  attachments?: string[];
}

export interface HealthLog {
  id: string;
  petId: string;
  date: Date;
  weight?: number;
  appetite: "normal" | "increased" | "decreased" | "none";
  energy: "normal" | "high" | "low" | "lethargic";
  behavior: string;
  symptoms?: string[];
  notes?: string;
}

export interface FeedingSchedule {
  id: string;
  petId: string;
  mealName: string;
  time: string;
  portionSize: string;
  foodType: string;
  notes?: string;
}

export interface TrainingSession {
  id: string;
  petId: string;
  date: Date;
  duration: number;
  skills: string[];
  notes?: string;
  progress: "not_started" | "in_progress" | "mastered";
}

export type DocumentType = 
  | "vaccination" 
  | "medical" 
  | "prescription" 
  | "insurance" 
  | "registration" 
  | "adoption" 
  | "other";

export interface PetDocument {
  id: string;
  petId: string;
  title: string;
  type: DocumentType;
  date: Date;
  imageUrl: string;
  notes?: string;
  tags?: string[];
}
