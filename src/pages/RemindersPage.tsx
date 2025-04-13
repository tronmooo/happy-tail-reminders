
import { Button } from "@/components/ui/button";
import { usePet } from "@/contexts/PetContext";
import { Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReminderCard from "@/components/ReminderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RemindersPage = () => {
  const { getAllReminders, getTodayReminders, getUpcomingReminders } = usePet();
  const navigate = useNavigate();
  
  const allReminders = getAllReminders();
  const todayReminders = getTodayReminders().filter(r => !r.isComplete);
  const upcomingReminders = getUpcomingReminders(7).filter(r => !r.isComplete);
  
  const completedReminders = allReminders.filter(r => r.isComplete);
  const incompleteReminders = allReminders.filter(r => !r.isComplete);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reminders</h1>
        <Button onClick={() => navigate("/reminders/new")} className="bg-pet-teal hover:bg-pet-teal/90">
          <Plus className="mr-2 h-4 w-4" /> Add Reminder
        </Button>
      </div>
      
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="space-y-4">
          {todayReminders.length > 0 ? (
            <div className="space-y-3">
              {todayReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="bg-primary/10 mx-auto w-16 h-16 rounded-full flex items-center justify-center">
                <Bell className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">No reminders for today</h2>
              <p className="text-muted-foreground">
                Add reminders to keep track of your pet's care
              </p>
              <Button 
                onClick={() => navigate("/reminders/new")}
                className="mt-2 bg-pet-teal hover:bg-pet-teal/90"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Reminder
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingReminders.length > 0 ? (
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="bg-primary/10 mx-auto w-16 h-16 rounded-full flex items-center justify-center">
                <Bell className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">No upcoming reminders</h2>
              <p className="text-muted-foreground">
                Plan ahead for your pet's care
              </p>
              <Button 
                onClick={() => navigate("/reminders/new")}
                className="mt-2 bg-pet-teal hover:bg-pet-teal/90"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Reminder
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active ({incompleteReminders.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedReminders.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="pt-4 space-y-3">
              {incompleteReminders.length > 0 ? (
                incompleteReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active reminders</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="pt-4 space-y-3">
              {completedReminders.length > 0 ? (
                completedReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No completed reminders</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {allReminders.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <div className="bg-primary/10 mx-auto w-16 h-16 rounded-full flex items-center justify-center">
                <Bell className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">No reminders yet</h2>
              <p className="text-muted-foreground">
                Add reminders to keep track of your pet's care
              </p>
              <Button 
                onClick={() => navigate("/reminders/new")}
                className="mt-2 bg-pet-teal hover:bg-pet-teal/90"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Your First Reminder
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RemindersPage;
