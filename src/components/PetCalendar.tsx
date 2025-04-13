
import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePet } from "@/contexts/PetContext";
import { Reminder, DayWithReminders } from "@/types";
import { format, startOfDay, isToday } from "date-fns";
import ReminderCard from "./ReminderCard";

const PetCalendar = () => {
  const { getAllReminders, getPet } = usePet();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const allReminders = getAllReminders();
  
  const dateHasReminder = (date: Date): boolean => {
    const dayStart = startOfDay(date);
    
    return allReminders.some(reminder => {
      // Daily reminders always count
      if (reminder.frequency === "daily") return true;
      
      // For other frequencies, check if they match this day
      if (reminder.date) {
        const reminderDate = startOfDay(new Date(reminder.date));
        return reminderDate.getTime() === dayStart.getTime();
      }
      
      return false;
    });
  };
  
  const selectedDateReminders = useMemo(() => {
    if (!selectedDate) return [];
    
    const dayStart = startOfDay(selectedDate);
    
    return allReminders.filter(reminder => {
      // Daily reminders always show
      if (reminder.frequency === "daily") return true;
      
      // For other frequencies, check the date
      if (reminder.date) {
        const reminderDate = startOfDay(new Date(reminder.date));
        return reminderDate.getTime() === dayStart.getTime();
      }
      
      return false;
    }).sort((a, b) => {
      // Sort by time
      return a.time.localeCompare(b.time);
    });
  }, [selectedDate, allReminders]);

  return (
    <div className="flex flex-col space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border shadow p-3 pointer-events-auto"
        modifiers={{
          hasReminder: (date) => dateHasReminder(date),
        }}
        modifiersClassNames={{
          hasReminder: "bg-primary/20 font-bold",
        }}
      />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {selectedDate ? (
              isToday(selectedDate) ? 
                "Today's Reminders" : 
                `Reminders for ${format(selectedDate, "MMMM d, yyyy")}`
            ) : (
              "No date selected"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateReminders.length > 0 ? (
            <div className="space-y-3">
              {selectedDateReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No reminders for this day
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PetCalendar;
