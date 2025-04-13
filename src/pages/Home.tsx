
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePet } from "@/contexts/PetContext";
import { format } from "date-fns";
import ReminderCard from "@/components/ReminderCard";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, PawPrint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PetIcon from "@/components/PetIcon";

const Home = () => {
  const { pets, getTodayReminders } = usePet();
  const navigate = useNavigate();
  
  const todayReminders = getTodayReminders();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Hello! <span className="text-primary">Today is {format(new Date(), "EEEE, MMMM d")}</span>
        </h1>
      </div>
      
      {/* Today's Reminders */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Today's Reminders</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-primary"
              onClick={() => navigate("/reminders")}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {todayReminders.length} reminder{todayReminders.length !== 1 && 's'} for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          {todayReminders.length > 0 ? (
            <div className="space-y-3">
              {todayReminders.slice(0, 3).map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
              {todayReminders.length > 3 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/reminders")}
                >
                  View {todayReminders.length - 3} more reminder{todayReminders.length - 3 !== 1 && 's'}
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-3">
              <p className="text-muted-foreground">No reminders for today</p>
              <Button 
                onClick={() => navigate("/reminders/new")}
                className="bg-pet-teal hover:bg-pet-teal/90"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Reminder
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* My Pets */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>My Pets</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-primary"
              onClick={() => navigate("/pets")}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {pets.length} pet{pets.length !== 1 && 's'} in your care
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pets.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {pets.slice(0, 4).map((pet) => (
                <Button
                  key={pet.id}
                  variant="outline"
                  className="flex items-center justify-start h-16 p-3"
                  onClick={() => navigate(`/pets/${pet.id}`)}
                >
                  <div className="bg-primary/10 p-2 rounded-full mr-2">
                    <PetIcon petType={pet.type} size={18} className="text-primary" />
                  </div>
                  <span className="font-medium truncate">{pet.name}</span>
                </Button>
              ))}
              {pets.length > 4 && (
                <Button
                  variant="outline"
                  className="col-span-2"
                  onClick={() => navigate("/pets")}
                >
                  View {pets.length - 4} more pet{pets.length - 4 !== 1 && 's'}
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-3">
              <p className="text-muted-foreground">No pets added yet</p>
              <Button 
                onClick={() => navigate("/pets/new")}
                className="bg-pet-orange hover:bg-pet-orange/90"
              >
                <PawPrint className="mr-2 h-4 w-4" /> Add Pet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={() => navigate("/pets/new")}
          variant="outline"
          className="h-20 bg-pet-orange/10 hover:bg-pet-orange/20 border-pet-orange/30"
        >
          <div className="flex flex-col items-center">
            <PawPrint className="mb-1 h-5 w-5 text-pet-orange" />
            <span>Add Pet</span>
          </div>
        </Button>
        <Button 
          onClick={() => navigate("/reminders/new")}
          variant="outline"
          className="h-20 bg-pet-teal/10 hover:bg-pet-teal/20 border-pet-teal/30"
        >
          <div className="flex flex-col items-center">
            <Plus className="mb-1 h-5 w-5 text-pet-teal" />
            <span>Add Reminder</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Home;
