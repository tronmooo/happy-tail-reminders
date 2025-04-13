
import { Reminder } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { usePet } from "@/contexts/PetContext";
import ReminderIcon from "./ReminderIcon";
import PetIcon from "./PetIcon";
import { useState, useEffect } from "react";

interface ReminderCardProps {
  reminder: Reminder;
}

const ReminderCard = ({ reminder }: ReminderCardProps) => {
  const { toggleReminderComplete, getPet } = usePet();
  const pet = getPet(reminder.petId);
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(reminder.isComplete || false);

  // Handle the animation and removal
  const handleCheck = () => {
    setIsChecked(true);
    setTimeout(() => {
      setIsVisible(false);
      toggleReminderComplete(reminder.id);
    }, 300); // Match this with the animation duration
  };

  if (!pet || !isVisible) return null;

  return (
    <Card className={`w-full overflow-hidden transition-all duration-300 ${
      isChecked ? "opacity-0 transform translate-y-2" : ""
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${
              reminder.type === "feeding" ? "bg-pet-orange/20" :
              reminder.type === "walking" ? "bg-pet-teal/20" :
              reminder.type === "grooming" ? "bg-pet-purple/20" :
              "bg-pet-pink/20"
            }`}>
              <ReminderIcon 
                reminderType={reminder.type}
                className={
                  reminder.type === "feeding" ? "text-pet-orange" :
                  reminder.type === "walking" ? "text-pet-teal" :
                  reminder.type === "grooming" ? "text-pet-purple" :
                  "text-pet-pink"
                }
              />
            </div>
            <div>
              <h3 className="font-semibold text-base">{reminder.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-1">{format(new Date(`2000-01-01T${reminder.time}`), "h:mm a")}</span>
                {reminder.frequency !== "once" && (
                  <span className="ml-1">• {reminder.frequency}</span>
                )}
              </div>
            </div>
          </div>
          <Checkbox 
            checked={isChecked}
            onCheckedChange={handleCheck}
            className="h-5 w-5 border-2"
          />
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-2 px-4">
        <div className="flex items-center text-sm">
          <PetIcon petType={pet.type} size={16} className="mr-1.5" />
          <span>{pet.name}</span>
          {reminder.notes && (
            <span className="ml-2 text-muted-foreground truncate max-w-48">
              • {reminder.notes}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReminderCard;
