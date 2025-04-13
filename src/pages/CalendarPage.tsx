
import PetCalendar from "@/components/PetCalendar";

const CalendarPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendar</h1>
      </div>
      
      <PetCalendar />
    </div>
  );
};

export default CalendarPage;
