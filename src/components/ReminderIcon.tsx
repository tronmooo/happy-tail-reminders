
import { ReminderType } from "@/types";
import { Utensils, Footprints, Scissors, Pills, Stethoscope, Calendar } from "lucide-react";

interface ReminderIconProps {
  reminderType: ReminderType;
  size?: number;
  className?: string;
}

const ReminderIcon = ({ reminderType, size = 24, className = "" }: ReminderIconProps) => {
  switch (reminderType) {
    case "feeding":
      return <Utensils size={size} className={className} />;
    case "walking":
      return <Footprints size={size} className={className} />;
    case "grooming":
      return <Scissors size={size} className={className} />;
    case "medication":
      return <Pills size={size} className={className} />;
    case "veterinary":
      return <Stethoscope size={size} className={className} />;
    case "other":
    default:
      return <Calendar size={size} className={className} />;
  }
};

export default ReminderIcon;
