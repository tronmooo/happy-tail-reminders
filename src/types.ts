
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
}

export type ReminderType = "feeding" | "walking" | "grooming" | "medication" | "veterinary" | "other";

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
